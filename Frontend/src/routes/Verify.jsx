// Email Verification Route
// This route handles email confirmation and verification. 
// It serves as a callback route to redirect users from their email
// after they have clicked to confirm email.
// The actual email token is sent to and handled on the backend, so 
// this page just simply informs
// the user that they will be redirected or display a loading/error indicator.

// import route dependencies
import RouteContainer from '../components/RouteContainer';
import Logo from '../components/Logo';
import StatusCard from '../components/StatusCard';
import { Helmet } from 'react-helmet-async'
import { FaArrowRotateLeft } from 'react-icons/fa6';
import RouteThemeToggle from '../components/RouteThemeToggle';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuthProvider } from '../providers/AuthProvider';
import { useToastProvider } from '../providers/ToastProvider';


// email verify component
export default function Verify() {
    const { token } = useParams()
    const [ searchParams, setSearchParams ] = useSearchParams()

    const { verifyEmailToken, resendEmailVerification } = useAuthProvider()

    const [ verificationState, setVerificationState ] = useState("loading")
    const [ verificationError, setVerificationError ] = useState("")

    const { showToast } = useToastProvider()

    const renderCount = useRef(1)

    const navigateTo = useNavigate()

    async function verifyEmail() {
        if ( token ) {
            const { status, error } = await verifyEmailToken( token )

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

    async function resendVerificationEmail() {
        const email = searchParams.get("email")

        if ( email ) {
            const { status, error } = await resendEmailVerification( email )

            if ( status === "success" ) {
                showToast({
                    type: "success",
                    message: "Verification Email Resent Successfully"
                })
            } else {
                showToast({
                    type: "error",
                    message: error.message
                })
            }
        } else {
            showToast({
                type: "error",
                message: "No email found to resend verification, Try signing in again."
            })
        }
    }

    useEffect( function() {
        if ( renderCount.current < 2 ) {
            verifyEmail()

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
                <title>Confirm Your Email - CodeBloks</title>
                <meta name="description" content="Confirm the email for your account" />
            </Helmet>

            {/* root container */}
            <div 
                className='
                    verify 
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

                    {/* status card for email confirmation loading state */}
                    { verificationState === "loading" && <StatusCard
                        status={{
                            heading: 'Confirming your Email address...',
                            text: `
                                Please hold on while we confirm this email address 
                                for your account. You will be redirected shortly.
                            `,
                            type: "loading"
                        }}
                        className="mt-8"
                    /> }

                    {/* status card for email confirmation error state */}
                    { verificationState === "error" && <StatusCard
                        status={{
                            heading: 'There was an issue confirming your email address.',
                            text: `
                                An error occurred while confirming your email address. 
                                Please try again.
                                If the issue persists, 
                                please check your internet connection or contact support.
                                Error: ${ verificationError }
                            `,
                            type: "error",
                            action: function() {
                                resendVerificationEmail()
                            },
                            action_content: <>
                                <FaArrowRotateLeft/>
                                Try Again
                            </>
                        }}
                        className="mt-8"
                    /> }
                    
                    {/* status card for email confirmation success state */}
                    { verificationState === "loaded" && <StatusCard
                        status={{
                            heading: 'Email Confirmed Successfully!',
                            text: `
                                You have successfully confirmed your email.
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
                    /> }
                </RouteContainer>

                {/* theme toggle button for switching between light and dark mode */}
                <RouteThemeToggle/>
            </div>
        </>
    )
}
