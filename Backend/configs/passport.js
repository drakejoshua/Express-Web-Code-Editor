// import passport strategies
// import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// import predefined custom error objects for error handling
import {
    invalidEmailError,
    invalidPasswordError,
} from "../utils/error-utils.js";

// import users and bloks model
import Users from "../db/UserSchema.js";
import Bloks from "../db/BlokSchema.js";


// function to configure passport strategies for authentication
// exports it for use in server setup
export function configurePassport( passport ) {
    // configure local strategy for username-password authentication
    passport.use( new LocalStrategy(

        // set the fields to be used for username for authentication
        // from the request body
        {
            usernameField: 'email', // use 'email' field as username
        },

        // verify callback to authenticate user
        async function( email, password, done ) {
            try {
                // find user by email
                const user = await Users.findOne( { email: email } );

                // if user not found, report invalid email error
                if ( !user ) {
                    return done( invalidEmailError, false );
                }

                // if user found, verify password
                const isMatch = await user.verifyPassword( password );

                // if password does not match, report invalid password error
                if ( !isMatch ) {
                    return done( invalidPasswordError, false );
                }

                // if password is correct, return user object
                return done( null, user );
            } catch ( error ) {
                return done( error );
            }
        }
    ));
}
