// NotFound.jsx
// This component defines the NotFound route for the web code editor application.
// It displays a user-friendly message when a user navigates to a non-existent page.


// import route dependencies
import RouteContainer from '../components/RouteContainer'
import RouteThemeToggle from '../components/RouteThemeToggle'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'


// define NotFound component to display a 404 error message
function NotFound() {
    // get navigate function to navigate programmatically
    const navigateTo = useNavigate()

    return (
        <>
            {/* Helmet for setting the page title and meta description */}
            <Helmet>
                <title>Page Not Found - CodeBloks</title>
                <meta name="description" content="The page you are looking for does not exist on CodeBloks." />
            </Helmet>

            {/* NotFound page content */}
            <div 
                className='
                    not-found 
                    h-screen 
                    w-full 
                    bg-neutral-100 dark:bg-gray-900 
                    dark:text-white 
                    overflow-auto
                '
            >
                {/* Route container for consistent layout */}
                <RouteContainer>
                    {/* Logo */}
                    <Logo />

                    <div>
                        {/* 'Oops!' heading */}
                        <h1
                            className='
                                text-9xl
                                text-gray-300 dark:text-gray-600
                                font-semibold
                                text-center
                                mt-12
                            '
                        >
                            Oops!
                        </h1>

                        {/* Informative message */}
                        <p
                            className='
                                mt-12
                                text-center
                                leading-relaxed
                                text-black dark:text-white
                            '
                        >
                            The page you are looking for does not exist on CodeBloks.
                            This might be because you have entered an incorrect URL or the page has been moved.
                            Check the URL for mistakes and try again or use alternative navigation options.
                        </p>

                        {/* Button to navigate back to home */}
                        <Button
                            className="
                                mx-auto
                                mt-8
                            "
                            onClick={ () => navigateTo("/") }
                        >
                            Go To Home
                        </Button>

                        {/* Alternative navigation links */}
                        <div
                            className='
                                mt-16
                                flex
                                gap-4
                                justify-center

                                *:capitalize
                                *:underline
                            '
                        >
                            <Link to={"/dashboard"}>
                                dashboard
                            </Link>
                            
                            <Link to={"/about"}>
                                about
                            </Link>
                            
                            <Link to={"/editor"}>
                                editor
                            </Link>
                            
                            <Link to={"/settings"}>
                                settings
                            </Link>
                        </div>
                    </div>

                    {/* Theme toggle button */}
                    <RouteThemeToggle />
                </RouteContainer>
            </div>
        </>
    )
}

export default NotFound