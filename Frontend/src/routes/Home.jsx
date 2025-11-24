// import route dependencies
import Logo from '../components/Logo'
import Button from '../components/Button'
import { 
    FaBars,
    FaCodeFork,
    FaDisplay,
    FaFileExport,
    FaMoon,
    FaRegSun,
} from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Adobe from '../assets/client_logos/adobe.svg'
import Facebook from '../assets/client_logos/facebook.svg'
import Instagram from '../assets/client_logos/instagram.svg'
import Javascript from '../assets/client_logos/javascript.svg'
import Microsoft from '../assets/client_logos/microsoft.svg'
import ReactLogo from '../assets/client_logos/react.svg'
import Twitter from '../assets/client_logos/twitter.svg'
import HeroImage from '../assets/hero-image.png'
import Logoipsum_a from '../assets/client_logos/logoipsum-a.png'
import Logoipsum_b from '../assets/client_logos/logoipsum-b.png'
import Logoipsum_c from '../assets/client_logos/logoipsum-c.png'
import Logoipsum_d from '../assets/client_logos/logoipsum-d.png'
import Logoipsum_e from '../assets/client_logos/logoipsum-e.png'
import Logoipsum_f from '../assets/client_logos/logoipsum-f.png'
import Logoipsum_j from '../assets/client_logos/logoipsum-j.png'
import { useThemeProvider } from '../providers/ThemeProvider'
import { useState } from 'react'


// define Home component for the landing page
export default function Home() {
    // image address for the CTA section
    const manImageAddress = `https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.1.
    0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500`

    // get theme state and toggleTheme function from ThemeProvider
    const { theme, toggleTheme } = useThemeProvider()

    // state to manage mobile breakpoint and nav links visibility
    const [ mobileBreakpoint, setMobileBreakpoint ] = useState( window.innerWidth <= 1024 )
    const [ isNavLinksVisible, setIsNavLinksVisible ] = useState( true )

    // get navigate function from react-router-dom
    const navigateTo = useNavigate()

    return (
        <div 
            className='
                home 
                h-screen 
                w-full 
                bg-neutral-100 dark:bg-gray-900 
                dark:text-white 
                overflow-auto
            '
        >
            {/* Navbar section */}
            <div 
                className="
                    home--navbar
                    flex
                    flex-wrap lg:flex-nowrap
                    items-center
                    justify-between
                    gap-4 lg:gap-8
                    px-4 lg:px-8
                    py-6 lg:py-4
                "
            >
                {/* Logo section */}
                <Logo />

                {/* Theme toggle button */}
                <button 
                    className="
                        home--navbar__theme-toggle
                        text-xl
                        text-gray-800 dark:text-white
                        ml-auto
                    " 
                    onClick={toggleTheme}
                >
                    { theme === 'light' ? <FaMoon/> : <FaRegSun/> }
                </button>

                {/* Mobile menu toggle button */}
                { mobileBreakpoint && <button
                    className='
                        home--navbar__mobile-toggle
                        text-2xl
                    '
                    onClick={ () => setIsNavLinksVisible( !isNavLinksVisible )}
                >
                    <FaBars />
                </button>}

                {/* Navigation links */}
                { ( !mobileBreakpoint || isNavLinksVisible ) && 
                    <div 
                        className="
                            home--navbar__links
                            flex
                            flex-col lg:flex-row
                            w-full lg:w-auto
                            items-stretch lg:items-center
                            gap-4.5 lg:gap-6
                            *:capitalize
                        "
                    >

                        <a href="#features">
                            about
                        </a>

                        <a href="#features">
                            features
                        </a>

                        {/* Sign up button */}
                        <Button
                            className="
                                outline-2
                                outline-blue-600 dark:outline-blue-800
                                justify-start lg:justify-center
                            "
                            onClick={ () => navigateTo("/auth/signup")}
                        >
                            sign up
                        </Button>

                        {/* API Docs link */}
                        <a
                            className='
                                outline-2
                                outline-blue-600 dark:outline-blue-800
                                p-2
                                px-6
                                rounded-md
                                hover:bg-blue-600 dark:hover:bg-blue-800
                                hover:text-white
                                transition-all
                                text-blue-600 dark:text-white
                                font-medium
                            '
                            href="https://github.com/drakejoshua/Express-Web-Code-Editor"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            See API Docs
                        </a>
                    </div>
                }
            </div>

            {/* Hero section */}
            <div 
                className="
                    home--hero
                    flex
                    flex-col
                    items-center
                    mt-8
                    px-4
                "
            >
                {/* Pre-text */}
                <h3
                    className='
                        home--hero__pre-text
                        text-blue-600
                        font-semibold
                        capitalize
                    '
                >
                    the ultimate web code editor
                </h3>

                {/* Main heading */}
                <h1
                    className='
                        home--hero__main-text
                        mt-2
                        text-4xl lg:text-6xl
                        font-medium
                        text-center
                        leading-[1.1]
                        max-w-2xl
                        text-gray-800 dark:text-white
                    '
                >
                    Experience the future of web code editing
                </h1>

                {/* Sub-text */}
                <p
                    className='
                        home--hero__sub-text
                        mt-4
                        max-w-3xl
                        text-center
                        text-lg
                    '
                >
                    CodeBloks is a powerful web code editor designed to streamline your development workflow.
                    With an intuitive interface, real-time collaboration, and seamless deployment options.
                </p>

                {/* Hero image */}
                <img 
                    src={ HeroImage } 
                    alt="image of the hero section" 
                    className='
                        home--hero__image
                        mt-10
                        w-full lg:w-[80%]
                        rounded-lg
                        shadow-lg
                        dark:shadow-blue-800
                    '
                />
            </div>

            {/* Clients marquee section */}
            <div 
                className="
                    home--clients-marquee
                    mt-32
                    px-10
                    overflow-hidden
                "
            >
                {/* Clients logos track */}
                <div 
                    className="
                        home--clients-marquee__track
                        flex
                        gap-12
        
                        *:flex-[0_0_auto]
                        *:animate-[scroll_15s_linear_infinite]
                    "
                >
                    <div 
                        className='
                            home--clients-marquee__track-copy
                            flex
                            items-center
                            gap-12

                            *:grayscale dark:*:grayscale-50
                            *:h-14
                            *:w-auto
                        '
                    >
                        <img src={ Logoipsum_a } alt="client-logo" />
                        <img src={ Logoipsum_b } alt="client-logo" />
                        <img src={ Logoipsum_c } alt="client-logo" />
                        <img src={ Logoipsum_d } alt="client-logo" />
                        <img src={ Logoipsum_e } alt="client-logo" />
                        <img src={ Logoipsum_f } alt="client-logo" />
                        <img src={ Logoipsum_j } alt="client-logo" />
                        <img src={ Adobe } alt="client-logo" />
                        <img src={ Facebook } alt="client-logo" />
                        <img src={ Instagram } alt="client-logo" />
                        <img src={ Javascript } alt="client-logo" />
                        <img src={ Microsoft } alt="client-logo" />
                        <img src={ ReactLogo } alt="client-logo" />
                        <img src={ Twitter } alt="client-logo" />
                    </div>
                    
                    <div 
                        className='
                            home--clients-marquee__track-copy
                            flex
                            items-center
                            gap-12

                            *:grayscale dark:*:grayscale-50
                            *:h-14
                            *:w-auto
                        '
                    >
                        <img src={ Logoipsum_a } alt="client-logo" />
                        <img src={ Logoipsum_b } alt="client-logo" />
                        <img src={ Logoipsum_c } alt="client-logo" />
                        <img src={ Logoipsum_d } alt="client-logo" />
                        <img src={ Logoipsum_e } alt="client-logo" />
                        <img src={ Logoipsum_f } alt="client-logo" />
                        <img src={ Logoipsum_j } alt="client-logo" />
                        <img src={ Adobe } alt="client-logo" />
                        <img src={ Facebook } alt="client-logo" />
                        <img src={ Instagram } alt="client-logo" />
                        <img src={ Javascript } alt="client-logo" />
                        <img src={ Microsoft } alt="client-logo" />
                        <img src={ ReactLogo } alt="client-logo" />
                        <img src={ Twitter } alt="client-logo" />
                    </div>
                </div>
            </div>

            {/* Features section */}
            <div
                id='features'
                class="
                    home--features
                    mt-32
                    px-4 lg:px-16
                    py-16 lg:py-28
                    bg-[linear-gradient(to_right,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('https://images.pexels.com/photos/990423/pexels-photo-990423.jpeg')]
                    bg-cover
                    bg-center
                "
            >
                {/* Features heading */}
                <div 
                    className="
                        home--feature__heading
                        flex
                        flex-col lg:flex-row
                        lg:items-end
                        justify-between
                        gap-8
                    "
                >
                    {/* Features text group */}
                    <div
                        className='
                            home--feature__text-group
                            flex
                            flex-col
                            items-start
                        '
                    >
                        {/* Features pre-text */}
                        <h4 
                            className="
                                home--feature__pre-text
                                text-blue-200
                                font-semibold
                                capitalize
                            "
                        >
                            coding reimagined
                        </h4>

                        {/* Features main heading */}
                        <h2 
                            className="
                                home--feature__main-text
                                text-5xl lg:text-6xl
                                max-w-2xl
                                font-medium
                                mt-3
                                capitalize
                                [&]:text-white
                                leading-[1.1]
                            "
                        >
                            An all-in-one platform for web development
                        </h2>

                        {/* Features CTA button */}
                        <Link 
                            href="" 
                            className="
                                home--feature__heading-cta
                                mt-10
                                inline-block
                                p-2 px-6
                                bg-blue-600
                                text-white
                                rounded-md
                                hover:bg-blue-700
                                transition-all
                                capitalize
                                font-medium
                            "
                            to="/features"
                        >
                            explore features
                        </Link>
                    </div>

                    {/* Features sub-text */}
                    <p 
                        className="
                            home--feature__sub-text
                            max-w-lg
                            [&]:text-white
                        "
                    >
                        CodeBloks offers a comprehensive suite of tools to enhance your coding experience.
                        From syntax highlighting and code completion to version control and deployment options,
                        everything you need is just a click away.
                    </p>
                </div>

                {/* Features list */}
                <div 
                    className="
                        home--feature__list
                        mt-14 lg:mt-32
                        grid
                        grid-cols-1 lg:grid-cols-3
                        gap-12

                        
                        [&_.home--feature\_\_item]:outline-2
                        [&_.home--feature\_\_item]:outline-blue-200/50
                        [&_.home--feature\_\_item]:p-8 lg:[&_.home--feature\_\_item]:p-10 [&_.home--feature\_\_item]:py-12 lg:[&_.home--feature\_\_item]:py-14
                        [&_.home--feature\_\_item]:rounded-lg
                        [&_.home--feature\_\_item]:transition-all
                        [&_.home--feature\_\_item]:bg-[linear-gradient(to_right,rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url('https://images.pexels.com/photos/990423/pexels-photo-990423.jpeg')]
                        [&_.home--feature\_\_item]:bg-cover
                        [&_.home--feature\_\_item]:bg-center
                        [&_.home--feature\_\_item]:hover:scale-105
                        
                        [&_.home--feature\_\_item-icon]:text-4xl
                        [&_.home--feature\_\_item-icon]:text-white
                        
                        [&_.home--feature\_\_item-subject]:mt-10 lg:[&_.home--feature\_\_item-subject]:mt-18
                        [&_.home--feature\_\_item-subject]:text-2xl
                        [&_.home--feature\_\_item-subject]:font-medium
                        [&_.home--feature\_\_item-subject]:text-white
                        [&_.home--feature\_\_item-subject]:capitalize
                        
                        [&_.home--feature\_\_item-description]:mt-4
                        [&_.home--feature\_\_item-description]:text-white
                    "
                >
                    {/* run code, share code, export code */}
                    <div 
                        className="
                            home--feature__item
                        "
                    >
                        <FaDisplay
                            className="
                                home--feature__item-icon
                            "
                        />

                        <h3
                            className='
                                home--feature__item-subject
                            '
                        >
                            Run Code directly in the Browser
                        </h3>

                        <p
                            className='
                                home--feature__item-description
                            '
                        >
                            Instantly execute your code within the editor.
                            See the results in real-time without any external tools.
                        </p>
                    </div>

                    <div className="home--feature__item">
                        <FaCodeFork className='home--feature__item-icon' />

                        <h3
                            className='
                                home--feature__item-subject
                            '
                        >
                            Share your code with anyone
                        </h3>
                        <p
                            className='
                                home--feature__item-description
                            '
                        >
                            Effortlessly share your code snippets with others.
                            Get feedback and collaborate on projects with ease.
                        </p>
                    </div>

                    <div className="home--feature__item">
                        <FaFileExport className='home--feature__item-icon' />

                        <h3
                            className='
                                home--feature__item-subject
                            '
                        >
                            Export your code seamlessly
                        </h3>
                        <p
                            className='
                                home--feature__item-description
                            '
                        >
                            Export your code in various formats.
                            Whether it's for deployment or sharing, we've got you covered.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call-to-action section */}
            <div 
                className="
                    home--admonition
                    flex
                    flex-col lg:flex-row
                    items-center
                    justify-between
                    px-4 lg:px-16
                    py-14 lg:py-0
                    gap-12 lg:gap-0

                    *:flex-[1_1_50%]
                "
            >
                {/* Call-to-action content */}
                <div 
                    className="
                        home--admonition__content
                    "
                >
                    {/* Call-to-action main heading */}
                    <h2
                        className='
                            home--admonition__main-text
                            text-4xl lg:text-5xl
                            font-medium
                            leading-[1.1]
                            max-w-lg
                            text-gray-800 dark:text-white
                        '
                    >
                        Ready to elevate your web development experience?
                    </h2>

                    {/* Call-to-action sub-text */}
                    <p
                        className='
                            home--admonition__sub-text
                            mt-6
                            max-w-md
                            text-lg
                        '
                    >
                        Join CodeBloks today and unlock the full potential of web coding.
                        Everything you need to create, collaborate, and deploy is right at your fingertips.
                    </p>

                    {/* Call-to-action buttons */}
                    <div 
                        className="
                            home--admonition__cta-group
                            mt-8
                            flex
                            items-center
                            gap-6
                        "
                    >
                        {/* Get started button */}
                        <Link 
                            to="/auth/signup"
                            className='
                                home--admonition__get-started-cta
                                inline-block
                                p-2 px-6
                                bg-blue-600
                                text-white
                                rounded-md
                                capitalize
                                font-medium
                                hover:bg-blue-700
                                transition-all
                            '
                        >
                            get started
                        </Link>

                        {/* Explore features button */}
                        <Link 
                            to="/features"
                            className='
                                home--admonition__explore-features-cta
                                inline-block
                                capitalize
                                font-medium
                            '
                        >
                            explore features
                        </Link>
                    </div>
                </div>

                {/* Call-to-action image */}
                <img 
                    src={ manImageAddress } 
                    alt="" 
                    className="
                        home--admonition__image
                        h-[100vh]
                        object-cover

                    " 
                />
            </div>

            {/* Footer section */}
            <footer 
                className="
                    home--footer
                    flex
                    flex-col lg:flex-row
                    items-center
                    p-6
                    gap-4
                    border-t-2
                    border-gray-300/50
                "
            >
                {/* Logo section */}
                <Logo />

                {/* Copyright text */}
                <p>
                    &copy; 2024 CodeBloks. All rights reserved.
                </p>

                {/* Footer links */}
                <div 
                    className="
                        home--footer__links 
                        lg:ml-auto
                        flex
                        flex-wrap
                        justify-center
                        items-center
                        gap-3

                        *:capitalize
                    "
                >
                    <Link to="/privacy-policy">
                        Privacy Policy
                    </Link>

                    <Link to="/terms-of-service">
                        Terms of Service
                    </Link>

                    <Link to="/auth/signup">
                        Sign Up
                    </Link>
                </div>
            </footer>
        </div>
    )
}
