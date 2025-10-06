// object/enum for defining various error codes used
// across the application for consistent error handling
// and reporting in responses and documentation.
export const ERROR_CODES = {
    INVALID_ROUTE: 'INVALID_ROUTE',
    INVALID_APP_ID: 'INVALID_APP_ID',
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    INVALID_PASSWORD_FORMAT: 'INVALID_PASSWORD_FORMAT',
    EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    INVALID_USERNAME: 'INVALID_USERNAME',
    EMAIL_CONFIRMATION_EXPIRED: 'EMAIL_CONFIRMATION_EXPIRED',
    INVALID_REQUEST_TOKEN: 'INVALID_REQUEST_TOKEN',
    BLOK_NOT_FOUND: 'BLOK_NOT_FOUND',
    INVALID_BLOK_NAME: 'INVALID_BLOK_NAME',
    INVALID_QUERY_FILTER: 'INVALID_QUERY_FILTER',
    INVALID_QUERY_LIMIT: 'INVALID_QUERY_LIMIT',
    
    // no error reporting functions for error codes below
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
    EMAIL_SEND_FAILURE: 'EMAIL_SEND_FAILURE',
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


// report invalid email error - reports invalid email format or
// missing email error with 400 status code
export function reportInvalidEmailError( next ) {
    const error = new Error("The email provided in the request is invalid.")
    error.statusCode = 400
    error.errorCode = ERROR_CODES.INVALID_EMAIL
    return next(error)
}

// report invalid password error - reports invalid password error
// with 401 status code
export function reportInvalidPasswordError( next ) {
    const error = new Error("The password provided is incorrect.")
    error.statusCode = 401
    error.errorCode = ERROR_CODES.INVALID_PASSWORD
    return next(error)
}

// report invalid password format error - reports invalid password
// format error with 400 status code (e.g. password too short)
export function reportInvalidPasswordFormatError( next ) {
    const error = new Error("The password provided is invalid. It must be at least 6 characters long.")
    error.statusCode = 400
    error.errorCode = ERROR_CODES.INVALID_PASSWORD_FORMAT
    return next(error)
}

// report email not verified error - reports email not verified
// error with 403 status code
export function reportEmailNotVerifiedError( next ) {
    const error = new Error("The email address provided has not been verified.")
    error.statusCode = 403
    error.errorCode = ERROR_CODES.EMAIL_NOT_VERIFIED
    return next(error)
}

// report user not found error - reports user not found
// error with 404 status code
export function reportUserNotFoundError( next ) {
    const error = new Error("The user specified in the request was not found.")
    error.statusCode = 404
    error.errorCode = ERROR_CODES.USER_NOT_FOUND
    return next(error)
}

// report email already exists error - reports email
// already exists error with 409 status code
export function reportEmailExistsError( next ) {
    const error = new Error("The email address provided is already in use by another account.")
    error.statusCode = 409
    error.errorCode = ERROR_CODES.EMAIL_ALREADY_EXISTS
    return next(error)
}

// report invalid username error - reports invalid username
// error with 400 status code
export function reportInvalidUsernameError( next ) {
    const error = new Error("The username provided is invalid.")
    error.statusCode = 400
    error.errorCode = ERROR_CODES.INVALID_USERNAME
    return next(error)
}

// report email confirmation expired error - reports email
// confirmation token expired error with 400 status code
export function reportEmailConfirmationExpiredError( next ) {
    const error = new Error("The email confirmation token provided has expired.")
    error.statusCode = 400
    error.errorCode = ERROR_CODES.EMAIL_CONFIRMATION_EXPIRED
    return next(error)
}

// report invalid request token error - reports invalid
// request token error with 401 status code
export function reportInvalidRequestTokenError( next ) {
    const error = new Error("The request token provided is invalid.")
    error.statusCode = 401
    error.errorCode = ERROR_CODES.INVALID_REQUEST_TOKEN
    return next(error)
}

// report blok not found error - reports blok not found
// error with 404 status code
export function reportBlokNotFoundError( next ) {
    const error = new Error("The blok specified in the request was not found.")
    error.statusCode = 404
    error.errorCode = ERROR_CODES.BLOK_NOT_FOUND
    return next(error)
}

// report invalid blok name error - reports invalid blok
// name error with 400 status code
export function reportInvalidBlokNameError( next ) {
    const error = new Error("The blok name provided is invalid.")
    error.statusCode = 400
    error.errorCode = ERROR_CODES.INVALID_BLOK_NAME
    return next(error)
}

// report invalid query filter error - reports invalid
// query filter error with 400 status code
export function reportInvalidQueryFilterError( next ) {
    const error = new Error("The query filter provided is invalid.")
    error.statusCode = 400
    error.errorCode = ERROR_CODES.INVALID_QUERY_FILTER
    return next(error)
}

// report invalid query limit error - reports invalid
// query limit error with 400 status code
export function reportInvalidQueryLimitError( next ) {
    const error = new Error("The query limit provided is invalid.")
    error.statusCode = 400
    error.errorCode = ERROR_CODES.INVALID_QUERY_LIMIT
    return next(error)
}