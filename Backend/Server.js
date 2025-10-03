// import server dependencies
import express from 'express'


// create server
const server = express()

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
