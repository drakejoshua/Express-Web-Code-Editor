// import multer.js
import multer from 'multer'

// import the error codes for custom error handling
import { ERROR_CODES } from '../utils/error-utils.js'


// function to filter the files based on their mime-type
// only image files are allowed to be uploaded
// else, a custom error is thrown
function fileFilter( req, file, cb ) {
    // check the mime-type of the uploaded file
    // to see if it's an image, if then accept the file,
    // else, reject the file with a custom fileFilterError
    if ( file.mimetype.startsWith("image/") ) {
        cb( null, true )
    } else {
        const fileFilterError = new Error("Invalid File Type encountered during upload.")
        fileFilterError.statusCode = 400
        fileFilterError.errorCode = ERROR_CODES.INVALID_FILE_TYPE
        cb( fileFilterError, false )
    }
}


// multer upload object
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2 // 2 MB
    }
})


// export the upload object for use in other files
export default upload