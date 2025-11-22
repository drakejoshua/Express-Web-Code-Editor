// Reset Password Route
// This route handles resetting the user's password.
// It serves as a callback route to redirect users from their email
// after they have clicked to reset their password.
// The actual reset token is sent to and handled on the backend, so 
// this page just simply informs
// the user that they will be redirected or display a loading/error indicator while
// processing the reset password token.



// import route dependencies
import { useState } from 'react'
import RouteContainer from '../components/RouteContainer'
import { 
    Form
} from 'radix-ui'
import {
    FaTriangleExclamation 
} from 'react-icons/fa6'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { Helmet } from 'react-helmet-async'
import PasswordField from '../components/PasswordField'
import RouteThemeToggle from '../components/RouteThemeToggle'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthProvider } from '../providers/AuthProvider'
import { useToastProvider } from '../providers/ToastProvider'


// reset password component
export default function ResetPassword() {
    const [ isChangingPassword, setIsChangingPassword ] = useState( false )
    const { token } = useParams()

    // state for new password and confirm password fields
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { changePasswordUsingResetToken } = useAuthProvider()

    const { showToast } = useToastProvider()

    const navigateTo = useNavigate()

    async function handleResetPassword( e ) {
        e.preventDefault()

        setIsChangingPassword( true )

        if ( token && ( newPassword === confirmPassword ) ) {
            const { status, error } = await changePasswordUsingResetToken( token, newPassword )

            if ( status === 'success' ) {
                showToast({
                    type: "success",
                    message: "Account Password successfully reset, you will be redirected to the dashboard"
                })

                setTimeout( function() {
                    navigateTo("/dashboard")
                }, 1000)
            } else {
                showToast({
                    type: "error",
                    message: error.message
                })
            }
        } else {
            showToast({
                type: "error",
                message: "There was an error resetting your password due to token unavailablity"
            })
        }

        setIsChangingPassword( false )
    }

    return (
        <>
            {/* add page title and meta info using react-helmet library */}
            <Helmet>
                <title>Reset Password - CodeBloks</title>
                <meta name="description" content="Reset your account password" />
            </Helmet>

            {/* root container */}
            <div
                className='
                    reset-password 
                    h-screen 
                    w-full
                    bg-neutral-100 dark:bg-gray-900 
                    dark:text-white 
                    overflow-auto
                '
            >
                {/* route container for maintaining a standard, centered layout */}
                <RouteContainer>
                    {/* brand logo */}
                    <Logo/>

                    {/* page heading */}
                    <h1 
                        className='
                            reset-password--heading
                            text-2xl 
                            font-medium
                            text-center
                            mt-4.5
                        '
                    >
                        Reset Your Password
                    </h1>

                    {/* page description */}
                    <p 
                        className='
                            reset-password--text
                            text-center 
                            mt-2.5
                            w-4/5
                        '
                    >
                        Fill the form below to reset your account password. 
                        Make sure to choose a strong password that you haven't used before.
                    </p>

                    {/* reset password form */}
                    <Form.Root 
                        className='
                            reset-password--form
                            mt-8 
                            w-full
                            flex
                            flex-col
                            gap-2
                        '
                        onSubmit={ handleResetPassword }
                    >
                        {/* new password input */}
                        <PasswordField
                            label="New Password"
                            name="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            emptyValidationMessage="Please enter your new password"
                            shortValidationMessage="The password can't be lower than 6 characters"
                        />

                        {/* confirm new password input with custom validation passed as children */}
                        <PasswordField
                            label="Confirm New Password"
                            value={confirmPassword}
                            name="confirm-password"
                            emptyValidationMessage="Please confirm your new password"
                            shortValidationMessage="The password can't be lower than 6 characters"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                            {/* validation - password mismatch */}
                            <Form.Message
                                className='
                                    reset-password--form__confirm-password-field--message
                                    flex
                                    gap-2
                                    items-center
                                '
                                match={ ( value ) => value !== newPassword }
                            >
                                <FaTriangleExclamation/>
                                
                                <span>
                                    Your passwords don't match each other
                                </span>
                            </Form.Message>
                        </PasswordField>

                        {/* form submit button */}
                        <Button 
                            type='submit'
                            className="
                                reset-password--form__submit-btn
                                mt-4.5
                            "
                        >
                            { isChangingPassword ? "Resetting Password..." : "Reset Password" }
                        </Button>
                    </Form.Root>

                    {/* theme toggle button for switching between light and dark mode */}
                    <RouteThemeToggle/>
                </RouteContainer>
            </div>
        </>
    )
}
