// default error handler middleware
// for catching errors in routes and sending
// error response to client


function errorHandler( err, req, res, next ) {
    // log error message to console
    console.error('Error: ', err.message)

    // check if error has a status code and send error
    // response with the status code, else, send '500' 
    // server error response
    if ( err.statusCode ) {
        res.status( err.statusCode ).json({
            status: 'error',
            error: {
                code: err.errorCode,
                message: err.message
            }
        })
    } else {
        res.status( 500 ).json({
            status: 'error',
            error: {
                code: 'SERVER_ERROR',
                message: err.message
            }
        })
    }

    // continue execution to next middleware
    next()
}

// export errorHandler for use in server
export default errorHandler