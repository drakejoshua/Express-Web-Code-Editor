import RouteContainer from '../components/RouteContainer'
import RouteThemeToggle from '../components/RouteThemeToggle'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
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
            <RouteContainer>
                <Logo />

                <div>
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

                    <Button
                        className="
                            mx-auto
                            mt-8
                        "
                    >
                        Go To Home
                    </Button>

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
                        <Link>
                            dashboard
                        </Link>
                        
                        <Link>
                            about
                        </Link>
                        
                        <Link>
                            editor
                        </Link>
                        
                        <Link>
                            settings
                        </Link>
                    </div>
                </div>

                <RouteThemeToggle />
            </RouteContainer>
        </div>
    )
}

export default NotFound