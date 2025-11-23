// BlokProvider.jsx
// This provider manages blok-related operations such as fetching,
// creating, updating, and deleting bloks from the backend API.
// It uses the AuthProvider to handle user authentication and token refresh.


// import provider dependencies
import { createContext, useContext } from 'react'
import { useAuthProvider } from './AuthProvider'

// create context for sharing blok management functions
// across the application
const BlokContext = createContext()

// custom hook to access blok context from BlokProvider
export function useBlokProvider() {
    return useContext( BlokContext )
}


// define BlokProvider component
function BlokProvider({ children }) {
    // get refreshUserToken function from AuthProvider to handle token refresh
    const { refreshUserToken } = useAuthProvider()

    // backend URL and app ID from environment variables
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000"
    const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"


    // getBloks() - fetch list of bloks with optional limit and filter for the 
    // currently authenticated user
    async function getBloks( limit = 10, filter = "" ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // check if limit is a valid integer, else return error
        if ( isNaN( parseInt( limit ) ) ) {
            return {
                status: "error",
                error: {
                    message: "Invalid fetch limit provided. blok fetch limit must be an integer"
                }
            }
        }

        // check if there is a saved user token, else return error
        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            // fetch bloks from backend with provided limit and filter
            const resp = await fetch(`${ backendURL }/app/bloks?limit=${ limit }&filter=${ filter }`, {
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId
                }
            })

            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // return success response with fetched bloks data
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
                        // if token refresh is successful, retry fetching bloks
                        return getBloks( limit )
                    } else {
                        // if token refresh fails, return error
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    // if response is not ok and not 401 error, 
                    // parse error data and return error
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
                error: error
            }
        }

    }

    // getBlok() - fetch details of a single blok by its ID
    async function getBlok( blokId ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // check if blokId is provided, else return error
        if ( !blokId ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Blok Id for request. A valid Blok Id is required to fecth blok details"
                }
            }
        }

        // check if there is a saved user token, else return error
        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            // fetch blok details from backend by blokId
            const resp = await fetch(`${ backendURL }/app/bloks/${ blokId }`, {
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId
                }
            })
 

            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // return success response with fetched blok data
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
                        // if token refresh is successful, retry fetching blok details
                        return getBlok( blokId )
                    } else {
                        // if token refresh fails, return error
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    // if response is not ok and not 401 error, 
                    // parse error data and return error
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error
            }
        }
    }
    
    // createBlok() - create a new blok with provided details
    async function createBlok( blokDetails ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // check if blokDetails has a valid name, else return error
        if ( !blokDetails.name ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Blok name for request. A valid Blok name is required to create a new blok"
                }
            }
        }

        // check if there is a saved user token, else return error
        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            // send POST request to create new blok with provided details
            const resp = await fetch(`${ backendURL }/app/bloks`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( blokDetails )
            })
 

            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // return success response with created blok data
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
                        // if token refresh is successful, retry creating blok
                        return createBlok( blokDetails )
                    } else {
                        // if token refresh fails, return error
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    // if response is not ok and not 401 error, 
                    // parse error data and return error
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error
            }
        }
    }

    // deleteBlok() - delete a blok by its ID
    async function deleteBlok( blokId ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // check if blokId is provided, else return error
        if ( !blokId ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Blok Id for request. A valid Blok Id is required to delete blok"
                }
            }
        }

        // check if there is a saved user token, else return error
        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            // send DELETE request to delete blok by blokId
            const resp = await fetch(`${ backendURL }/app/bloks/${ blokId }`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId
                }
            })
 

            if ( resp.ok ) {
                // if response is ok, return success response
                return {
                    status: "success",
                    data: {
                        message: "Blok deleted successfully"
                    }
                }
            } else {
                // if response is not ok, check if it's 401 unauthorized error
                if ( resp.status === 401 ) {
                    // if 401 error, attempt to refresh user token 2 times
                    const { status, error } = await refreshUserToken()

                    if ( status === "success" ) {
                        // if token refresh is successful, retry deleting blok
                        return deleteBlok( blokId )
                    } else {
                        // if token refresh fails, return error
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    // if response is not ok and not 401 error, 
                    // parse error data and return error
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error
            }
        }
    }

    // updateBlok() - update details of a blok by its ID and provided details
    async function updateBlok( blokId, blokDetails ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        // check if blokId is provided, else return error
        if ( !blokId ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Blok Id for request. A valid Blok Id is required to fecth blok details"
                }
            }
        }

        // check if there is a saved user token, else return error
        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            // send PUT request to update blok by blokId with provided details
            const resp = await fetch(`${ backendURL }/app/bloks/${ blokId }`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( blokDetails )
            })
 

            if ( resp.ok ) {
                // if response is ok, parse response data
                const jsonData = await resp.json()

                // return success response with updated blok data
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
                        // if token refresh is successful, retry updating blok
                        return updateBlok( blokId, blokDetails )
                    } else {
                        // if token refresh fails, return error
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    // if response is not ok and not 401 error, 
                    // parse error data and return error
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            // if non-http error occurs, return error response
            return {
                status: "error",
                error
            }
        }
    }


    // return BlokContext provider with blok management functions and render children components
    return (
        <BlokContext.Provider value={{
            getBloks,
            getBlok,
            createBlok,
            deleteBlok,
            updateBlok
        }}>
            { children }
        </BlokContext.Provider>
    )
}

export default BlokProvider
