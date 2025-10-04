// logging middleware for logging incoming
// request method and route on the console


function logger( req, res, next ) {
    // log request details on the console so users can see 
    // the request method and route the server is currently handling
    console.log(`${ req.method } ${ req.originalUrl }`)

    // continue execution to next middleware
    next()
}

// export logger for use in server
export default logger