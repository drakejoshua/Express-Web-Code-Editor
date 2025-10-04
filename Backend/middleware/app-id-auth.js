// app identifer authentication middleware
// for authenticating incoming requests
// using a predefined app identifier from the request headers

// import middleware dependencies
import { reportInvalidAppIdError } from "../utils/error-utils"

function appIdAuth( req, res, next ) {
    // get app identifier from request headers
    const appId = req.headers['x-app-id']

    // check if app identifier matches the predefined value
    if ( appId && appId === process.env.APP_ID ) {
        // if app identifier is valid, 
        // continue execution to next middleware
        next()
    } else {
        // if app identifier is invalid, 
        // report invalid app id error
        reportInvalidAppIdError( next )
    }
}

// export appIdAuth for use in server
export default appIdAuth