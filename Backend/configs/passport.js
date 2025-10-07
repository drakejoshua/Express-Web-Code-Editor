// import passport strategies
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";

// import predefined custom error objects for error handling
import {
    invalidEmailError,
    invalidPasswordError,
    invalidAuthenticationMethodError,
    emailNotVerifiedError
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

                // if user is found but doesn't use email-password auth, 
                // report invalid authentication method error
                if ( user.provider !== "email" ) {
                    return done( invalidAuthenticationMethodError, false );
                } 

                // if user found but doesn't have email verified,
                // report email not verified error
                if ( !user.email_verified ) {
                    return done( emailNotVerifiedError, false );
                }

                // if user found and uses email-password auth, verify password
                const isMatch = await bcrypt.compare( password, user.password );

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

    // configure JWT strategy for token-based authentication
    passport.use( new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract JWT from Authorization header
            secretOrKey: process.env.JWT_SECRET // secret key to verify JWT signature
        },

        // verify callback to extract information from JWT and 
        // and authenticate user
        async function( jwtPayload, done ) {
            try {
                // find user by ID from JWT payload
                const user = await Users.findById( jwtPayload.id );

                // if user not found, return false
                if ( !user ) {
                    return done( null, false );
                }

                // if user found, return user object
                return done( null, user );
            } catch( err ) {
                return done( null, false )
            }
    }))
}
