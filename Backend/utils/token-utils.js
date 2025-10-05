// import dependencies
import jwt from 'jsonwebtoken';

// function to generate a JWT access token for a user
export function generateAccessToken( user ) {
    // create payload with user ID
    const payload = { id: user._id };

    // sign the token with secret key and set expiration
    return jwt.sign( 
        payload, 
        process.env.JWT_SECRET, 
        { 
            expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRY}` 
        } 
    );
}


// function to generate a JWT refresh token for a user
export function generateRefreshToken( user ) {
    // create payload with user ID
    const payload = { id: user._id };

    // sign the token with secret key and set expiration
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRY}`
        }
    )
}


// function to verify a JWT token and return the decoded payload
export function verifyToken( token ) {
    // verify the JWT token using JWT_SECRET
    const payload = jwt.verify(
        token,
        process.env.JWT_SECRET
    )

    // return the payload
    return payload
}