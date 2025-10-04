// import server dependencies
import express from 'express'



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

// initialize logging middleware on server
server.use( logger )


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
