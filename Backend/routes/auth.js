// import router dependencies
import express from 'express'
import upload from '../configs/multer.js'
import { body, param, header, validationResult } from 'express-validator'
import { 
    ERROR_CODES, 
    reportEmailConfirmationExpiredError, 
    reportEmailExistsError, 
    reportEmailNotVerifiedError, 
    reportInvalidEmailError, 
    reportInvalidPasswordFormatError, 
    reportInvalidRequestTokenError, 
    reportInvalidUsernameError,
    reportMagiclinkExpiredError,
    reportPasswordResetExpiredError,
    reportUserNotFoundError
} from '../utils/error-utils.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import passport from 'passport'
import cookieParser from 'cookie-parser'

// import database models
import Users from '../db/UserSchema.js'
import Bloks from '../db/BlokSchema.js'

// import router middleware and utilities
import appIdAuth from '../middleware/app-id-auth.js'
import { cloudinaryUpload } from '../utils/cloudinary-utils.js'
import { sendMagicLinkEmail, sendPasswordResetEmail, sendVerificationEmail } from '../utils/email-utils.js'
import { generateAccessToken, generateRefreshToken } from '../utils/token-utils.js'
import { prepareUserResponse } from '../utils/response-utils.js'
import path from 'path'


// create router from express
export const router = express.Router()

// initialize appIdAuth middleware on all routes in this router
// to protect routes and ensure only requests with valid app ID can access them
router.use( appIdAuth )


// initialize cookie parser middleware to parse cookies in requests
router.use( cookieParser() )


// router test route
// router.get('/hello', function( req, res ) {
//     res.send("hello world: auth")
// })


// load universal data for all auth routes
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'
const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS) || 10
const nodeEnv = process.env.NODE_ENV || 'development'


// POST /auth/signup - auth route for user signup with email and password
// expects 'multipart/form-data' request with optional profile photo upload
// request body must include 'username', 'email', and 'password' fields
router.post("/signup",

    // parse 'multipart/form-data' request using multer
    // in order to handle the profile photo upload (if any)
    upload.single('photo'),

    // validate the username, email, and password in the
    // incoming request data using express-validator
    [
        body("username")
            .exists()
            .withMessage( ERROR_CODES.INVALID_USERNAME )
            .bail()
            .isLength({ min: 3, max: 30 })
            .withMessage( ERROR_CODES.INVALID_USERNAME )
            .bail()
            .isString()
            .withMessage( ERROR_CODES.INVALID_USERNAME )
            .bail(),
        body("email")
            .exists()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .bail()
            .isEmail()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .normalizeEmail()
            .bail(),
        body("password")
            .exists()
            .withMessage( ERROR_CODES.INVALID_PASSWORD_FORMAT )
            .bail()
            .isLength({ min: 6 })
            .withMessage( ERROR_CODES.INVALID_PASSWORD_FORMAT )
            .bail()
    ],
async function( req, res, next ) {
    // check for validation errors if any
    const errors = validationResult(req)

    // report validation errors if any was found
    if ( !errors.isEmpty() ) {
        switch ( errors.array()[0].msg ) {
            case ERROR_CODES.INVALID_USERNAME:
                return reportInvalidUsernameError( next )
            case ERROR_CODES.INVALID_EMAIL:
                return reportInvalidEmailError( next )
            case ERROR_CODES.INVALID_PASSWORD_FORMAT:
                return reportInvalidPasswordFormatError( next )
        }
    }

    // if no validation errors were found, proceed to handle user signup

    // extract username, email, and password from request body
    const { username, email, password } = req.body

    // extract profile photo file info from request (if any)
    const photoFile = req.file || null

    
    try {
        // since email must be unique for each user,
        // check if signup email already exists in the database
        // to prevent duplicate email signups
        // if it does, report email already exists error
        // else, continue with signup process
        const emailCount = await Users.countDocuments({ email: email })

        if ( emailCount > 0 ) {
            return reportEmailExistsError( next )
        }

        
        // since profile photo upload is optional,
        // check if profile photo was uploaded
        // if it was, upload the photo to cloud storage
        // and get the photo URL and public ID
        // else, leave photoUrl and photoPublicId as empty strings
        // and proceed with user creation
        let photoUrl = ""
        let photoPublicId = ""

        if ( photoFile ) {
            // upload photo to cloud storage and get URL and public ID
            const uploadResult = await cloudinaryUpload( photoFile.buffer )

            // set photoUrl and photoPublicId from upload result
            photoUrl = uploadResult.secure_url
            photoPublicId = uploadResult.public_id
        }


        // create email verification token and expiry
        const verifyEmailToken = crypto.randomBytes( 32 ).toString('hex')
        const verifyEmailExpiry = Date.now() + 5 * 60 * 1000 // token valid for 5 minutes

        // hash user password before storing in database
        const hashedPassword = await bcrypt.hash( password, bcryptRounds )

        // send verification email to user email
        await sendVerificationEmail( email, `${frontendURL}/auth/verify-email/${verifyEmailToken}`)

        // create new user in the database
        const createdUser = await Users.create({
            // personal user data
            username: username,
            email: email,
            password: hashedPassword,
            profile_photo_url: photoUrl,
            profile_photo_id: photoPublicId,
            provider: "email", // since this is email/password signup
            email_verified: false, // new users start with unverified email

            // auth data
            verify_email_token: verifyEmailToken,
            verify_email_expiry: verifyEmailExpiry
        })

        // create default "Hello World" blok for the new user
        await Bloks.create({
            user_id: createdUser._id,
            html: "<h1>Hello World</h1>",
            css: "h1 { color: blue; }",
            javascript: "console.log('Hello World');",
        })


        // since new user signup was successful, return '201 Created'
        // response with verification email info
        res.status(201).json({
            status: 'success',
            data: {
                message: 'User account created successfully, Please verify your email'
            }
        })

    } catch( error ) {
        return next(error)
    }
})

// POST /auth/verify-email - auth route for send a verification email to
// user email address. expects JSON request body with 'email' field
router.post("/verify-email",
    [
        body("email")
            .exists()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .bail()
            .isEmail()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .normalizeEmail()
            .bail()
    ],
async function( req, res, next ) {
    // check for validation errors if any
    const errors = validationResult(req)

    // report validation errors if any was found
    if ( !errors.isEmpty() ) {
        return reportInvalidEmailError( next )
    }

    // if no validation errors were found, proceed to send verification email
    const { email } = req.body

    try {
        // create email verification token and expiry
        const verifyEmailToken = crypto.randomBytes( 32 ).toString('hex')
        const verifyEmailExpiry = Date.now() + 5 * 60 * 1000 // token valid for 5 minutes

        // send verification email to user email
        await sendVerificationEmail( email, `${frontendURL}/auth/verify-email/${verifyEmailToken}`)

        // get user document matching the email
        const user = await Users.findOne({ email })

        // if user not found, return error
        if ( !user ) {
            return reportInvalidEmailError( next )
        }

        // update user document with new verification token and expiry
        user.verify_email_token = verifyEmailToken
        user.verify_email_expiry = verifyEmailExpiry

        // save updated user document
        await user.save()

        // since no errors, respond with success message for verification email sent
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Verification email sent successfully'
            }
        })

    } catch( error ) {
        return next(error)
    }
})

// GET /auth/verify-email/:token - auth route for verifying user email
// expects 'token' param in the URL
router.get("/verify-email/:token",
    [
        param("token")
            .exists()
            .withMessage( ERROR_CODES.INVALID_REQUEST_TOKEN )
            .bail()
            .isHexadecimal()
            .withMessage( ERROR_CODES.INVALID_REQUEST_TOKEN )
            .bail()
    ],
async function( req, res, next ) {
    // check for validation errors if any
    const errors = validationResult(req)

    // report validation errors if any was found
    if ( !errors.isEmpty() ) {
        return reportInvalidRequestTokenError( next )
    }

    // if no validation errors were found, proceed to verify user email

    // extract email verification token from request params
    const { token } = req.params

    try {
        // find user with matching verification token
        const user = await Users.findOne({
            verify_email_token: token
        })

        // if user not found, report invalid request token error
        // since token does not match any user
        if ( !user ) {
            return reportInvalidRequestTokenError( next )
        }

        // if user found, check if token has expired
        // if it has, report email confirmation expired error
        if ( user.verify_email_expiry < Date.now() ) {
            return reportEmailConfirmationExpiredError( next )
        }

        // generate access and refresh tokens for the user
        // since email verification token is valid and not expired
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        // since user found and token valid, update user document
        user.verify_email_token = undefined
        user.verify_email_expiry = undefined
        user.email_verified = true

        // save updated user document
        await user.save()

        // set refresh token in HTTP-only cookie
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            path: '/auth/refresh-token',
            secure: nodeEnv === 'production', // use secure cookies in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // cookie valid for 7 days
        })

        // since no errors, send success response with user data
        // and access token in the response body and refresh token
        // in HTTP-only cookie ( acccessible only by the server )
        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    ...prepareUserResponse(user),
                    access_token: accessToken,
                    expires_in: 30 * 60 // access token expires in 30 minutes
                }
            }
        })

    } catch( error ) {
        return next(error)
    }
})


// POST /auth/login - auth route for user login with email and password
// expects JSON request body with 'email' and 'password' fields
router.post("/signin", 

    // for user login, validate the email and password in the
    // incoming request data using express-validator
    [
        body("email")
            .exists()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .bail()
            .isEmail()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .normalizeEmail()
            .bail(),
        body("password")
            .exists()
            .withMessage( ERROR_CODES.INVALID_PASSWORD_FORMAT )
            .bail()
            .isLength({ min: 6 })
            .withMessage( ERROR_CODES.INVALID_PASSWORD_FORMAT )
    ],

    // authenticate user using passport local strategy
    // { session: false } option disables session creation
    // since we are using token-based authentication
    passport.authenticate('local', { session: false }),

async function( req, res, next )  {
    // check for validation errors if any
    const errors = validationResult(req)

    // report validation errors if any was found
    if ( !errors.isEmpty() ) {
        switch ( errors.array()[0].msg ) {
            case ERROR_CODES.INVALID_EMAIL:
                return reportInvalidEmailError( next )
            case ERROR_CODES.INVALID_PASSWORD_FORMAT:
                return reportInvalidPasswordFormatError( next )
        }
    }   

    // if no validation errors were found, proceed to handle user login
    try {
        // at this point, user has been authenticated so user document
        // is obtained in req.user from passport middleware
        const user = req.user

        // check if user email is verified
        // if not, report email not verified error
        if ( !user.email_verified ) {
            return reportEmailNotVerifiedError( next )
        }

        // if email is verified, proceed with login
        // generate access and refresh tokens
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        // set refresh token in HTTP-only cookie
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            path: '/auth/refresh-token',
            secure: nodeEnv === 'production', // use secure cookies in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // cookie valid for 7 days
        })

        // send success response with user data and tokens
        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    ...prepareUserResponse(user),
                    access_token: accessToken,
                    expires_in: 30 * 60 // access token expires in 30 minutes
                }
            }
        })

    } catch( error ) {
        return next(error)
    }
})


// POST /auth/reset-password - auth route for sending password reset email
// expects JSON request body with 'email' field
router.post("/reset-password",
    [
        body("email")
            .exists()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .bail()
            .isEmail()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .normalizeEmail()
            .bail()
    ],

    async function( req, res, next ) {
        // check for validation errors if any
        const errors = validationResult(req)

        // report validation errors if any was found
        if ( !errors.isEmpty() ) {
            switch ( errors.array()[0].msg ) {
                case ERROR_CODES.INVALID_EMAIL:
                    return reportInvalidEmailError( next )
            }
        }

        // if no validation errors were found, proceed to handle password reset
        try {
            // extract email from request body
            const { email } = req.body

            // find user by email
            const user = await Users.findOne( { email: email } )

            // if user not found, report user not found error
            if ( !user ) {
                return reportUserNotFoundError( next )
            }

            // generate password reset token and expiry
            const resetToken = crypto.randomBytes( 32 ).toString('hex')
            const resetTokenExpiry = Date.now() + 5 * 60 * 1000 // token valid for 5 minutes

            // update user document with reset token and expiry
            user.reset_password_token = resetToken
            user.reset_password_expiry = resetTokenExpiry

            // send password reset email
            await sendPasswordResetEmail( user.email, `${frontendURL}/auth/reset-password/${resetToken}`)

            // save updated user document
            await user.save()

            // since no errors were found, send success response with password
            // reset email message
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'Password reset email sent successfully'
                }
            })

        } catch( error ) {
            return next(error)
        }
    }
)


// POST /auth/reset-password/:token - auth route for resetting user password
// expects 'token' param in the URL and JSON request body with 'password' field
router.post("/reset-password/:token",
    [
        param("token")
            .exists()
            .withMessage( ERROR_CODES.INVALID_REQUEST_TOKEN )
            .bail()
            .isHexadecimal()
            .withMessage( ERROR_CODES.INVALID_REQUEST_TOKEN )
            .bail(),
        body("password")
            .exists()
            .withMessage( ERROR_CODES.INVALID_PASSWORD_FORMAT )
            .bail()
            .isLength( { min: 6 } )
            .withMessage( ERROR_CODES.INVALID_PASSWORD_FORMAT )
            .bail()
    ],

    async function( req, res, next ) {
        // check for validation errors if any
        const errors = validationResult(req)

        // report validation errors if any was found
        if ( !errors.isEmpty() ) {
            switch ( errors.array()[0].msg ) {
                case ERROR_CODES.INVALID_REQUEST_TOKEN:
                    return reportInvalidRequestTokenError( next )
                case ERROR_CODES.INVALID_PASSWORD_FORMAT:
                    return reportInvalidPasswordFormatError( next )
            }
        }

        // if no validation errors were found, proceed to handle password reset
        try {
            // extract token and password from request
            const { token } = req.params
            const { password } = req.body

            // find user by reset token
            const user = await Users.findOne( { 
                reset_password_token: token
            } )

            // if user not found, report error
            if ( !user ) {
                return reportInvalidRequestTokenError( next )
            }

            // check if reset token has expired,
            // if true, report password reset expired error
            if ( user.reset_password_expiry < Date.now() ) {
                return reportPasswordResetExpiredError( next )
            }

            // if user found and token valid, hash the new password
            const hashedPassword = await bcrypt.hash( password, bcryptRounds )

            // generate new access and refresh tokens for the user
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            // set refresh token in an HTTP-only cookie to be used in
            // the frontend for getting new access tokens
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // use secure cookies in production
                sameSite: 'strict',
                path: '/auth/refresh-token',
                maxAge: 7 * 24 * 60 * 60 * 1000, // cookie valid for 7 days
            })

            // update user password
            user.password = hashedPassword

            // clear reset token and expiry
            user.reset_password_token = undefined
            user.reset_password_expiry = undefined

            // save updated user document
            await user.save()

            // send success response
            res.status(200).json({
                status: 'success',
                data: {
                    user: {
                        ...prepareUserResponse(user),
                        access_token: accessToken,
                        expires_in: 30 * 60 // access token expires in 30 minutes
                    }
                }
            })

        } catch( error ) {
            return next(error)
        }
    }
)


// POST /auth/magic-link - auth route for sending magic link email
// expects JSON request body with 'email' field
router.post("/magiclink",

    [
        body("email")
            .exists()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .bail()
            .isEmail()
            .withMessage( ERROR_CODES.INVALID_EMAIL )
            .bail()
    ],

    async function( req, res, next ) {
        // check for validation errors if any
        const errors = validationResult(req)

        // report validation errors if any was found
        if ( !errors.isEmpty() ) {
            switch ( errors.array()[0].msg ) {
                case ERROR_CODES.INVALID_EMAIL:
                    return reportInvalidEmailError( next )
            }
        }

        // if no validation errors were found, proceed to send magic link
        try {
            // extract email from request
            const { email } = req.body

            // find user by email
            let user = await Users.findOne( { email } )

            // if user not found, create new user with a random username
            // using magiclink as the provider
            if ( !user ) {
                user = await Users.create({
                    username: `user_${Date.now()}`, // generate random username
                    email: email,
                    provider: "magiclink"
                })
            }

            // generate magic link token
            const magicLinkToken = crypto.randomBytes( 32 ).toString('hex')
            const magicLinkExpiry = Date.now() + 5 * 60 * 1000 // token valid for 5 minutes

            // send magic link email
            await sendMagicLinkEmail( user.email, `${frontendURL}/auth/magic-link/${magicLinkToken}`)

            // update user document with magic link token and expiry
            user.magiclink_token = magicLinkToken
            user.magiclink_expiry = magicLinkExpiry

            // save updated user document
            await user.save()

            // send success response
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'Magic link sent successfully'
                }
            })

        } catch( error ) {
            return next(error)
        }
    }
)


// POST /auth/magiclink/:token - auth route for magic link login
// expects 'token' param in the URL
router.get("/magiclink/:token",
    [
        param("token")
            .exists()
            .withMessage( ERROR_CODES.INVALID_REQUEST_TOKEN )
            .bail()
            .isHexadecimal()
            .withMessage( ERROR_CODES.INVALID_REQUEST_TOKEN )
            .bail()
    ],  

    async function( req, res, next ) {
        // check for validation errors if any
        const errors = validationResult(req)

        // report validation errors if any was found
        if ( !errors.isEmpty() ) {
            return reportInvalidRequestTokenError( next )
        }

        // if no validation errors were found, proceed to handle magic link login
        try {
            // extract token from request params
            const { token } = req.params

            // find user by magic link token
            const user = await Users.findOne( { 
                magiclink_token: token,
            } )

            // if user not found or token expired, report error
            if ( !user ) {
                return reportInvalidRequestTokenError( next )
            }

            // check if magic link token has expired, 
            // if true, report magic link expired error
            if ( user.magiclink_expiry < Date.now() ) {
                return reportMagiclinkExpiredError( next )
            }
            
            // if user found and token valid, generate access and refresh tokens
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            
            // verify user email if not already verified
            // ( for new users using magic link )
            if ( !user.email_verified ) {
                user.email_verified = true
            }

            // clear magic link token and expiry
            user.magiclink_token = undefined
            user.magiclink_expiry = undefined

            // save updated user document
            await user.save()

            // set refresh token in an HTTP-only cookie to be used in
            // the frontend for getting new access tokens
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/auth/refresh-token',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            })

            // since no errors, send success response with user data and access token
            res.status(200).json({
                status: 'success',
                data: {
                    user: {
                        ...prepareUserResponse(user),
                        access_token: accessToken,
                        expires_in: 30 * 60 // access token expires in 30 minutes
                    }
                }
            })

        } catch( error ) {
            return next(error)
        }
    }
)


// POST /auth/signout - auth route for logging out user
// clears the refresh token cookie
router.post("/signout", function( req, res, next ) {
    try {
        // clear the refresh token cookie by setting it to empty
        res.clearCookie('refresh_token')

        // send success response
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Logged out successfully'
            }
        })

    } catch (error) {
        return next(error)
    }
})


// export router for plug-in into server
export default router