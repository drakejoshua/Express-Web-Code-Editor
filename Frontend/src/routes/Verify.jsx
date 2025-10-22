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
import { FaArrowLeft, FaArrowRotateLeft, FaMoon, FaRegSun } from 'react-icons/fa6';
import RouteThemeToggle from '../components/RouteThemeToggle.jsx';


// email verify component
export default function Verify() {

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
                    {/* <StatusCard
                        status={{
                            heading: 'Confirming your Email address...',
                            text: `
                                Please hold on while we confirm this email address 
                                for your account. You will be redirected shortly.
                            `,
                            type: "loading"
                        }}
                        className="mt-8"
                    /> */}

                    {/* status card for email confirmation error state */}
                    <StatusCard
                        status={{
                            heading: 'There was an issue confirming your email address.',
                            text: `
                                An error occurred while confirming your email address. 
                                Please try again.
                                If the issue persists, 
                                please check your internet connection or contact support.
                                Error: Invalid or expired token.
                            `,
                            type: "error",
                            action: function() {
                                alert("trying again")
                            },
                            action_content: <>
                                <FaArrowRotateLeft/>
                                Try Again
                            </>
                        }}
                        className="mt-8"
                    />
                    
                    {/* status card for email confirmation success state */}
                    {/* <StatusCard
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
                    /> */}
                </RouteContainer>

                {/* theme toggle button for switching between light and dark mode */}
                <RouteThemeToggle/>
            </div>
        </>
    )
}
