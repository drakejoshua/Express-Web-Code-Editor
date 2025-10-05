// import router dependencies
import express from 'express'
import upload from '../configs/multer.js'
import { body, param, header } from 'express-validator'

// import router middleware
import appIdAuth from '../middleware/app-id-auth.js'

// create router from express
export const router = express.Router()

// initialize appIdAuth middleware on all routes in this router
// to protect routes and ensure only requests with valid app ID can access them
router.use( appIdAuth )


// router test route
// router.get('/hello', function( req, res ) {
//     res.send("hello world: auth")
// })


// POST /auth/signup - 
router.post("/signup",
    [
        body("email")
            .exists()
            .withMessage()

    ]
function( req, res, next ) {

})




// export router for plug-in into server
export default router