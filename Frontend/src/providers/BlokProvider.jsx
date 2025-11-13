import { createContext, useContext } from 'react'
import { useAuthProvider } from './AuthProvider'

const BlokContext = createContext()

export function useBlokProvider() {
    return useContext( BlokContext )
}


function BlokProvider({ children }) {
    const { refreshUserToken } = useAuthProvider()
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000"
    const appId = import.meta.env.VITE_APP_ID || "ah3294hd434983ub4b4y3r34rhb4"


    async function getBloks( limit = 10, filter = "" ) {// retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        if ( isNaN( parseInt( limit ) ) ) {
            return {
                status: "error",
                error: {
                    message: "Invalid fetch limit provided. blok fetch limit must be an integer"
                }
            }
        }

        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            const resp = await fetch(`${ backendURL }/app/bloks?limit=${ limit }&filter=${ filter }`, {
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId
                }
            })

            if ( resp.ok ) {
                const jsonData = await resp.json()

                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                if ( resp.status === 401 ) {
                    const { status, error } = await refreshUserToken()

                    if ( status === "success" ) {
                        return getBloks( limit )
                    } else {

                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch( error ) {
            return {
                status: "error",
                error: error
            }
        }

    }

    async function getBlok( blokId ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        if ( !blokId ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Blok Id for request. A valid Blok Id is required to fecth blok details"
                }
            }
        }

        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            const resp = await fetch(`${ backendURL }/app/bloks/${ blokId }`, {
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId
                }
            })
 

            if ( resp.ok ) {
                const jsonData = await resp.json()

                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                if ( resp.status === 401 ) {
                    const { status, error } = await refreshUserToken()

                    if ( status === "success" ) {
                        return getBlok( blokId )
                    } else {
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            return {
                status: "error",
                error
            }
        }
    }
    
    async function createBlok( blokDetails ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        if ( !blokDetails.name ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Blok name for request. A valid Blok name is required to create a new blok"
                }
            }
        }

        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
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
                const jsonData = await resp.json()

                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                if ( resp.status === 401 ) {
                    const { status, error } = await refreshUserToken()

                    if ( status === "success" ) {
                        return createBlok( blokDetails )
                    } else {
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            return {
                status: "error",
                error
            }
        }
    }

    async function deleteBlok( blokId ) {
        // retrieve saved user token from local storage if any
        const savedUserToken = localStorage.getItem( "codebloks-token" )

        if ( !blokId ) {
            return {
                status: "error",
                error: {
                    message: "Invalid Blok Id for request. A valid Blok Id is required to delete blok"
                }
            }
        }

        if ( !savedUserToken || savedUserToken === "logout" ) {
            return { status: "error", error: { message: "No saved user token" } }
        }

        try {
            const resp = await fetch(`${ backendURL }/app/bloks/${ blokId }`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${ savedUserToken }`,
                    'x-app-id': appId
                }
            })
 

            if ( resp.ok ) {
                const jsonData = await resp.json()

                return {
                    status: "success",
                    data: jsonData.data
                }
            } else {
                if ( resp.status === 401 ) {
                    const { status, error } = await refreshUserToken()

                    if ( status === "success" ) {
                        return getBlok( blokId )
                    } else {
                        return {
                            status: "error",
                            error
                        }
                    }
                } else {
                    const errorData = await resp.json()

                    return {
                        status: "error",
                        error: errorData.error
                    }
                }
            }
        } catch ( error ) {
            return {
                status: "error",
                error
            }
        }
    }


    return (
        <BlokContext.Provider value={{
            getBloks,
            createBlok,
            deleteBlok
        }}>
            { children }
        </BlokContext.Provider>
    )
}

export default BlokProvider
