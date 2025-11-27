// import server dependencies
import express from 'express'
import passport from 'passport'
import { configurePassport } from './configs/passport.js'
import cors from 'cors'
import helmet from 'helmet'


// import server routers
import AuthRouter from './routes/auth.js'
import AppRouter from './routes/app.js'
import ApiRouter from './routes/api.js'
import connectDB from './db/connectDB.js'

// import server middleware
import notFoundHandler from './middleware/not-found.js'
import errorHandler from './middleware/error.js'
import logger from './middleware/logger.js'

import path from 'path'
import url from 'url'


// create server
const server = express()

// connect server to database
connectDB()

// initialize helmet middleware on server for security
server.use( 
    helmet()
)

// define cors middleware for cross-origin requests
const secureCors = cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
})
const openCors = cors()

// define helmet constraints for static files
const staticFileHelmet = helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'", "data:", "blob:", "https:"],
            "script-src": ["'self'", "https:", "'unsafe-inline'", "'unsafe-eval'"],
            "worker-src": ["'self'", "blob:"],
            // Allow images
            "img-src": ["'self'", "data:", "blob:", "https:"],
            // Allow iframe preview to load external content
            "frame-src": ["'self'", "*"],
            "frame-ancestors": ["'self'", "https:"],
            "script-src-attr": ["'unsafe-inline'"],
        },
    }
}) 

const __filename = url.fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

// static folder setup for serving shared blok requests
server.use( 
    "/share", 
    openCors, 
    staticFileHelmet, 
    express.static(path.join(__dirname, "public/share")) 
);

// initialize passport middleware on server
server.use( passport.initialize() )

// configure initialized passport instance with strategies
configurePassport( passport )

// initialize logging middleware on server
server.use( logger )

// initialize json body parsing middleware on server
server.use( express.json() )

// initialize urlencoded body parsing middleware on server
server.use( express.urlencoded({ extended: true }) )

// connect grouped routes to server using their routers with appropriate cors middleware
server.use('/auth', secureCors, AuthRouter )
server.use('/app', secureCors, AppRouter )
server.use('/api', openCors, ApiRouter )

// test route
server.get("/hello", function( req, res ) {
    res.send("hello worldd")
    
})


// initialize not-found-handling middleware on server
server.use( notFoundHandler )

// initialize error-handling middleware on server
server.use( errorHandler )


// get server connection PORT from env or default to '7000'
const PORT = process.env.PORT || 7000

// make server listen on PORT
server.listen( PORT, function() {
    console.log("server connection on port: ", PORT )
})
