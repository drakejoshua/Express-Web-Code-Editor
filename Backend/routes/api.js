// import route dependencies
import express from 'express'


// create router from express
const router = express.Router()


// router test route
router.get('/hello', function( req, res ) {
    res.send("hello world: api")
})





// export router for plug-in into server
export default router