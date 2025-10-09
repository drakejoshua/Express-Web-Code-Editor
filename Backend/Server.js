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


// create server
const server = express()

// connect server to database
connectDB()

// initialize helmet middleware on server for security
server.use( helmet() )

// initialize cors middleware on server for cross-origin requests
server.use( cors() )

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

// connect grouped routes to server using their routers
server.use('/auth', AuthRouter )
server.use('/app', AppRouter )
server.use('/api', ApiRouter )

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
