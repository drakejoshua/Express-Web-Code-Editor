// import database connection dependencies
import mongoose from "mongoose";

async function connectDB() {
    // show initialization message
    console.log("initializing database connection...")

    // connect mongoose to database
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`) 
        console.log("DB connected successfully")
    } catch( err ) {
        // report error if unable to connect to 
        // database and exit the code
        console.log("Database connection error: ", err.message )
        process.exit(1)
    }
}

export default connectDB