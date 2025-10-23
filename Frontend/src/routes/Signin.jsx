// Signin route
// handles user signin functionality with a signin form.
// The form collects user email and password to authenticate
// users and redirect them to the dashboard upon successful signin.
// it displays appropriate validation messages for invalid inputs and responses.
// includes a link to trigger password reset flow if user forgets their password.
// It also provides options for third-party signin methods like Google
// and Magic Link. 



// import route dependencies
import { Form } from 'radix-ui'
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


// define signin route component
export default function Signin() {
    return (
        <>
            {/* add page title and meta info using react-helmet library */}
            <Helmet>
                <title> Sign In - Codebloks </title>
                <meta name="description" content="Sign in to your Codebloks account 
                to access the coding playground and start coding!" />
            </Helmet>
        
            {/* signin route root container */}
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

                    {/* Form heading */}
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

                    {/* Form text */}
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

                    {/* EmailField for collecting user email */}
                    <EmailField
                        label="Email"
                        name="email"
                        emptyValidationMessage="Please enter your email"
                        invalidValidationMessage="Please enter a valid email"
                    />
                    
                    {/* PasswordField for collecting user password */}
                    <PasswordField
                        label="Password"
                        name="password"
                        emptyValidationMessage="Please enter your password"
                        shortValidationMessage="The password can't be lower than 6 characters"
                        className="
                            mt-3.5
                        "
                    />

                    {/* forgot password link to trigger password reset dialog */}
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

                    {/* Form submit/signin button */}
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
