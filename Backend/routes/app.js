// import route dependencies
import express from 'express'
import passport from 'passport'
import { body, query, validationResult } from 'express-validator'
import { ERROR_CODES, reportInvalidQueryFilterError, reportInvalidQueryLimitError } from '../utils/error-utils.js'

// import router middleware
import appIdAuth from '../middleware/app-id-auth.js'

// import Bloks mongoose database model 
import Bloks from '../db/BlokSchema.js'
import { prepareBlokResponse } from '../utils/response-utils.js'

// create router from express
const router = express.Router()

// initialize appIdAuth middleware on all routes in this router
// to protect routes and ensure only requests with valid app ID can access them
router.use( appIdAuth )


// router test route
// router.get('/hello', function( req, res ) {
//     res.send("hello world: app")
// })


// GET /app/bloks?limit={limit}&filter={filter} - get list of code bloks for the
// currently authenticated user, with optional limit and filter query parameters
router.get('/bloks', 
    // authenticate user using passport JWT strategy
    // { session: false } option disables session creation
    // since we are using token-based authentication
    passport.authenticate('jwt', { session: false }),

    // validate request query parameters using express-validator
    [
        query('limit')
            .optional() // limit is optional
            .default(10) // default to 10 if not provided
            .isInt({ min: 1, max: 100 }) // must be an integer between 1 and 100
            .withMessage( ERROR_CODES.INVALID_QUERY_LIMIT )
            .bail() // stop running validations if this one fails
            .toInt(), // convert to integer
        query('filter')
            .optional() // filter is optional
            .isString() // must be a string
            .withMessage( ERROR_CODES.INVALID_QUERY_FILTER )
            .bail()
    ],

    async function( req, res, next ) {
        // get the validation errors if any
        const errors = validationResult( req )

        // check for any validation errors and report
        // them if any
        if ( !errors.isEmpty() ) {
            switch( errors.array()[0].msg ) {
                case ERROR_CODES.INVALID_QUERY_LIMIT:
                    return reportInvalidQueryLimitError( next )
                case ERROR_CODES.INVALID_QUERY_FILTER:
                    return reportInvalidQueryFilterError( next )
            }
        }

        // extract the limit and filter values from the 
        // request query
        const limit = req.query.limit || 10
        const filter = req.query.filter || ""

        // extract passport's authenticated user data from the request
        const user = req.user

        // since no validation errors, proceed to extract all bloks 
        // created by authenticated user using the "limit" and "filter" 
        // params

        try {
            // build mongoose .find() query using provided query info
            const bloksQuery = {
                user_id: user._id
            }

            if ( filter ) {
                bloksQuery.name = { $regex: filter, $options: "i" }
            }


            // get bloks created by authenticated user from the database
            const userBloks = await Bloks.find( bloksQuery )
                                    .limit( limit )

            // get the total number of bloks created by the authenticated
            // user ( for pagination )
            const totalBlokCount = await Bloks.countDocuments( bloksQuery )

            // since no errors fetching data from database, send success 
            // response containing sanitized blok data array and total bloks count
            res.json({
                status: "success",
                data: {
                    bloks: userBloks.map( function( blok ) {
                        return prepareBlokResponse( blok )
                    } ),
                    totalBloks: totalBlokCount
                }
            })
        } catch( err ) {
            return next( err )
        }
    } 
)


// POST /app/bloks - creates a new code blok for currently authenticated user
// expects JSON body with required name field and optional html, css and js fields
router.post("/bloks",
    // authenticate user using passport JWT strategy
    // { session: false } option disables session creation
    // since we are using token-based authentication
    passport.authenticate('jwt', { session: false }),

    // validate the name, html, css and js in the
    // incoming request data using express-validator
    [
        body("name")
            .exists()
            .withMessage( ERROR_CODES.INVALID_BLOK_NAME )
            .bail()
            .isString()
            .withMessage( ERROR_CODES.INVALID_BLOK_NAME )
            .bail()
    ],

    async function( req, res, next ) {
        // get validation errors if any
        const errors = validationResult( req )

        // check for any validation errors and report
        // them if any
        if ( !errors.isEmpty() ) {
            switch( errors.array()[0].msg ) {
                case ERROR_CODES.INVALID_BLOK_NAME:
                    return next( new Error( ERROR_CODES.INVALID_BLOK_NAME ) )
            }
        }

        // extract the blok data from the request body
        const { name, html, css, javascript } = req.body

        // extract passport's authenticated user data from the request
        const user = req.user

        // since no validation errors, proceed to create
        // a new blok for the authenticated user
        try {
            // create new blok document using the Bloks mongoose model
            const newBlok = await Bloks.create({
                user_id: user._id,
                name: name,
                html: html || "",
                css: css || "",
                javascript: javascript || ""
            })

            // since no errors occurred, send success response with created
            // blok data
            res.status(201).json({
                status: "success",
                data: {
                    blok: prepareBlokResponse( newBlok )
                }
            })
        } catch( err ) {
            return next( err )
        }
    }
)




// export router for plug-in into server
export default router