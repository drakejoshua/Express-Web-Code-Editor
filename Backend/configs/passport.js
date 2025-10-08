// import passport strategies
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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

    // configure google strategy for Google OAuth authentication
    passport.use( new GoogleStrategy(
        // set the Google OAuth credentials
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth client secret
            callbackURL: process.env.GOOGLE_CALLBACK_URL, // URL to redirect after authentication
        },

        // verify callback to handle Google OAuth response
        async function( accessToken, refreshToken, profile, done ) {
            try {
                // extract user information from Google profile
                const email = profile.emails[0].value;
                const username = profile.displayName;
                const profile_photo_url = profile.photos[0].value;

                // check if user already exists in database
                let user = await Users.findOne({ email: email });

                // if user does not exist, create a new user
                if ( !user ) {
                    user = await Users.create({
                        username: username,
                        email: email,
                        provider: "google",
                        email_verified: true,
                        profile_photo_url: profile_photo_url
                    });

                    // create a default blok for the new user
                    await Bloks.create({
                        user_id: user._id,
                        name: "My First Blok",
                        html: "<!-- Welcome to Express Web Code Editor! -->\n<h1>Hello, world!</h1>",
                        css: "/* Start styling your blok! */\nbody { font-family: Arial, sans-serif; }",
                        javascript: "// Start adding JavaScript to your blok!\nconsole.log('Hello, world!');"
                    });
                }

                // return user object
                return done( null, user );
            } catch( err ) {
                return done( err, false );
            }
        }
    ));
}