// object/enum for defining various error codes used
// across the application for consistent error handling
// and reporting in responses and documentation.
export const ERROR_CODES = {
    INVALID_ROUTE: 'INVALID_ROUTE',
    INVALID_APP_ID: 'INVALID_APP_ID',
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
}


// error utility functions for creating
// and throwing errors with custom messages, error codes
// and status codes

// report invalid route error - reports invalid route
// access error with 404 status code
export function reportInvalidRouteError( next ) {
    const error = new Error("The requested route does not exist on the server.")
    error.statusCode = 404
    error.errorCode = ERROR_CODES.INVALID_ROUTE
    return next(error)
}


// report invalid app identifier error - reports invalid
// app identifier access error with 401 status code
export function reportInvalidAppIdError( next ) {
    const error = new Error("The app identifier provided in the request is invalid.")
    error.statusCode = 401
    error.errorCode = ERROR_CODES.INVALID_APP_ID
    return next(error)
}