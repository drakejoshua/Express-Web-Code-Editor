// Signup route
// handles user signup with a multi-step form using a carousel for navigation
// The form collects username, email, profile picture and password in steps
// Each step validates its inputs before allowing navigation to the next step
// The final step submits the collected data to create a new user account.
// The route also includes a display carousel showcasing code examples and live previews.
// Theme toggle is provided for switching between light and dark modes.
// The route sends users data to the backend for account creation upon form submission,
// displaying appropriate success or error messages based on the response and redirects
// users to the dashboard upon successful signup.



// import route dependencies
import { Form } from 'radix-ui'
import PasswordField from '../components/PasswordField'
import Button from '../components/Button'
import Logo from '../components/Logo'
import EmailField from '../components/EmailField'
import Carousel from '../components/Carousel'
import RouteThemeToggle from '../components/RouteThemeToggle'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import GoogleBtn from '../components/GoogleBtn'
import MagiclinkBtn from '../components/MagiclinkBtn'
import { SimpleCarousel, useCarousel } from '../components/simpleCarousel'
import TextField from '../components/TextField'
import { useRef, useState } from 'react'
import MultiStepTabs from '../components/MultiStepTabs'
import FinishButton from '../components/FinishButton'
import StepActions from '../components/StepActions'
import PreviousButton from '../components/PreviousButton'
import NextButton from '../components/NextButton'
import Step from '../components/Step'
import { useAuthProvider } from '../providers/AuthProvider'
import { useToastProvider } from '../providers/ToastProvider'
import { useDialogProvider } from '../providers/DialogProvider'
import { BACKEND_ERROR_CODES } from '../utils/error_util'


// define signup route component
export default function Signup() {
    return (
        <>
            {/* add page title and meta description using react-helmet library */}
            <Helmet>
                <title> Sign Up - Codebloks </title>
                <meta name="description" content="Sign up for a Codebloks account 
                to access the coding playground and start coding!" />
            </Helmet>
        
            {/* signup route root container */}
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
                    {/* use custom MultiStepForm component to prevent issues with accessing */}
                    {/* carousel context from within the form */}
                    <MultiStepForm/>
                </SimpleCarousel.Root>

                {/* signin display carousel( code example and live preview ) */}
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


// multi-step signup form component
// handles form steps, validation and submission with carousel integration
function MultiStepForm() {
    // get carousel navigation handlers and slides state from carousel context
    const { handleNext, handlePrev, slides } = useCarousel()

    const { signUpUser } = useAuthProvider()

    const { showToast } = useToastProvider()
    const { showDialog, hideDialog } = useDialogProvider()

    const navigateTo = useNavigate()

    // form field states
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    // refs for form fields
    const passwordFieldRef = useRef(null)
    const usernameFieldRef = useRef(null)
    const emailFieldRef = useRef(null)

    // state for selected profile picture file ( used to show preview )
    const [ selectedFile, setSelectedFile ] = useState(null)

    // validateUsernameField() - validates the username field using its ref
    // and reports any validation messages if invalid
    function validateUsernameField() {
        if (usernameFieldRef.current) {
            return usernameFieldRef.current.reportValidity()
        }
    }

    // validateEmailField() - validates the email field using its ref
    // and reports any validation messages if invalid
    function validateEmailField() {
        if (emailFieldRef.current) {
            return emailFieldRef.current.reportValidity()
        }
    }

    // moveToEmailSlide() - validates username field and moves to email slide if 
    // username is valid
    function moveToEmailSlide() {
        if ( validateUsernameField() ) {
            return handleNext();
        }
    }

    // moveToPasswordSlide() - validates email field and moves to password slide if
    // email is valid
    function moveToPasswordSlide() {
        if ( validateEmailField() ) {
            return handleNext();
        }
    }

    function showEmailVerificationDialog( message ) {
        const dialogId = showDialog({
            title: 'Verify your email',
            description: message,
            content: (
                <div 
                    className="
                        email-verify-dialog
                        mt-6
                    "
                >
                    <Button
                        className="
                            w-full
                        "
                        onClick={ handleOpenEmailApp }
                    >
                        Open Email App
                    </Button>
                </div>
            )
        })

        function handleOpenEmailApp() {
            // open user's default email app
            window.open('mailto:', '_blank')

            // close the dialog
            hideDialog( dialogId )
        }
            
    }

    function showEmailAlreadyExistsDialog( message ) {
        const dialogId = showDialog({
            title: 'User Account Already Exists',
            description: message,
            content: (
                <div 
                    className="
                        email-exists-dialog
                        mt-6
                    "
                >
                    <Button
                        className="
                            w-full
                        "
                        onClick={ () => hideDialog( dialogId ) }
                    >
                        Retry with different email
                    </Button>
                </div>
            )
        })
    }


    // handleSubmit() - handles final form submission
    async function handleSubmit(e) {
        // prevent default form submission behaviour
        e.preventDefault();

        // send signup request to backend
        const { status, error, data } = await signUpUser({
            username,
            email,
            password,
            photo: selectedFile
        })

        if ( status === 'success' ) {
            // show email verification dialog to user upon successful signup
            showEmailVerificationDialog( data.message )
        } else {
            if ( error.code === BACKEND_ERROR_CODES.EMAIL_ALREADY_EXISTS ) {
                showEmailAlreadyExistsDialog( error.message )
            } else {
                showToast({
                    type: 'error',
                    message: error.message
                })
            }
        }
    }

    // render component
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

            {/* form heading */}
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

            {/* form text */}
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

            {/* multi-step form indicators for progress and navigation */}
            <MultiStepTabs 
                slides={slides}
                className="mt-4"
            />

            {/* form steps parent container */}
            <SimpleCarousel.Scroller
                className="
                    overflow-x-hidden
                    scroll-smooth
                    snap-x 
                    snap-mandatory
                    mt-3.5
                "
            >
                {/* form steps track */}
                <SimpleCarousel.Track
                    className="
                        flex
                        transition-transform
                        duration-500
                        ease-in-out
                    "
                >
                    {/* username step */}
                    <Step>
                        {/* TextField for username */}
                        <TextField
                            ref={usernameFieldRef}
                            label="Username"
                            name="username"
                            emptyValidationMessage="Please enter your username"
                            value={ username }
                            onChange={ (e) => setUsername( e.target.value ) }
                        />

                        {/* form actions container */}
                        <StepActions
                            className="mt-4"
                        >
                            {/* <NextButton> for next step */}
                            <NextButton
                                onClick={ moveToEmailSlide }
                            >
                                Next
                            </NextButton>
                        </StepActions>
                    </Step>

                    {/* email step */}
                    <Step
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        {/* EmailField for email */}
                        <EmailField
                            ref={emailFieldRef}
                            label="Email"
                            name="email"
                            emptyValidationMessage="Please enter your email"
                            invalidValidationMessage="Please enter a valid email"
                            value={ email }
                            onChange={ (e) => setEmail( e.target.value ) }
                        />

                        {/* form actions container */}
                        <StepActions
                            className="mt-4"
                        >
                            {/* <PreviousButton> for previous step */}
                            <PreviousButton 
                                onClick={ handlePrev }
                            >
                                Previous
                            </PreviousButton>

                            {/* <NextButton> for next step */}
                            <NextButton
                                onClick={ moveToPasswordSlide }
                            >
                                Next
                            </NextButton>
                        </StepActions>
                    </Step>

                    {/* image upload step */}
                    <Step
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        {/* custom form field for file upload */}
                        <Form.Field
                            className={`
                                form__file-field
                                flex 
                                flex-col
                                gap-2
                            `}
                        >
                            {/* image upload field label */}
                            <Form.Label
                                className='
                                    form__file-label
                                    font-medium
                                '
                            >
                                Upload Profile Picture ( optional )
                            </Form.Label>

                            {/* file input */}
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
                                        w-full
                                    '
                                    // handle file selection and set selected file state to show preview
                                    onChange={ (e) => setSelectedFile( e.target.files[0] )}
                                />
                            </Form.Control>
                        </Form.Field>

                        {/* show image preview if selectedFile state is not null */}
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
                                // display preview from url using URL.createObjectURL()
                                src={ URL.createObjectURL( selectedFile )}
                            />
                        }

                        {/* form actions container */}
                        <div 
                            className='
                                form-actions-ctn
                                flex
                                gap-2
                                mt-4
                            '
                        >
                            {/* <PreviousButton> for previous step */}
                            <PreviousButton 
                                onClick={ handlePrev }
                            >
                                Previous
                            </PreviousButton>

                            {/* <NextButton> for next step */}
                            <NextButton
                                onClick={ handleNext }
                            >
                                Next
                            </NextButton>
                        </div>
                    </Step>

                    {/* password step */}
                    <Step
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        {/* PasswordField for password */}
                        <PasswordField
                            ref={passwordFieldRef}
                            label="Password"
                            name="password"
                            emptyValidationMessage="Please enter your password"
                            shortValidationMessage="The password can't be lower than 6 characters"
                            value={ password }
                            onChange={ (e) => setPassword( e.target.value ) }
                        />

                        {/* form actions container */}
                        <StepActions
                            className="mt-4"
                        >
                            {/* <PreviousButton> for previous step */}
                            <PreviousButton 
                                onClick={ handlePrev }
                            >
                                Previous
                            </PreviousButton>

                            {/* <FinishButton> for final form submission */}
                            <FinishButton>
                                Create Account
                            </FinishButton>
                        </StepActions>
                    </Step>
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