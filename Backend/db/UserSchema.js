// import schema dependencies
import mongoose from "mongoose";

// Note: The UserSchema is designed to store user information, including
// personal data, authentication metadata, and email verification status.
// It includes fields for username, email, password, profile photo, and
// various tokens for password reset, magic link authentication, and email verification.
// The schema also tracks whether the user's email has been verified and the provider used for authentication.

const UserSchema = new mongoose.Schema({
    // personal user data
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // ensure email is unique across users
    },
    password: {
        type: String,
        min: 6 // minimum of 6 characters for password
    },
    profile_photo_url: {
        type: String
    },
    profile_photo_id: {
        type: String
    },

    // auth metadata
    reset_password_token: {
        type: String
    },
    reset_password_expiry: {
        type: Date,
    },
    magiclink_token: {
        type: String
    },
    magiclink_expiry: {
        type: Date,
    },
    verify_email_token: {
        type: String
    },
    verify_email_expiry: {
        type: Date,
    },

    // email verification and provider
    email_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    provider: {
        type: String,
        required: true
    },

    // api auth
    api_key: {
        type: String
    },
})


// export user model for creation of user documents
// in the users collection on database
export default mongoose.model("users", UserSchema)