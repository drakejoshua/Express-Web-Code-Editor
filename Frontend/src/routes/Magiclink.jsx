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
import { useThemeProvider } from '../providers/ThemeProvider.jsx'


// magiclink component
export default function Magiclink() {
    const { theme, toggleTheme } = useThemeProvider();

    return (
        <>
            <Helmet>
                <title>Magiclink - CodeBloks</title>
                <meta name="description" content="Authenticate your account using Magiclink" />
            </Helmet>

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
                
                <RouteContainer>
                    <Logo/>

                    {/* <StatusCard
                        status={{
                            heading: 'Authenticating your account via magiclink...',
                            text: `
                                Please hold on while we authenticate your account. 
                                You will be redirected shortly.
                            `,
                            type: "loading"
                        }}
                        className="mt-8"
                    /> */}
                    
                    <StatusCard
                        status={{
                            heading: 'There was an issue authenticating your account via magiclink.',
                            text: `
                                An error occurred while authenticating your account via magiclink. 
                                Please try again.
                                If the issue persists, 
                                please check your internet connection or contact support.
                                Error: Invalid or expired token.
                            `,
                            type: "error",
                            redirect: "/signin",
                            redirect_content: <>
                                <FaArrowLeft/>
                                Go Back to Signin
                            </>
                        }}
                        className="mt-8"
                    />
                    
                    {/* <StatusCard
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
                    /> */}
                </RouteContainer>

                <button 
                    className='
                        magiclink--theme-toggle
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
                            magiclink--theme-toggle__icon
                        "
                    /> }
                    
                    { theme == 'light' && <FaMoon 
                        className="
                            magiclink--theme-toggle__icon
                        "
                    /> }

                    <span 
                        className="
                            magiclink--theme-toggle__text
                        ">
                        Toggle Theme
                    </span>
                </button>
            </div>
        </>
    )
}
