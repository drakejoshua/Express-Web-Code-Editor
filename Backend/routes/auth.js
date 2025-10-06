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
    reportInvalidUsernameError
} from '../utils/error-utils.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import passport from 'passport'

// import database models
import Users from '../db/UserSchema.js'
import Bloks from '../db/BlokSchema.js'

// import router middleware and utilities
import appIdAuth from '../middleware/app-id-auth.js'
import { cloudinaryUpload } from '../utils/cloudinary-utils.js'
import { sendVerificationEmail } from '../utils/email-utils.js'
import { generateAccessToken, generateRefreshToken } from '../utils/token-utils.js'
import { prepareUserResponse } from '../utils/response-utils.js'


// create router from express
export const router = express.Router()

// initialize appIdAuth middleware on all routes in this router
// to protect routes and ensure only requests with valid app ID can access them
router.use( appIdAuth )


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
                }
            }
        })

    } catch( error ) {
        return next(error)
    }
})


// export router for plug-in into server
export default router