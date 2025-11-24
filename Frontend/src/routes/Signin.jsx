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
import { Link, useNavigate } from 'react-router-dom'
import GoogleBtn from '../components/GoogleBtn'
import MagiclinkBtn from '../components/MagiclinkBtn'
import { useState } from 'react'
import { useAuthProvider } from '../providers/AuthProvider'
import { useToastProvider } from '../providers/ToastProvider'
import { DialogComponent } from '../providers/DialogProvider'
import { BACKEND_ERROR_CODES } from '../utils/error_util'


// define signin route component
export default function Signin() {
    // state for managing email and password inputs
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    // state for managing magic link email input
    const [ magicLinkEmail, setMagicLinkEmail ] = useState("")

    // state for managing password reset email input
    const [ passwordResetEmail, setPasswordResetEmail ] = useState("")
    
    // states for managing dialog visibility and loading states
    const [ isPasswordResetDialogVisible, setIsPasswordResetDialogVisible ] = useState( false )
    const [ isEmailSignInDialogVisible, setIsEmailSignInDialogVisible ] = useState( false )
    const [ isEmailNotVerifiedDialogVisible, setIsEmailNotVerifiedDialogVisible ] = useState( false )
    const [ isSigningIn, setIsSigningIn ] = useState( false )
    const [ isResendingEmail, setIsResendingEmail ] = useState( false )
    const [ isSendingMagiclink, setIsSendingMagiclink ] = useState( false )
    const [ isSendingPasswordReset, setIsSendingPasswordReset ] = useState( false )

    // get auth provider functions for signin, email verification and other signin methods
    const { 
        signInUser, 
        resendEmailVerification, 
        signInWithMagicLink,
        signInWithGoogle,
        resetPassword
    } = useAuthProvider()

    // get navigate function for programmatic navigation from react-router
    const navigateTo = useNavigate()

    // get toast provider function for displaying toast notifications
    const { showToast } = useToastProvider()
    

    // handleResendEmail() - resend email verification to user who hasn't verified their email
    async function handleResendEmail() {
        // set Resending state to true
        setIsResendingEmail( true )

        // call resendEmailVerification from auth provider
        const { status, data, error } = await resendEmailVerification( email )

        
        if ( status === "success" ) {
            // show success toast notification if email resent successfully
            showToast({
                type: "success",
                message: data.message || "Email Verification Resent Successfully"
            })
        } else {
            // show error toast notification if email resend failed
            showToast({
                type: "error",
                message: error.message
            })
        }

        // close email not verified dialog and reset resending state
        setIsEmailNotVerifiedDialogVisible( false )
        setIsResendingEmail( false )
    }

    // handleSubmit() - handle signin form submission and user authentication
    async function handleSubmit( e ) {
        // prevent default form submission behavior
        e.preventDefault()

        // set signing in state to true
        setIsSigningIn( true )
        
        // call signInUser from auth provider with email and password
        const { status, error } = await signInUser( {
            email,
            password
        } )

        if ( status === 'success' ) {
            // redirect user to dashboard upon successful signin
            navigateTo( '/dashboard' )
        } else {
            // if signin failed, check if email not verified error
            if ( error.code === BACKEND_ERROR_CODES.EMAIL_NOT_VERIFIED ) {
                // if email not verified, show email not verified dialog
                setIsEmailNotVerifiedDialogVisible( true )
            } else {
                // use a toast to display error message to user upon failed signin
                showToast({
                    message: error.message,
                    type: "error"
                })
            }
        }

        // reset signing in state
        setIsSigningIn( false )
    }

    // handleSendMagiclink() - handle sending magic link for email signin 
    async function handleSendMagiclink( e ) {
        // prevent default form submission behavior
        e.preventDefault()

        // set sending magic link state to true
        setIsSendingMagiclink( true )

        // call signInWithMagicLink from auth provider with magicLinkEmail
        const { status, error } = await signInWithMagicLink( magicLinkEmail )

        if ( status === "success" ) {
            // show success toast notification if magic link sent successfully
            showToast({
                type: "success",
                message: "Magic Link Sent Successfully. Please check your email."
            })
        } else {
            // show error toast notification if sending magic link failed
            showToast({
                type: "error",
                message: error.message
            })
        }

        // close email signin dialog and reset sending magic link state
        setIsEmailSignInDialogVisible( false )
        setIsSendingMagiclink( false )
    }

    // handlePasswordReset() - handle sending password reset link to user email
    async function handlePasswordReset( e ) {
        // prevent default form submission behavior
        e.preventDefault()

        // set sending password reset state to true
        setIsSendingPasswordReset( true )

        // call resetPassword from auth provider with passwordResetEmail
        const { status, error } = await resetPassword( passwordResetEmail )

        if ( status === "success" ) {
            // show success toast notification if password reset link sent successfully
            showToast({
                type: "success",
                message: "A password reset link has just been sent to your email. it will expire in 5 mins"
            })
        } else {
            // show error toast notification if sending password reset link failed
            showToast({
                type: "error",
                message: error.message
            })
        }

        // close password reset dialog and reset sending password reset state
        setIsPasswordResetDialogVisible( false )
        setIsSendingPasswordReset( false )
    }

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
                    onSubmit={ handleSubmit }
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
                        value={ email }
                        onChange={ ( e ) => setEmail( e.target.value ) }
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
                        value={ password }
                        onChange={ ( e ) => setPassword( e.target.value ) }
                    />

                    {/* forgot password link to trigger password reset dialog */}
                    <button 
                        onClick={ () => setIsPasswordResetDialogVisible( true ) } 
                        className='
                            signin--form__forgot-password
                            mt-4
                            font-medium
                            text-blue-900 dark:text-blue-100
                            hover:underline
                            block
                            w-full
                            text-right
                        '
                        type='button'
                    >
                        Forgot password?
                    </button>

                    {/* Form submit/signin button */}
                    <Button 
                        type="submit"
                        className='
                            w-full
                            mt-6
                        '
                    >
                        { isSigningIn ? "Signing in..." : "Sign in" }
                    </Button>

                    {/* sign in with google */}
                    <GoogleBtn
                        className='
                            mt-8
                        '
                        type="button"
                        text="Sign in with Google"
                        onClick={ () => signInWithGoogle() }
                    />

                    {/* sign in with email */}
                    <MagiclinkBtn
                        className='
                            mt-3
                        '
                        type="button"
                        onClick={ () => setIsEmailSignInDialogVisible( true ) }
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

            {/* Email Not Verified Dialog */}
            <DialogComponent 
                open={ isEmailNotVerifiedDialogVisible }
                onOpenChange={ setIsEmailNotVerifiedDialogVisible }
                title="Your Email Has Not Been Verified"
                description={`
                    The email address ${ email } has not been verified yet.
                    Please verify your email to proceed.
                `}
                content={(
                    <div 
                        className="
                            email-verify-dialog
                            mt-6
                        "
                    >
                        <Button
                            className="w-full"
                            onClick={ handleResendEmail }
                        >
                            { isResendingEmail ? "Sending..." : "Send Email Verification" }
                        </Button>
                    </div>
                )}
            />

            {/* Sign in With Email Dialog */}
            <DialogComponent 
                open={ isEmailSignInDialogVisible }
                onOpenChange={ setIsEmailSignInDialogVisible }
                title="Sign in with Email"
                description={`
                    Enter your email address to receive a magic link
                    for signing in to your account.
                `}
                content={(
                    <Form.Root
                        className="
                            email-signin-dialog
                            mt-2
                        "
                        onSubmit={ handleSendMagiclink }
                    >
                        <EmailField
                            label="Email"
                            name="email"
                            value={ magicLinkEmail }
                            onChange={ ( e ) => setMagicLinkEmail( e.target.value ) }
                        />

                        <Button
                            className="w-full mt-4"
                            onClick={ handleSendMagiclink }
                        >
                            { isSendingMagiclink ? "Sending..." : "Send Magic Link" }
                        </Button>
                    </Form.Root>
                )}
            />
            
            {/* Password Reset Dialog */}
            <DialogComponent 
                open={ isPasswordResetDialogVisible }
                onOpenChange={ setIsPasswordResetDialogVisible }
                title="Reset Your Password"
                description={`
                    Enter your email address to receive a password reset link
                    to change your account password.
                `}
                content={(
                    <Form.Root
                        className="
                            password-reset-dialog
                            mt-2
                        "
                        onSubmit={ handleSendMagiclink }
                    >
                        <EmailField
                            label="Email"
                            name="email"
                            value={ passwordResetEmail }
                            onChange={ ( e ) => setPasswordResetEmail( e.target.value ) }
                        />

                        <Button
                            className="w-full mt-4"
                            onClick={ handlePasswordReset }
                        >
                            { isSendingPasswordReset ? "Sending..." : "Send Password Reset" }
                        </Button>
                    </Form.Root>
                )}
            />
        </>
    )
}