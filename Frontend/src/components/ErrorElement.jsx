import RouteContainer from './RouteContainer'
import Logo from './Logo'
import Button from './Button'
import { useRouteError } from 'react-router-dom'
import RouteThemeToggle from './RouteThemeToggle'

function ErrorElement() {
    const error = useRouteError()

    return (
        <div 
            className='
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
                        Ouch!
                    </h1>

                    <p
                        className='
                            mt-12
                            text-center
                            leading-relaxed
                            text-black dark:text-white
                        '
                    >
                        An error occured on the page you were trying to access.
                        This could be due to a variety of reasons including network issues,
                        server problems, or an unexpected bug in the application.
                        Please try navigating back to the home page and attempt your action again.
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
                            mt-12
                            bg-gray-900 dark:bg-gray-800
                            text-white
                            p-4
                            rounded-md
                            font-mono
                            whitespace-pre-wrap
                            text-sm
                        '
                    >
                        {
                            "Error: " + error.message
                        }
                    </div>
                </div>

                <RouteThemeToggle />
            </RouteContainer>
        </div>
    )
}

export default ErrorElement
