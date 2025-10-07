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
    MAGICLINK_EXPIRED: 'MAGICLINK_EXPIRED',
    PASSWORD_RESET_EXPIRED: 'PASSWORD_RESET_EXPIRED',
    INVALID_REQUEST_TOKEN: 'INVALID_REQUEST_TOKEN',
    BLOK_NOT_FOUND: 'BLOK_NOT_FOUND',
    INVALID_BLOK_NAME: 'INVALID_BLOK_NAME',
    INVALID_QUERY_FILTER: 'INVALID_QUERY_FILTER',
    INVALID_QUERY_LIMIT: 'INVALID_QUERY_LIMIT',
    INVALID_AUTHENTICATION_METHOD: 'INVALID_AUTHENTICATION_METHOD',
    INVALID_UPDATE_DATA: 'INVALID_UPDATE_DATA',
    
    // no error reporting functions for error codes below
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
    EMAIL_SEND_FAILURE: 'EMAIL_SEND_FAILURE',
}


// error utility functions for creating
// and throwing errors with custom messages, error codes
// and status codes


// predefined invalid route error - used to report
// invalid route access with 404 status code
export const invalidRouteError = new Error("The requested route does not exist on the server.")
    invalidRouteError.statusCode = 404
    invalidRouteError.errorCode = ERROR_CODES.INVALID_ROUTE

// report invalid route error - reports invalid route
// access error with 404 status code
export function reportInvalidRouteError( next ) {
    return next(invalidRouteError)
}


// predefined invalid app identifier error - used to report
// invalid app identifier access with 401 status code
export const invalidAppIdError = new Error("The app identifier provided in the request is invalid.")
    invalidAppIdError.statusCode = 401
    invalidAppIdError.errorCode = ERROR_CODES.INVALID_APP_ID

// report invalid app identifier error - reports invalid
// app identifier access error with 401 status code
export function reportInvalidAppIdError( next ) {
    return next(invalidAppIdError)
}

// predefined invalid email error - used to report
// invalid email format or missing email error with 400 status code
export const invalidEmailError = new Error("The email provided in the request is invalid.")
    invalidEmailError.statusCode = 400
    invalidEmailError.errorCode = ERROR_CODES.INVALID_EMAIL

// report invalid email error - reports invalid email format or
// missing email error with 400 status code
export function reportInvalidEmailError( next ) {
    return next(invalidEmailError)
}


// predefined invalid password error - used to report
// invalid password error with 401 status code
export const invalidPasswordError = new Error("The password provided is incorrect.")
    invalidPasswordError.statusCode = 401
    invalidPasswordError.errorCode = ERROR_CODES.INVALID_PASSWORD

// report invalid password error - reports invalid password error
// with 401 status code
export function reportInvalidPasswordError( next ) {
    return next(invalidPasswordError)
}


// predefined invalid password format error - used to report
// invalid password format error with 400 status code
export const invalidPasswordFormatError = new Error("The password provided is invalid. It must be at least 6 characters long.")
    invalidPasswordFormatError.statusCode = 400
    invalidPasswordFormatError.errorCode = ERROR_CODES.INVALID_PASSWORD_FORMAT

// report invalid password format error - reports invalid password
// format error with 400 status code (e.g. password too short)
export function reportInvalidPasswordFormatError( next ) {
    return next(invalidPasswordFormatError)
}


// predefined email not verified error - used to report
// email not verified error with 403 status code
export const emailNotVerifiedError = new Error("The email address provided has not been verified.")
    emailNotVerifiedError.statusCode = 403
    emailNotVerifiedError.errorCode = ERROR_CODES.EMAIL_NOT_VERIFIED

// report email not verified error - reports email not verified
// error with 403 status code
export function reportEmailNotVerifiedError( next ) {
    return next(emailNotVerifiedError)
}


// predefined user not found error - used to report
// user not found error with 404 status code
export const userNotFoundError = new Error("The user specified in the request was not found.")
    userNotFoundError.statusCode = 404
    userNotFoundError.errorCode = ERROR_CODES.USER_NOT_FOUND

// report user not found error - reports user not found
// error with 404 status code
export function reportUserNotFoundError( next ) {
    return next(userNotFoundError)
}


// predefined email already exists error - used to report
// email already exists error with 409 status code
export const emailAlreadyExistsError = new Error("The email address provided is already in use by another account.")
    emailAlreadyExistsError.statusCode = 409
    emailAlreadyExistsError.errorCode = ERROR_CODES.EMAIL_ALREADY_EXISTS

// report email already exists error - reports email
// already exists error with 409 status code
export function reportEmailExistsError( next ) {
    return next(emailAlreadyExistsError)
}


// predefined invalid username error - used to report
// invalid username error with 400 status code
export const invalidUsernameError = new Error("The username provided is invalid.")
    invalidUsernameError.statusCode = 400
    invalidUsernameError.errorCode = ERROR_CODES.INVALID_USERNAME

// report invalid username error - reports invalid username
// error with 400 status code
export function reportInvalidUsernameError( next ) {
    return next(invalidUsernameError)
}


// predefined email confirmation expired error - used to report
// email confirmation session expired error with 400 status code
export const emailConfirmationExpiredError = new Error("The email confirmation session provided has expired.")
    emailConfirmationExpiredError.statusCode = 400
    emailConfirmationExpiredError.errorCode = ERROR_CODES.EMAIL_CONFIRMATION_EXPIRED

// report email confirmation expired error - reports email
// confirmation session expired error with 400 status code
export function reportEmailConfirmationExpiredError( next ) {
    return next(emailConfirmationExpiredError)
}


// predefined magiclink expired error - used to report
// magiclink token expired error with 400 status code
export const magiclinkExpiredError = new Error("The magiclink session provided has expired.")
    magiclinkExpiredError.statusCode = 400
    magiclinkExpiredError.errorCode = ERROR_CODES.MAGICLINK_EXPIRED

// report magiclink expired error - reports magiclink
// token expired error with 400 status code
export function reportMagiclinkExpiredError( next ) {
    return next(magiclinkExpiredError)
}


// predefined password reset expired error - used to report
// password reset session expired error with 400 status code
export const passwordResetExpiredError = new Error("The password reset session provided has expired.")
    passwordResetExpiredError.statusCode = 400
    passwordResetExpiredError.errorCode = ERROR_CODES.PASSWORD_RESET_EXPIRED

// report password reset expired error - reports password
// reset token expired error with 400 status code
export function reportPasswordResetExpiredError( next ) {
    return next(passwordResetExpiredError)
}


// predefined invalid request token error - used to report
// invalid request token error with 401 status code
export const invalidRequestTokenError = new Error("The request token provided is invalid.")
    invalidRequestTokenError.statusCode = 401
    invalidRequestTokenError.errorCode = ERROR_CODES.INVALID_REQUEST_TOKEN

// report invalid request token error - reports invalid
// request token error with 401 status code
export function reportInvalidRequestTokenError( next ) {
    return next(invalidRequestTokenError)
}


// predefined blok not found error - used to report
// blok not found error with 404 status code
export const blokNotFoundError = new Error("The blok specified in the request was not found.")
    blokNotFoundError.statusCode = 404
    blokNotFoundError.errorCode = ERROR_CODES.BLOK_NOT_FOUND

// report blok not found error - reports blok not found
// error with 404 status code
export function reportBlokNotFoundError( next ) {
    return next(blokNotFoundError)
}


// predefined invalid blok name error - used to report
// invalid blok name error with 400 status code
export const invalidBlokNameError = new Error("The blok name provided is invalid.")
    invalidBlokNameError.statusCode = 400
    invalidBlokNameError.errorCode = ERROR_CODES.INVALID_BLOK_NAME

// report invalid blok name error - reports invalid blok
// name error with 400 status code
export function reportInvalidBlokNameError( next ) {
    return next(invalidBlokNameError)
}


// predefined invalid query filter error - used to report
// invalid query filter error with 400 status code
export const invalidQueryFilterError = new Error("The query filter provided is invalid.")
    invalidQueryFilterError.statusCode = 400
    invalidQueryFilterError.errorCode = ERROR_CODES.INVALID_QUERY_FILTER

// report invalid query filter error - reports invalid
// query filter error with 400 status code
export function reportInvalidQueryFilterError( next ) {
    return next(invalidQueryFilterError)
}


// predefined invalid query limit error - used to report
// invalid query limit error with 400 status code
export const invalidQueryLimitError = new Error("The query limit provided is invalid.")
    invalidQueryLimitError.statusCode = 400
    invalidQueryLimitError.errorCode = ERROR_CODES.INVALID_QUERY_LIMIT

// report invalid query limit error - reports invalid
// query limit error with 400 status code
export function reportInvalidQueryLimitError( next ) {
    return next(invalidQueryLimitError)
}


// predefined invalid authentication method error - used to report
// invalid authentication method error with 400 status code
export const invalidAuthenticationMethodError = new Error(`This signin used is not valid 
    for this account. Please try signing using magiclink or google.`)
    invalidAuthenticationMethodError.statusCode = 401
    invalidAuthenticationMethodError.errorCode = ERROR_CODES.INVALID_AUTHENTICATION_METHOD

// report invalid authentication method error - reports invalid
// authentication method error with 401 status code
export function reportInvalidAuthenticationMethodError( next ) {
    return next(invalidAuthenticationMethodError)
}

// predefined invalid update data error - used to report
// that user profile can't be updated due to being an OAuth user
export const invalidUpdateDataError = new Error("User profile cannot be updated because this account is managed via google or magiclink.")
invalidUpdateDataError.statusCode = 400
invalidUpdateDataError.errorCode = ERROR_CODES.INVALID_UPDATE_DATA

// report invalid update data error - reports that user profile can't be updated
// due to being an OAuth user with 400 status code
export function reportInvalidUpdateDataError(next) {
    return next(invalidUpdateDataError)
}
