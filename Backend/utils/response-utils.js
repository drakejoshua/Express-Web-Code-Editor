// contains utility functions to prepare standardized responses for users
// and bloks in the application
// these functions help maintain consistency in response formats
// and status codes across different routes and controllers


// send success response for users excluding 
// sensitive fields like password or refresh token
export function prepareUserResponse( user ) {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        profile_photo_url: user.profile_photo_url,
        email_verified: user.email_verified,
        provider: user.provider,
        api_key: user.api_key || "",
    }
}


// send success response for bloks
export function prepareBlokResponse( blok ) {
    return {
        id: blok._id,
        name: blok.name,
        user_id: blok.user_id,
        html: blok.html || "",
        css: blok.css || "",
        javascript: blok.javascript || "",
        settings: blok.settings,
    }
}