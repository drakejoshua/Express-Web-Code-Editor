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
import { SimpleCarousel, useCarousel } from '../components/simpleCarousel'
import TextField from '../components/TextField'
import { Fragment, useRef, useState } from 'react'


export default function Signup() {


    return (
        <>
            <Helmet>
                <title> Sign Up - Codebloks </title>
                <meta name="description" content="Sign up for a Codebloks account 
                to access the coding playground and start coding!" />
            </Helmet>
        
            <div className='
                    signup
                    min-h-screen
                    overflow-auto
                    flex
                    justify-center
                    bg-white dark:bg-gray-900 
                    dark:text-white 
                '
            >
                {/* multi-step signup form */}
                <SimpleCarousel.Root
                    className="
                        w-2/3 lg:w-2/4 xl:w-1/3 min-w-[320px]
                        p-4 py-12 xl:p-10 xl:py-16
                    "
                >
                    <MultiStepForm/>
                </SimpleCarousel.Root>

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


function MultiStepForm({ onSubmit = () => {} }) {
    const { handleNext, handlePrev, slides } = useCarousel()

    const passwordFieldRef = useRef(null)
    const usernameFieldRef = useRef(null)
    const emailFieldRef = useRef(null)

    const [ selectedFile, setSelectedFile ] = useState(null)

    function validateUsernameField() {
        if (usernameFieldRef.current) {
            return usernameFieldRef.current.reportValidity()
        }
    }
    function validateEmailField() {
        if (emailFieldRef.current) {
            return emailFieldRef.current.reportValidity()
        }
    }

    function moveToEmailSlide() {
        if ( validateUsernameField() ) {
            return handleNext();
        }
    }

    function moveToPasswordSlide() {
        if ( validateEmailField() ) {
            return handleNext();
        }
    }

    function handleSubmit(e) {
        // prevent default form submission behaviour
        e.preventDefault();

        // final step submit
        onSubmit();
    }

    return <Form.Root 
            className='
                signup--form
            '
            onSubmit={ handleSubmit }
        >
            {/* Form Logo */}
            <Logo
                className='
                    justify-center xl:justify-start
                '
            />

            {/* heading */}
            <h1 className='
                signup--form__heading
                font-medium
                text-gray-900 dark:text-white
                text-3xl
                mt-9
                text-center xl:text-left
            '>
                Sign up for an account
            </h1>

            {/* text */}
            <p className='
                signup--form__text
                mt-4 mb-8
                text-lg
                leading-6
                text-center xl:text-left
            '>
                Welcome back! 
                Please enter your details to sign up for an account.

                Already have an account? 
                <Link 
                    to="/auth/signin" 
                    className='
                        text-blue-900 dark:text-blue-100
                        hover:underline
                    '
                >
                    Sign in
                </Link>
            </p>

            <SimpleCarousel.Tabs
                className="
                    flex
                    justify-center
                    items-center
                    mt-4
                "
            >
                {({ index, isSelected, activeIndex }) => {
                    return (
                        <Fragment key={index}>
                            <SimpleCarousel.Tab
                                index={index}
                                className={`
                                    w-4
                                    h-4
                                    rounded-full
                                    ${ index <= activeIndex ? 'bg-gray-600' : 'bg-gray-300'}
                                `}
                            />

                            { index < slides.length - 1 && <div 
                                className={`
                                    signup--form__indicator
                                    h-1
                                    flex-grow
                                    ${index < activeIndex ? 'bg-gray-600' : 'bg-gray-300'}
                                `}
                            ></div>}
                        </Fragment>
                    )
                }}
            </SimpleCarousel.Tabs>

            <SimpleCarousel.Scroller
                className="
                    overflow-x-hidden
                    scroll-smooth
                    snap-x 
                    snap-mandatory
                    mt-3.5
                "
            >
                <SimpleCarousel.Track
                    className="
                        flex
                        transition-transform
                        duration-500
                        ease-in-out
                    "
                >
                    <SimpleCarousel.Item
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <TextField
                            ref={usernameFieldRef}
                            label="Username"
                            name="username"
                            emptyValidationMessage="Please enter your username"
                        />

                        <div 
                            className='
                                form-actions-ctn
                                flex
                                gap-2
                                mt-4
                            '
                        >
                            <Button 
                                type="button"
                                className='
                                    flex-grow
                                '
                                onClick={ moveToEmailSlide}
                            >
                                Next
                            </Button>
                        </div>
                    </SimpleCarousel.Item>

                    <SimpleCarousel.Item
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <EmailField
                            ref={emailFieldRef}
                            label="Email"
                            name="email"
                            emptyValidationMessage="Please enter your email"
                            invalidValidationMessage="Please enter a valid email"
                        />

                        <div 
                            className='
                                form-actions-ctn
                                flex
                                gap-2
                                mt-4
                            '
                        >
                            <Button 
                                type="button"
                                className='
                                    flex-grow
                                    bg-gray-600
                                    hover:bg-gray-500
                                '
                                onClick={ handlePrev }
                            >
                                Previous
                            </Button>

                            <Button 
                                type="button"
                                className='
                                    flex-grow
                                '
                                onClick={ moveToPasswordSlide }
                            >
                                Next
                            </Button>
                        </div>
                    </SimpleCarousel.Item>
                    
                    <SimpleCarousel.Item
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <Form.Field
                            className={`
                                form__file-field
                                flex 
                                flex-col
                                gap-2
                                max-w-full
                            `}
                        >
                            <Form.Label
                                className='
                                    form__file-label
                                    font-medium
                                '
                            >
                                Upload Profile Picture
                            </Form.Label>

                            <Form.Control asChild>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className='
                                        form__file-input
                                        border-2
                                        border-gray-600 dark:border-gray-300
                                        rounded-sm
                                        py-2 px-3
                                        bg-gray-600 dark:bg-gray-300
                                        text-white dark:text-black
                                        font-medium
                                        outline-none
                                    '
                                    onChange={ (e) => setSelectedFile( e.target.files[0] )}
                                />
                            </Form.Control>
                        </Form.Field>

                        { selectedFile && 
                            <img
                                className='
                                    h-30
                                    w-30
                                    mt-4
                                    rounded-lg
                                    object-cover
                                    object-center
                                    block
                                '
                                src={ URL.createObjectURL( selectedFile )}
                            />
                        }

                        <div 
                            className='
                                form-actions-ctn
                                flex
                                gap-2
                                mt-4
                            '
                        >
                            <Button 
                                type="button"
                                className='
                                    flex-grow
                                    bg-gray-600
                                    hover:bg-gray-500
                                '
                                onClick={ handlePrev }
                            >
                                Previous
                            </Button>

                            <Button 
                                type="button"
                                className='
                                    flex-grow
                                '
                                onClick={ handleNext}
                            >
                                Next
                            </Button>
                        </div>
                    </SimpleCarousel.Item>

                    <SimpleCarousel.Item
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <PasswordField
                            ref={passwordFieldRef}
                            label="Password"
                            name="password"
                            emptyValidationMessage="Please enter your password"
                            shortValidationMessage="The password can't be lower than 6 characters"
                        />

                        <div 
                            className='
                                form-actions-ctn
                                flex
                                gap-2
                                mt-4
                            '
                        >
                            <Button 
                                type="button"
                                className='
                                    flex-grow
                                    bg-gray-600
                                    hover:bg-gray-500
                                '
                                onClick={ handlePrev }
                            >
                                Previous
                            </Button>

                            <Button 
                                type="submit"
                                className='
                                    flex-grow
                                '
                            >
                                Create Account
                            </Button>
                        </div>
                    </SimpleCarousel.Item>
                </SimpleCarousel.Track>
            </SimpleCarousel.Scroller>

            {/* sign in with google */}
            <GoogleBtn
                className='
                    mt-8
                '
                text="Sign up with Google"
            />

            {/* sign in with email */}
            <MagiclinkBtn
                className='
                    mt-3
                '
                text="Sign up with email"
            />
        </Form.Root>
}