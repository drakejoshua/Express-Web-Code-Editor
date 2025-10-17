import { Form } from 'radix-ui'
import { FaGoogle } from 'react-icons/fa6'
import PasswordField from '../components/PasswordField'
import Button from '../components/Button'
import Logo from '../components/Logo'
import EmailField from '../components/EmailField'
import Carousel from '../components/Carousel'
import RouteThemeToggle from '../components/RouteThemeToggle'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import GoogleBtn from '../components/GoogleBtn'
import MagiclinkBtn from '../components/MagiclinkBtn'


export default function Signin() {
    return (
        <>
            <Helmet>
                <title> Sign In - Codebloks </title>
                <meta name="description" content="Sign in to your Codebloks account 
                to access the coding playground and start coding!" />
            </Helmet>
        
            <div className='
                    signin
                    min-h-screen
                    overflow-auto
                    flex
                    justify-center
                    bg-white dark:bg-gray-900 
                    dark:text-white 
                '
            >
                {/* signin form */}
                <Form.Root 
                    className='
                        signin--form
                        w-2/3 lg:w-2/4 xl:w-1/3 min-w-[320px]
                        p-4 py-12 xl:p-10 xl:py-16
                    '
                >
                    {/* Form Logo */}
                    <Logo
                        className='
                            justify-center xl:justify-start
                        '
                    />

                    {/* heading */}
                    <h1 className='
                        signin--form__heading
                        font-medium
                        text-gray-900 dark:text-white
                        text-3xl
                        mt-9
                        text-center xl:text-left
                    '>
                        Sign in to your account
                    </h1>

                    {/* text */}
                    <p className='
                        signin--form__text
                        mt-4 mb-8
                        text-lg
                        leading-6
                        text-center xl:text-left
                    '>
                        Welcome back! 
                        Please enter your details to sign in to your account.

                        Don't have an account? 
                        <Link 
                            to="/auth/signup" 
                            className='
                                text-blue-900 dark:text-blue-100
                                hover:underline
                            '
                        >
                            Sign up
                        </Link>
                    </p>

                    {/* email */}
                    <EmailField
                        label="Email"
                        name="email"
                        emptyValidationMessage="Please enter your email"
                        invalidValidationMessage="Please enter a valid email"
                    />
                    
                    {/* password */}
                    <PasswordField
                        label="Password"
                        name="password"
                        emptyValidationMessage="Please enter your password"
                        shortValidationMessage="The password can't be lower than 6 characters"
                        className="
                            mt-3.5
                        "
                    />

                    {/* forgot password link */}
                    <a href="#" className='
                        signin--form__forgot-password
                        mt-4
                        font-medium
                        text-blue-900 dark:text-blue-100
                        hover:underline
                        block
                        text-right
                    '>
                        Forgot password?
                    </a>

                    {/* submit button */}
                    <Button 
                        type="submit"
                        className='
                            w-full
                            mt-6
                        '
                    >
                        Sign in
                    </Button>

                    {/* sign in with google */}
                    <GoogleBtn
                        className='
                            mt-8
                        '
                        text="Sign in with Google"
                    />

                    {/* sign in with email */}
                    <MagiclinkBtn
                        className='
                            mt-3
                        '
                        text="Sign in with Email"
                    />
                </Form.Root>

                {/* signin carousel */}
                <Carousel
                    className='
                        hidden xl:block
                        w-2/3
                        self-stretch 
                        overflow-auto
                    '
                />

                {/* theme toggle */}
                <RouteThemeToggle />
            </div>
        </>
    )
}
