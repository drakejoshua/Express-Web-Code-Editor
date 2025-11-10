import { useEffect } from "react"
import { useAuthProvider } from "../providers/AuthProvider.jsx"
import { useNavigate } from "react-router-dom"


function ProtectedRoute({ children }) {
    const { user, fetchCurrentUser } = useAuthProvider()
    const navigateTo = useNavigate()

    useEffect( () => {
        if ( user === "loading" ) {
            fetchCurrentUser()
        }

        if ( user === "logout" || user === "unavailable" ) {
            navigateTo( "/auth/signin" )
        }
    }, [ user ] )

    if ( user === "loading" ) {
        return (
            <div>
                Loading Authenticated User...
            </div>
        )
    } else if ( user !== "logout" && user !== "unavailable" && user ) {
        return (
            <>
                {children}
            </>
        )
    }
}

export default ProtectedRoute
