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
// authenticated app, with optional limit and filter query parameters
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




// export router for plug-in into server
export default router