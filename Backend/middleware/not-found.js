// not found middleware for handling requests 
// to invalid routes and returning a 404 error

// import middleware dependencies
import { reportInvalidRouteError } from "../utils/error-utils.js"

function notFoundHandler( req, res, next ) {
    // report invalid route error using error utility function
    reportInvalidRouteError( next )
}


// export notFoundHandler for use in server
export default notFoundHandler
