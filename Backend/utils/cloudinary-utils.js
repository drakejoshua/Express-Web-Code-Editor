// import dependencies
import { v2 as cloudinary } from 'cloudinary';

// configure cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// function to upload a file buffer to cloudinary from memory
// using multer memory storage
export async function cloudinaryUpload( buffer ) {
    // wrap operation in a promise to handle async upload
    return new Promise((resolve, reject) => {
        // use upload_stream method to upload from buffer
        cloudinary.uploader.upload_stream( {
                folder: 'codebloks', // project-specific folder in cloudinary to store uploads
            },
            function( error, result ) {
                // check for errors and reject promise if any
                if ( error ) {
                    return reject( error );
                }

                // since no errors, resolve promise with result
                resolve( result );
            }
        ).end( buffer );
    });
}


// function to delete an image from cloudinary using its public_id
export async function cloudinaryDelete( public_id ) {
    // wrap operation in a promise to handle async deletion
    return new Promise((resolve, reject) => {
        // call destroy method with public_id
        cloudinary.uploader.destroy( public_id, function( error, result ) {
            // check for errors and reject promise if any
            if ( error ) {
                return reject( error );
            }

            // since no errors, resolve promise with result
            resolve( result );
        });
    });
}


// export the configured cloudinary instance for use
// in other parts of the application
export default cloudinary;