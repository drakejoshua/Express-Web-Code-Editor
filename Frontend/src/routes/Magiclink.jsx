// Magiclink Route
// This route handles Magiclink authentication. 
// It serves as a callback route for Magiclink to redirect users and authenticate them.
// The actual magiclink token is sent to and handled on the backend, so this page just simply informs
// the user that they are being redirected or display a loading/error indicator while processing
// the magiclink token

// import route dependencies
import RouteContainer from '../components/RouteContainer';
import Logo from '../components/Logo';
import StatusCard from '../components/StatusCard';
import { Helmet } from 'react-helmet-async'
import { FaArrowLeft, FaMoon, FaRegSun } from 'react-icons/fa6';
import RouteThemeToggle from '../components/RouteThemeToggle.jsx';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useToastProvider } from '../providers/ToastProvider.jsx';
import { useAuthProvider } from '../providers/AuthProvider.jsx';


// magiclink component
export default function Magiclink() {
    const { token } = useParams()

    const { verifyMagicLinkToken } = useAuthProvider()

    const [ verificationState, setVerificationState ] = useState("loading")
    const [ verificationError, setVerificationError ] = useState("")

    const renderCount = useRef(1)

    const navigateTo = useNavigate()

    async function verifyMagicLink() {
        if ( token ) {
            const { status, error } = await verifyMagicLinkToken( token )

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
            setVerificationError("Invalid Magiclink Token found in request")
        }
    }

    useEffect( function() {
        if ( renderCount.current < 2 ) {
            verifyMagicLink()

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
                <title>Magiclink - CodeBloks</title>
                <meta name="description" content="Authenticate your account using Magiclink" />
            </Helmet>

            {/* root container */}
            <div 
                className='
                    magiclink 
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
                            heading: 'Authenticating your account via magiclink...',
                            text: `
                                Please hold on while we authenticate your account. 
                                You will be redirected shortly.
                            `,
                            type: "loading"
                        }}
                        className="mt-8"
                    /> }
                    
                    {/* status card - error */}
                    { verificationState === "error" && <StatusCard
                        status={{
                            heading: 'There was an issue authenticating your account via magiclink.',
                            text: `
                                An error occurred while authenticating your account via magiclink. 
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
                            heading: 'Successfully authenticated via magiclink!',
                            text: `
                                You have successfully authenticated with your account via magiclink.
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
