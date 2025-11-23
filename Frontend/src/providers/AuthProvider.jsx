// import provider dependencies
import { useContext, useRef } from 'react'
import { createContext, useEffect, useState } from 'react'

// create context for sharing auth state and functions
// across the application
const AuthContext = createContext()


// custom hook to access auth context from AuthProvider
export function useAuthProvider() {
    return useContext( AuthContext )
}


// define AuthProvider component to manage authentication state
export default function AuthProvider({ children }) {
    // initialize user state with "loading" status
    const [ user, setUser ] = useState( "loading" )

    // get backend URL and app ID from environment variables
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000"
    const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"
    
    // reference to store auth refresh timeout ID
    const authRefreshTimeout = useRef()

    // useEffect to handle user state changes and token management
    useEffect( () => {
        // handle logout case - if user is set to "logout", replace saved 
        // token from local storage with "logout"
        if ( user === "logout" ) {
            localStorage.setItem( "codebloks-token", "logout" )
        }

        // if user is valid, save access token to local storage and
        // start token refresh timeout
        if ( user && user !== "loading" && user !== "unavailable" && user !== "logout" ) {
            if ( user.access_token ) {
                localStorage.setItem( "codebloks-token", user.access_token )
            }

            startRefreshTimeout()
        }

        // cleanup function to clear auth refresh timeout on unmount or user change
        return () => {
            if ( authRefreshTimeout.current ) {
                clearTimeout( authRefreshTimeout.current )
            }
        }
    }, [ user ] )


    // startRefreshTimeout() - sets a timeout to refresh the user token
    function startRefreshTimeout() {
        // clear any existing auth refresh timeout
        if ( authRefreshTimeout.current ) { 
            clearTimeout(authRefreshTimeout.current);
        }

        // calculate timeout duration based on token expiry time else 
        // default to 30 minutes
        const expiresInMs = ( user.expires_in || 1800 ) * 1000

        // set timeout to refresh token 1 minute before expiry
        authRefreshTimeout.current = setTimeout( () => {
            refreshUserToken( 3 )
        }, expiresInMs - 60000 ) // refresh 1 minute before expiry
    }

    // fetchCurrentUser() - fetches the current authenticated user from backend
    async function fetchCurrentUser() { 
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // if no saved user token, set user state to logout and return
        if ( !savedUserToken || savedUserToken === "logout" ) {
            setUser( "logout" )
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            // if saved user token found, fetch current user data from backend
            const resp = await fetch( `${ backendURL }/auth/me`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ savedUserToken }`,
                    "x-app-id": appId
                }
            })

            // check if http error occurred, if so, check if it's 401 unauthorized error
            // and refresh user token, if not 401 error, set user state to logout
            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()

                // set user state to fetched user data
                setUser( json.data.user )

                // return success from function
                return { status: "success", data: json.data }
            } else {
                if ( resp.status === 401 ) {
                    // if 401 unauthorized error, attempt to refresh user token
                    await refreshUserToken( 3 )
                } else {
                    const errorData = await resp.json()

                    // if other http error, set user state to logout
                    setUser( "logout" )
                    return { status: "error", error: errorData.error || "Failed to fetch current user"}
                }
            }

        } catch ( error ) {
            // if non-http error occurs, set user state to unavailable
            setUser( "unavailable" )
            console.log( "error fetching current user: ", error )
            return { status: "error", error: error }
        }
    }

    // refreshUserToken() - refreshes the user authentication token
    // with optional maxRetries( default 3 ) and count( default 1 ) parameters for retry logic
    async function refreshUserToken( maxRetries = 3, count = 1 ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // check if saved user token exists or is set to logout
        if ( !savedUserToken || savedUserToken === "logout" ) {
            setUser( "logout" )
            return { 
                status: "error", 
                error: {
                    message: "No saved user token"
                }
            }
        }

        // clear any existing auth refresh timeout
        if ( authRefreshTimeout.current ) {
            clearTimeout( authRefreshTimeout.current )
        }


        try {
            // refresh user token by sending refresh request to backend
            const refreshResp = await fetch( `${ backendURL }/auth/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "x-app-id": appId
                }
            })

            if ( refreshResp.ok ) {
                // if refresh response is ok, parse response data
                const refreshData = await refreshResp.json()

                // update user state with refreshed user data
                setUser( refreshData.data.user )

                // return success from function
                return { status: "success", data: refreshData.data.user }
            } else {
                // if refresh response is not ok, check if max retries reached
                if ( count >= maxRetries ) {
                    // if max retries reached, set user state to logout
                    setUser( "logout" )
                    return { status: "error", error: { message: "Failed to refresh user token" } }
                } else {
                    // if max retries not reached, recursively call refreshUserToken
                    await refreshUserToken( maxRetries, count + 1 )
                }
            }
        } catch ( error ) {
            // if non-http error occurs, set user state to unavailable
            setUser( "unavailable" )
            return { status: "error", error: error }
        }
    }

    // signUpUser() - signs up a new user with provided signup data
    async function signUpUser( signupData ) {
        // create FormData object to hold signup data
        const signupFormData = new FormData()

        // check if username is valid ( non-empty ), else return error
        // if valid, append to FormData
        if ( signupData.username ) {
            signupFormData.append( "username", signupData.username )
        } else {
            return { 
                status: "error", 
                error: {
                    message: "Username is required for signup"
                }
            } 
        }

        // check if email is valid ( non-empty ), else return error
        // if valid, append to FormData
        if ( signupData.email ) {
            signupFormData.append( "email", signupData.email )
        } else {
            return { 
                status: "error", 
                error: {
                    message: "Email is required for signup"
                }
            }
        }

        // check if password is valid ( non-empty ), else return error
        // if valid, append to FormData
        if ( signupData.password ) {
            signupFormData.append( "password", signupData.password )
        } else {
            return { 
                status: "error", 
                error: {
                    message: "Password is required for signup"
                }
            }
        }

        // if photo is provided, append to FormData
        if ( signupData.photo ) {
            signupFormData.append( "photo", signupData.photo )
        }


        try {
            // send signup request to backend with signup FormData
            const resp = await fetch( `${ backendURL }/auth/signup`, {
                method: "POST",
                headers: {
                    "x-app-id": appId
                },
                body: signupFormData
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()
                
                // return success response from function
                return { status: "success", data: json.data }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                // return error response from function
                return { status: "error", error: errorData.error || "Signup failed" }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error: error }
        }
    }

    // verifyEmailToken() - verifies user email with provided token
    async function verifyEmailToken( token ) {
        // check if token is valid ( non-empty ), else return error
        if ( !token ) {
            return {
                status: "error",
                error: {
                    message: "Token is required for email verification"
                }
            }
        }

        try {
            // send email verification request to backend with token
            const resp = await fetch( `${ backendURL }/auth/verify-email/${ token }`, {
                method: "GET",
                headers: {
                    "x-app-id": appId
                }
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()

                // set user state to verified user data
                setUser( json.data.user )

                // return success response from function
                return { status: "success", data: json.data }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                // return error response from function
                return { status: "error", error: errorData.error || "Email verification failed" }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error: error }
        }
    }

    // signInUser() - signs in user with provided email and password
    async function signInUser( signInData ) {
        // check if email is valid ( non-empty ), else return error
        if ( !signInData.email ) {
            return { status: "error", error: "Email is required for signin" }
        }
        
        // check if password is valid ( non-empty ), else return error
        if ( !signInData.password ) {
            return { status: "error", error: "Password is required for signin" }
        }


        try {
            // send signin request to backend with email and password
            const resp = await fetch( `${ backendURL }/auth/signin`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": appId
                },
                body: JSON.stringify({
                    email: signInData.email,
                    password: signInData.password
                })
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()

                // set user state to signed-in user data
                setUser( json.data.user )

                // return success response from function
                return { status: "success", data: json.data }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                // return error response from function
                return { status: "error", error: errorData.error || "Signin failed" }
            }
        } catch( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error: error }
        }
    }

    // resendEmailVerification() - resends email verification to provided email
    async function resendEmailVerification( email ) {
        // check if email is valid ( non-empty ), else return error
        if ( !email ) {
            return {
                status: "error",
                error: {
                    message: "Email is required to re-send verification"
                }
            }
        }


        try {
            // send request to backend to resend email verification
            const resp = await fetch(`${ backendURL }/auth/verify-email`, {
                method: "POST",
                headers: {
                    'x-app-id': appId,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email })
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()

                // return success response from function
                return {
                    status: "success",
                    data: json.data
                }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                return {
                    status: "error",
                    error: errorData.error
                }
            }
        } catch( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error: error
            }
        }
    }

    // signOutUser() - signs out the currently signed-in user
    async function signOutUser() {
        try {
            // send signout request to backend
            const resp = await fetch( `${ backendURL }/auth/signout`, {
                method: "POST",
                headers: {
                    "x-app-id": appId
                },
                credentials: "include"
            })


            if ( resp.ok ) {
                // if response is ok, clear user state and remove saved user token from local storage
                setUser( "logout" )

                // clear any existing auth refresh timeout
                if ( authRefreshTimeout.current ) {
                    clearTimeout( authRefreshTimeout.current )
                }

                // return success response from function
                return { status: "success" }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                return { status: "error", error: errorData.error || "Signout failed" }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error: error }
        }
    }

    // signInWithMagicLink() - initiates sign-in process using a magic link sent to the user's email
    async function signInWithMagicLink( email ) {
        // check if email is valid ( non-empty ), else return error
        if ( !email ) {
            return { status: "error", error: { message: "Email is required for magic link signin"} }
        }


        try {
            // send request to backend to initiate magic link signin
            const resp = await fetch( `${ backendURL }/auth/magiclink`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": appId
                },
                body: JSON.stringify({ email })
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()

                // return success response from function
                return { status: "success", data: json.data }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                return { status: "error", error: errorData.error || { message: "Magic link signin failed" } }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error: error }
        }
    }

    // verifyMagicLinkToken() - verifies the magic link token received from the user's email
    async function verifyMagicLinkToken( token ) {
        // check if token is valid ( non-empty ), else return error
        if ( !token ) {
            return { 
                status: "error", 
                error: { 
                    message: "Invalid magic link token. Magic link token is required for verification" 
                } 
            }
        }


        try {
            // send request to backend to verify magic link token
            const resp = await fetch( `${ backendURL }/auth/magiclink/${ token }`, {
                method: "GET",
                headers: {
                    "x-app-id": appId
                }
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()

                // set user state to verified user data
                setUser( json.data.user )

                // return success response from function
                return { status: "success", data: json.data }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                return { status: "error", error: errorData.error || { message: "Magic link verification failed"} }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error: error }
        }
    }
    
    // signInWithGoogle() - initiates sign-in process using Google OAuth
    function signInWithGoogle() {
        // open Google OAuth sign-in page in the current window
        window.open( `${ backendURL }/auth/google`, "_self" )
    }

    // verifyGoogleToken() - verifies the Google OAuth token received after sign-in
    async function verifyGoogleToken( token ) {
        // check if token is valid ( non-empty ), else return error
        if ( !token ) {
            return { 
                status: "error",
                error: {
                    message: "Invalid Google token. Google token is required for verification"
                }
            }
        }


        try {
            // send request to backend to verify Google token
            const resp = await fetch( `${ backendURL }/auth/me`, {
                method: "POST",
                headers: {
                    "x-app-id": appId,
                    'Authorization': `Bearer ${ token }`
                }
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const json = await resp.json()

                // set user state to verified user data
                setUser( { 
                    ...json.data.user, 
                    access_token: token 
                } )
            
                // return success response from function
                return { status: "success", data: json.data }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                return { status: "error", error: errorData.error || { message: "Google token verification failed" } }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error: error }
        }
    }

    // resetPassword() - initiates password reset process by sending reset link to user's email
    async function resetPassword( email ) {
        // check if email is valid ( non-empty ), else return error
        if ( !email ) {
            return {
                status: "error",
                error: {
                    message: "An email is required to reset the password for that account"
                }
            }
        }


        try {
            // send request to backend to initiate password reset process
            const resp = await fetch(`${ backendURL }/auth/reset-password`, {
                method: "POST",
                headers: {
                    "x-app-id": appId,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email })
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // return success response from function
                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                return {
                    status: "error",
                    error: errorData.error
                }
            }
        } catch( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error: error
            }
        }
    }
    
    // changePasswordUsingResetToken() - changes user password using provided reset token and new password
    async function changePasswordUsingResetToken( token, password ) {
        // check if token is valid ( non-empty ), else return error
        if ( !token ) {
            return {
                status: "error",
                error: {
                    message: "Invalid password reset token. The token is required to change user password"
                }
            }
        }

        // check if password is valid ( non-empty ), else return error
        if ( !password ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Password. A valid Password is required for password chnage"
                }
            }
        }


        try {
            // send request to backend to change password using reset token
            const resp = await fetch(`${ backendURL }/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "x-app-id": appId,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ password })
            })

            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // set user state to updated user data
                setUser( jsonData.data.user )

                // return success response from function
                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                // if response is not ok, parse error data and return error response
                const errorData = await resp.json()

                return {
                    status: "error",
                    error: errorData.error
                }
            }
        } catch( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error: error
            }
        }
    }

    // updateUser() - updates user details such as username, email, password, and photo
    async function updateUser( userDetails, deletePhoto = false ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // if no saved user token, set user state to logout and return error
        if ( !savedUserToken || savedUserToken === "logout" ) {
            setUser( "logout" )
            return { status: "error", error: { message: "No saved user token" } }
        }

        // create FormData object to hold updated user details
        const updateFormData = new FormData()

        // check if new username is valid ( at least 3 characters ), else return error
        // if valid, append to FormData
        if ( userDetails.username ) {
            if ( userDetails.username.length > 2 ) {
                updateFormData.append( "username", userDetails.username )
            } else {
                return { 
                    status: "error", 
                    error: {
                        message: "A Username( at least 3 characters ) is required to update profile."
                    }
                }
            }
        }
        
        // check if new email is valid ( contains "@" and "." ), else return error
        // if valid, append to FormData
        if ( userDetails.email ) {
            if ( userDetails.email.includes( "@" ) && userDetails.email.includes( "." ) ) {
                updateFormData.append( "email", userDetails.email )
            } else {
                return { 
                    status: "error",
                    error: {
                        message: "A valid Email is required to update profile."
                    }
                }
            }
        }
        
        // check if new password is valid ( at least 6 characters ), else return error
        // if valid, append to FormData
        if ( userDetails.password ) {
            if ( userDetails.password.length > 5) {
                updateFormData.append( "password", userDetails.password )
            } else {
                return { 
                    status: "error",
                    error: {
                        message: "A Password( at least 6 characters ) is required to update profile."
                    }
                }
            }
        }
        
        // if new photo is provided, append to FormData
        if ( userDetails.photo ) {
            updateFormData.append( "photo", userDetails.photo )
        }


        try {
            // send POST request to update user details
            const resp = await fetch(
                `${ backendURL }/auth/update?deletePhoto=${ deletePhoto }`, 
                {
                    method: "POST",
                    headers: {
                        'x-app-id': appId,
                        'Authorization': `Bearer ${ savedUserToken }`
                    },
                    body: updateFormData
                }
            )

            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // set user state to updated user data
                setUser( jsonData.data.user )

                // return success status and updated user data
                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                // if response is not ok, check if it's 401 unauthorized error
                if ( resp.status === 401 ) {
                    // if 401 error, attempt to refresh user token 2 times
                    const { status, error } = await refreshUserToken()

                    // if token refresh is successful, retry updating user details
                    if ( status === "success" ) {
                        return updateUser( userDetails, deletePhoto )
                    } else {
                        // if token refresh fails, return error
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    // if response is not ok and not 401 error, return error
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error
            }
        }
    }

    // generateAPIKey() - generates a new API key for the authenticated user
    async function generateAPIKey() {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // if no saved user token, set user state to logout and return
        if ( !savedUserToken || savedUserToken === "logout" ) {
            setUser( "logout" )
            return { status: "error", error: { message: "No saved user token" } }
        }


        try {
            // send request to backend to generate new API key
            const resp = await fetch( `${ backendURL }/auth/api-key`, {
                method: "POST",
                headers: {
                    'x-app-id': appId,
                    'Authorization': `Bearer ${ savedUserToken }`
                }
            })


            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // update user state with new API key
                setUser( jsonData.data.user )

                // return success response from function
                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                // if response is not ok, check if it's 401 unauthorized error
                if ( resp.status === 401 ) {
                    // if 401 error, attempt to refresh user token 2 times
                    const { status, error } = await refreshUserToken()

                    if ( status === "success" ) {
                        // if token refresh is successful, retry generating API key
                        return generateAPIKey()
                    } else {
                        // if token refresh fails, return error
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    // if response is not ok and not 401 error, return error
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return { status: "error", error }
        }
    }


    // return AuthContext provider with user state, auth functions
    // and render children components
    return (
        <AuthContext.Provider value={ { 
            user,
            updateUser,
            fetchCurrentUser,
            refreshUserToken,
            signUpUser,
            verifyEmailToken,
            signInUser,
            signOutUser,
            resendEmailVerification,
            signInWithMagicLink,
            verifyMagicLinkToken,
            signInWithGoogle,
            verifyGoogleToken,
            resetPassword,
            changePasswordUsingResetToken,
            generateAPIKey
        }}>
            { children }
        </AuthContext.Provider>
    )
}
