import { useContext, useRef } from 'react'
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AUTH_ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REFRESH: "REFRESH",
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR"
}

export function useAuthProvider() {
    return useContext( AuthContext )
}


export default function AuthProvider({ children }) {
    const [ user, setUser ] = useState( "loading" )
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000"

    const authRefreshTimeout = useRef()

    // useEffect( () => {
    //     fetchCurrentUser()
    // }, [] )

    useEffect( () => {
        console.log("codebloks user", user )

        if ( user === "logout" ) {
            localStorage.setItem( "codebloks-token", "logout" )
        }

        if ( user && user !== "loading" && user !== "unavailable" && user !== "logout" ) {
            if ( user.access_token ) {
                localStorage.setItem( "codebloks-token", user.access_token )
            }

            startRefreshTimeout()
        }

        return () => {
            if ( authRefreshTimeout.current ) {
                clearTimeout( authRefreshTimeout.current )
            }
        }
    }, [ user ] )

    function startRefreshTimeout() {
        // set timeout to refresh user token before it expires
        if ( authRefreshTimeout.current ) { 
            clearTimeout(authRefreshTimeout.current);
        }

        const expiresInMs = ( user.expires_in || 1800 ) * 1000
        authRefreshTimeout.current = setTimeout( () => {
            refreshUserToken( 3 )
        }, expiresInMs - 60000 ) // refresh 1 minute before expiry
    }

    async function fetchCurrentUser() { 
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )
        const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"

        console.log("saved codebloks token", savedUserToken )

        // if no saved user token, set user state to logout and return
        if ( !savedUserToken || savedUserToken === "logout" ) {
            setUser( "logout" )
            return { status: "error", error: "No saved user token" }
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
                return { status: "success", data: json.data.user }
            } else {
                if ( resp.status === 401 ) {
                    // if 401 unauthorized error, attempt to refresh user token
                    await refreshUserToken( 3 )
                } else {
                    const errorData = await resp.json()

                    // if other http error, set user state to logout
                    setUser( "logout" )
                    return { status: "error", error: errorData.error.message || "Failed to fetch current user"}
                }
            }

        } catch ( error ) {
            // if non-http error occurs, set user state to unavailable
            setUser( "unavailable" )
            console.log( "error fetching current user: ", error )
            return { status: "error", error: error.message || "Failed to fetch current user" }
        }
    }

    async function refreshUserToken( maxRetries, count = 1 ) {
        const savedUserToken = localStorage.getItem( "codebloks-token" )
        const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"

        // check if saved user token exists or is set to logout
        if ( !savedUserToken || savedUserToken === "logout" ) {
            setUser( "logout" )
            return { status: "error", error: "No saved user token" }
        }

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
                    return { status: "error", error: "Failed to refresh user token" }
                } else {
                    // if max retries not reached, recursively call refreshUserToken
                    await refreshUserToken( maxRetries, count + 1 )
                }
            }
        } catch ( error ) {
            // if non-http error occurs, set user state to unavailable
            setUser( "unavailable" )
            console.log( "error refreshing user token: ", error )
            return { status: "error", error: error.message }
        }
    }

    async function signUpUser( signupData ) {
        const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"

        const signupFormData = new FormData()

        if ( signupData.username ) {
            signupFormData.append( "username", signupData.username )
        } else {
            return { status: "error", error: "Username is required for signup" }
        }

        if ( signupData.email ) {
            signupFormData.append( "email", signupData.email )
        } else {
            return { status: "error", error: "Email is required for signup" }
        }

        if ( signupData.password ) {
            signupFormData.append( "password", signupData.password )
        } else {
            return { status: "error", error: "Password is required for signup" }
        }

        if ( signupData.photo ) {
            signupFormData.append( "photo", signupData.photo )
        }

        try {
            const resp = await fetch( `${ backendURL }/auth/signup`, {
                method: "POST",
                headers: {
                    "x-app-id": appId
                },
                body: signupFormData
            })

            if ( resp.ok ) {
                const json = await resp.json()
                
                return { status: "success", data: json.data }
            } else {
                const errorData = await resp.json()
                return { status: "error", error: errorData.error || "Signup failed" }
            }
        } catch ( error ) {
            console.log( "error signing up user: ", error )
            return { status: "error", error: error }
        }
    }

    async function verifyEmailToken( token ) {
        const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"

        try {
            const resp = await fetch( `${ backendURL }/auth/verify-email/${ token }`, {
                method: "GET",
                headers: {
                    "x-app-id": appId
                }
            })

            if ( resp.ok ) {
                const json = await resp.json()

                setUser( json.data.user )

                return { status: "success", data: json.data }
            } else {
                const errorData = await resp.json()

                return { status: "error", error: errorData.error || "Email verification failed" }
            }
        } catch ( error ) {
            console.log( "error verifying email token: ", error )
            return { status: "error", error: error }
        }
    }

    async function signInUser( signInData ) {
        const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"

        if ( !signInData.email ) {
            return { status: "error", error: "Email is required for signin" }
        }
        
        if ( !signInData.password ) {
            return { status: "error", error: "Password is required for signin" }
        }

        try {
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
                const json = await resp.json()

                setUser( json.data.user )

                return { status: "success", data: json.data }
            } else {
                const errorData = await resp.json()

                return { status: "error", error: errorData.error || "Signin failed" }
            }
        } catch( error ) {
            console.log( "error signing in user: ", error )
            return { status: "error", error: error }
        }
    }

    async function signOutUser() {
        const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"

        try {
            const resp = await fetch( `${ backendURL }/auth/signout`, {
                method: "POST",
                headers: {
                    "x-app-id": appId
                },
                credentials: "include"
            })

            if ( resp.ok ) {
                // clear user state and remove saved user token from local storage
                setUser( "logout" )

                // clear any existing auth refresh timeout
                if ( authRefreshTimeout.current ) {
                    clearTimeout( authRefreshTimeout.current )
                }

                return { status: "success" }
            } else {
                const errorData = await resp.json()

                return { status: "error", error: errorData.error || "Signout failed" }
            }
        } catch ( error ) {
            return { status: "error", error: error }
        }
    }


    return (
        <AuthContext.Provider value={ { 
            user,
            fetchCurrentUser,
            refreshUserToken,
            signUpUser,
            verifyEmailToken,
            signInUser,
            signOutUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}
