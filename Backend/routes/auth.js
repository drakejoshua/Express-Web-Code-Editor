// import router dependencies
import express from 'express'
import upload from '../configs/multer.js'
import { body, param, header, validationResult } from 'express-validator'
import { 
    ERROR_CODES, 
    reportEmailExistsError, 
    reportInvalidEmailError, 
    reportInvalidPasswordFormatError, 
    reportInvalidUsernameError
} from '../utils/error-utils.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// import database models
import Users from '../db/UserSchema.js'
import Bloks from '../db/BlokSchema.js'

// import router middleware
import appIdAuth from '../middleware/app-id-auth.js'
import { cloudinaryUpload } from '../utils/cloudinary-utils.js'
import { sendVerificationEmail } from '../utils/email-utils.js'


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


// POST /auth/signup - 
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
        await Users.create({
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




// export router for plug-in into server
export default router