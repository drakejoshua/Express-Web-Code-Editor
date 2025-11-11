// Google OAuth Route
// This route handles Google OAuth authentication. 
// It serves as a callback route for Google to redirect users after they have authenticated.
// The actual OAuth logic is typically handled on the backend, so this page just simply informs
// the user that they are being redirected or display a loading indicator.

// import route dependencies
import RouteContainer from '../components/RouteContainer';
import Logo from '../components/Logo';
import StatusCard from '../components/StatusCard';
import { Helmet } from 'react-helmet-async'
import { FaArrowLeft } from 'react-icons/fa6';
import RouteThemeToggle from '../components/RouteThemeToggle.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthProvider } from '../providers/AuthProvider.jsx';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';


// google oauth component
export default function Google() {
    const { token } = useParams()

    const { verifyGoogleToken } = useAuthProvider()

    const [ verificationState, setVerificationState ] = useState("loading")
    const [ verificationError, setVerificationError ] = useState("")

    const renderCount = useRef(1)

    const navigateTo = useNavigate()

    async function verifyGoogleOAuth() {
        if ( token ) {
            const { status, error } = await verifyGoogleToken( token )

            if ( status === 'success' ) {
                setVerificationState("loaded")

                setTimeout( function() {
                    navigateTo("/dashboard")
                }, 1000)
            } else {
                setVerificationState("error")
                setVerificationError( error.message )
            }
        } else {
            setVerificationState("error")
            setVerificationError("Invalid Email Verification Token found in request")
        }
    }

    useEffect( function() {
        if ( renderCount.current < 2 ) {
            verifyGoogleOAuth()

            renderCount.current += 1
        }

        return function() {
            if ( renderCount.current ) {
                renderCount.current += 1
            }
        }
    }, [])

    return (
        <>
            {/* add page title and meta info using react-helmet library */}
            <Helmet>
                <title>Google OAuth - CodeBloks</title>
                <meta name="description" content="Authenticate your google account" />
            </Helmet>

            {/* root container */}
            <div 
                className='
                    google 
                    h-screen 
                    w-full 
                    bg-neutral-100 dark:bg-gray-900 
                    dark:text-white 
                    overflow-auto
                '
            >
                {/* route container for maintaining a standard, centered layout */}
                <RouteContainer>
                    {/* brand logo */}
                    <Logo/>

                    {/* status card - loading */}
                    { verificationState === "loading" && <StatusCard
                        status={{
                            heading: 'Authenticating your Google account...',
                            text: `
                                Please hold on while we authenticate your account. 
                                You will be redirected shortly.
                            `,
                            type: "loading"
                        }}
                        className="mt-8"
                    />}
                    
                    {/* status card - error */}
                    { verificationState === "error" && <StatusCard
                        status={{
                            heading: 'There was an issue authenticating your Google account.',
                            text: `
                                An error occurred while authenticating your Google account. 
                                Please try again.
                                If the issue persists, 
                                please check your internet connection or contact support.
                                Error: ${ verificationError }
                            `,
                            type: "error",
                            redirect: "/auth/signin",
                            redirect_content: <>
                                <FaArrowLeft/>
                                Go Back to Signin
                            </>
                        }}
                        className="mt-8"
                    />}
                    
                    {/* status card - success */}
                    { verificationState === "loaded" && <StatusCard
                        status={{
                            heading: 'Successfully authenticated with Google!',
                            text: `
                                You have successfully authenticated with your Google account.
                                You will be redirected to the dashboard shortly.
                                If you are not redirected, please click the button below.
                            `,
                            type: "success",
                            redirect: "/dashboard",
                            redirect_content: <>
                                Go to Dashboard
                            </>
                        }}
                        className="mt-8"
                    />}
                </RouteContainer>

                {/* theme toggle button for switching between light and dark mode */}
                <RouteThemeToggle/>
            </div>
        </>
    )
}
