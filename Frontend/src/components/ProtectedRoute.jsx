// ProtectedRoute.jsx
// This component protects routes by checking user authentication status.
// It redirects unauthenticated users to the signin page and displays
// a loading state while fetching the current user.


// import component dependencies
import { useEffect } from "react"
import { useAuthProvider } from "../providers/AuthProvider.jsx"
import { useNavigate } from "react-router-dom"


// define ProtectedRoute component
function ProtectedRoute({ children }) {
    // get user state and fetchCurrentUser function from AuthProvider
    const { user, fetchCurrentUser } = useAuthProvider()

    // define navigate function from react-router
    const navigateTo = useNavigate()

    // useEffect to handle user authentication state changes
    useEffect( () => {
        // if user state is loading, fetch the current user
        // ( This happens on initial mount )
        if ( user === "loading" ) {
            fetchCurrentUser()
        }

        // if user is logged out or unavailable, redirect to signin page
        if ( user === "logout" || user === "unavailable" ) {
            navigateTo( "/auth/signin" )
        }
    }, [ user ] )

    // render based on user authentication state
    if ( user === "loading" ) {
        // show loading state while fetching user
        return (
            <div>
                Loading Authenticated User...
            </div>
        )
    } else if ( user !== "logout" && user !== "unavailable" && user ) {
        // render children content if user is authenticated
        return (
            <>
                {children}
            </>
        )
    }
}

export default ProtectedRoute
