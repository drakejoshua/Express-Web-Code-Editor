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
import { useThemeProvider } from '../providers/ThemeProvider.jsx'


// email verify component
export default function Verify() {
    const { theme, toggleTheme } = useThemeProvider();

    return (
        <>
            <Helmet>
                <title>Confirm Your Email - CodeBloks</title>
                <meta name="description" content="Confirm the email for your account" />
            </Helmet>

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
                
                <RouteContainer>
                    <Logo/>

                    {/* <StatusCard
                        status={{
                            heading: 'Confirming your Email address...',
                            text: `
                                Please hold on while we confirm this email address 
                                for your account. You will be redirected shortly.
                            `,
                            type: "loading"
                        }}
                    /> */}
                    
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
                    />
                    
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
                    /> */}
                </RouteContainer>

                <button 
                    className='
                        verify--theme-toggle
                        fixed
                        top-4
                        right-4
                        flex
                        gap-2
                        items-center
                        bg-gray-300 dark:bg-gray-700
                        p-3 px-4.5
                        rounded-lg
                    '
                    onClick={ () => toggleTheme() }
                >
                    { theme == 'dark' && <FaRegSun 
                        className="
                            verify--theme-toggle__icon
                        "
                    /> }
                    
                    { theme == 'light' && <FaMoon 
                        className="
                            verify--theme-toggle__icon
                        "
                    /> }

                    <span 
                        className="
                            verify--theme-toggle__text
                        ">
                        Toggle Theme
                    </span>
                </button>
            </div>
        </>
    )
}
