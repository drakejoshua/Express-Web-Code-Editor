// import route dependencies
import express from 'express'
import passport from 'passport'
import { body, query, param, validationResult } from 'express-validator'
import { ERROR_CODES, reportBlokNotFoundError, reportInvalidBlokDataError, reportInvalidBlokIdError, reportInvalidBlokNameError, reportInvalidQueryFilterError, reportInvalidQueryLimitError } from '../utils/error-utils.js'

// import router middleware
import appIdAuth from '../middleware/app-id-auth.js'

// import Bloks mongoose database model 
import Bloks from '../db/BlokSchema.js'

// import utility functions and constants
import { prepareBlokResponse } from '../utils/response-utils.js'
import { BLOK_LAYOUTS, BLOK_THEMES } from '../utils/blok-utils.js'

// create router from express
export const router = express.Router()

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


// GET /app/bloks/:id - get a specific code blok by its ID for the currently 
// authenticated user
router.get("/bloks/:id",
    // authenticate user using passport JWT strategy
    // { session: false } option disables session creation
    // since we are using token-based authentication
    passport.authenticate('jwt', { session: false }),

    // validate the blok ID in the request parameters
    // ensuring it is a valid MongoDB ObjectId using express-validator
    [
        param("id")
            .exists()
            .withMessage( ERROR_CODES.INVALID_BLOK_ID )
            .bail()
            .isMongoId()
            .withMessage( ERROR_CODES.INVALID_BLOK_ID )
            .bail()
    ],

    async function( req, res, next ) {
        // get validation errors if any
        const errors = validationResult( req )

        // check for any validation errors and report
        // them if any
        if ( !errors.isEmpty() ) {
            switch( errors.array()[0].msg ) {
                case ERROR_CODES.INVALID_BLOK_ID:
                    return reportInvalidBlokIdError( next )
            }
        }

        // extract the blok ID from the request parameters
        const blokId = req.params.id

        // extract passport's authenticated user data from the request
        const user = req.user

        // since no validation errors, proceed to get the specific blok
        // for the authenticated user
        try {
            // find the blok by ID and ensure it belongs to the authenticated user
            const blok = await Bloks.findOne({
                _id: blokId,
                user_id: user._id
            })

            // if blok not found, report error
            if ( !blok ) {
                return reportBlokNotFoundError( next )
            }

            // since no errors occurred, send success response with blok data
            res.json({
                status: "success",
                data: {
                    blok: prepareBlokResponse( blok )
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
            .notEmpty()
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
                    return reportInvalidBlokNameError( next )
            }
        }

        // extract the blok data from the request body
        const { name, html, css, javascript, settings } = req.body

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
                javascript: javascript || "",
                settings: settings || {}
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


// PUT /app/bloks/:id - updates an existing code blok by its ID for the currently
// authenticated user
// expects JSON body with optional name, html, css, js and settings
// fields to update
router.put("/bloks/:id",
    // authenticate user using passport JWT strategy
    // { session: false } option disables session creation
    // since we are using token-based authentication
    passport.authenticate('jwt', { session: false }),

    // validate the blok ID in the request parameters
    // ensuring it is a valid MongoDB ObjectId
    // and validate the optional name, html, css, js and settings in the
    // incoming request data using express-validator
    [
        param("id")
            .exists()
            .withMessage( ERROR_CODES.INVALID_BLOK_ID )
            .bail()
            .isMongoId()
            .withMessage( ERROR_CODES.INVALID_BLOK_ID )
            .bail(),
        body("name")
            .optional()
            .isString()
            .notEmpty()
            .withMessage( ERROR_CODES.INVALID_BLOK_NAME )
            .bail(),
        body("settings")
            .optional()
            .isObject()
            .withMessage( ERROR_CODES.INVALID_BLOK_DATA )
            .bail(),
        body("html")
            .optional()
            .isString()
            .withMessage( ERROR_CODES.INVALID_BLOK_DATA )
            .bail(),
        body("css")
            .optional()
            .isString()
            .withMessage( ERROR_CODES.INVALID_BLOK_DATA )
            .bail(),
        body("javascript")
            .optional()
            .isString()
            .withMessage( ERROR_CODES.INVALID_BLOK_DATA )
            .bail()
    ],

    async function( req, res, next ) {
        // get validation errors if any
        const errors = validationResult( req )

        // check for any validation errors and report
        // them if any
        if ( !errors.isEmpty() ) {
            switch( errors.array()[0].msg ) {
                case ERROR_CODES.INVALID_BLOK_ID:
                    return reportInvalidBlokIdError( next )
                case ERROR_CODES.INVALID_BLOK_NAME:
                    return reportInvalidBlokNameError( next )
                case ERROR_CODES.INVALID_BLOK_DATA:
                    return reportInvalidBlokDataError( next )
            }
        }

        // extract the blok ID from the request parameters
        const blokId = req.params.id

        // extract the blok data to update from the request body
        const { name, html, css, javascript, settings } = req.body

        // extract passport's authenticated user data from the request
        const user = req.user

        // since no validation errors, proceed to update the specific blok
        // for the authenticated user
        try {
            // get the existing blok to update from the database
            const blok = await Bloks.findOne({
                _id: blokId,
                user_id: user._id
            })

            // if blok not found, report error
            if ( !blok ) {
                return reportBlokNotFoundError( next )
            }

            // update the blok fields that are provided in the request
            // body

            if ( name ) {
                blok.name = name    // update name if provided
            }
            if ( html ) {
                blok.html = html    // update html if provided
            }
            if ( css ) {
                blok.css = css      // update css if provided
            }
            if ( javascript ) {
                blok.javascript = javascript    // update javascript if provided
            }

            // update settings if provided and valid
            // only allow updating specific settings fields
            if ( BLOK_THEMES.includes( settings?.theme ) ) {
                blok.settings.theme = settings.theme    // update theme if provided and valid
            }
            
            if (
                settings?.font_size &&
                Number.isInteger( settings.font_size ) &&
                settings?.font_size >= 8 &&
                settings?.font_size <= 36
            ) {
                blok.settings.font_size = settings.font_size    // update font size if provided and valid
            }

            if (
                settings?.tab_size &&
                Number.isInteger( settings?.tab_size ) &&
                settings?.tab_size >= 2 &&
                settings?.tab_size <= 8
            ) {
                blok.settings.tab_size = settings.tab_size    // update tab size if provided and valid
            }

            if ( typeof settings?.auto_complete === "boolean" ) {
                blok.settings.auto_complete = settings.auto_complete    // update auto complete if provided and valid
            }

            if (
                settings?.editor_layout &&
                BLOK_LAYOUTS.includes( settings.editor_layout )
            ) {
                blok.settings.editor_layout = settings.editor_layout    // update editor layout if provided and valid
            }

            // save the updated blok back to the database
            await blok.save()

            // send success response with updated blok data
            res.status(200).json({
                status: "success",
                data: {
                    blok: prepareBlokResponse( blok )
                }
            })
        } catch( err ) {
            return next( err )
        }
    }
)


// DELETE /app/bloks/:id - deletes a specific code blok by its ID for the currently
// authenticated user
router.delete("/bloks/:id",
    // authenticate user using passport JWT strategy
    // { session: false } option disables session creation
    // since we are using token-based authentication
    passport.authenticate('jwt', { session: false }),

    // validate the blok ID in the request parameters
    // ensuring it is a valid MongoDB ObjectId using express-validator
    [
        param("id")
            .exists()
            .withMessage( ERROR_CODES.INVALID_BLOK_ID )
            .bail()
            .isMongoId()
            .withMessage( ERROR_CODES.INVALID_BLOK_ID )
            .bail()
    ],

    // handle request to delete a specific blok
    async (req, res, next) => {
        // check for validation error if any
        const errors = validationResult( req )

        // report validation error if any was found
        if ( !errors.isEmpty() ) {
            return reportInvalidBlokIdError( next )
        }

        // extract the blok ID from the request parameters
        const blokId = req.params.id

        // extract passport's authenticated user data from the request
        const user = req.user

        try {
            // find the blok to delete from the database
            const blok = await Bloks.deleteOne({
                _id: blokId,
                user_id: user._id
            })

            // if blok not found, report error
            if ( blok.deletedCount == 0 ) {
                return reportBlokNotFoundError( next )
            }

            // send delete success response
            res.status(204).send()
        } catch( err ) {
            return next( err )
        }
    }
)


// export router for plug-in into server
export default router