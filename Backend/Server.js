// import server dependencies
import express from 'express'



// import server routers
import AuthRouter from './routes/auth.js'
import AppRouter from './routes/app.js'
import ApiRouter from './routes/api.js'


// create server
const server = express()


// connect grouped routes to server using their routers
server.use('/auth', AuthRouter )
server.use('/app', AppRouter )
server.use('/api', ApiRouter )

// test route
server.get("/hello", function( req, res ) {
    res.send("hello worldd")
})

// get server connection PORT from env or default to '7000'
const PORT = process.env.PORT || 7000

// make server listen on PORT
server.listen( PORT, function() {
    console.log("server connection on port: ", PORT )
})
