// import route dependencies
import express from 'express'

// import router middleware
import appIdAuth from '../middleware/app-id-auth.js'

// create router from express
const router = express.Router()

// initialize appIdAuth middleware on all routes in this router
// to protect routes and ensure only requests with valid app ID can access them
router.use( appIdAuth )


// router test route
router.get('/hello', function( req, res ) {
    res.send("hello world: app")
})





// export router for plug-in into server
export default router