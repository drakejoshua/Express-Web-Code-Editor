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
    FaEyeSlash, 
    FaMoon, 
    FaRegEye, 
    FaRegEyeSlash, 
    FaRegSun, 
    FaTriangleExclamation 
} from 'react-icons/fa6'
import { useThemeProvider } from '../providers/ThemeProvider'
import Logo from '../components/Logo'
import Button from '../components/Button'
import PasswordInput from '../components/PasswordInput'
import { Helmet } from 'react-helmet-async'

export default function ResetPassword() {
    const { theme, toggleTheme } = useThemeProvider();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <>
            <Helmet>
                <title>Reset Password - CodeBloks</title>
                <meta name="description" content="Reset your account password" />
            </Helmet>

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
                <RouteContainer>
                    <Logo/>

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

                    <Form.Root 
                        className='
                            reset-password--form
                            mt-8 
                            w-full
                            flex
                            flex-col
                            gap-2
                        '
                    >
                        {/* new password */}
                        <Form.Field
                            className='
                                reset-password--form__password-field
                                flex 
                                flex-col
                                gap-2
                            '
                        >
                            <Form.Label 
                                className='
                                    reset-password--form__password-field--label
                                    font-medium
                                '
                            >
                                New Password
                            </Form.Label>

                            <Form.Control asChild>
                                <PasswordInput
                                    value={ newPassword }
                                    onChange={ ( e ) => setNewPassword( e.target.value ) }
                                    required
                                    minLength={6}
                                />
                            </Form.Control>
                            

                            {/* validation - no value */}
                            <Form.Message
                                className='
                                    reset-password--form__password-field--message
                                    flex
                                    gap-2
                                    items-center
                                '
                                match="valueMissing"
                            >
                                <FaTriangleExclamation/>
                                
                                <span>
                                    Please enter your new password
                                </span>
                            </Form.Message>

                            {/* validation - too short */}
                            <Form.Message
                                className='
                                    reset-password--form__password-field--message
                                    flex
                                    gap-2
                                    items-center
                                '
                                match="tooShort"
                            >
                                <FaTriangleExclamation/>
                                
                                <span>
                                    The password can't be lower than 6 characters
                                </span>
                            </Form.Message>
                        </Form.Field>
                        
                        
                        {/* confirm new password */}
                        <Form.Field
                            className='
                                reset-password--form__confirm-password-field
                                flex 
                                flex-col
                                gap-2
                            '
                        >
                            <Form.Label 
                                className='
                                    reset-password--form__confirm-password-field--label
                                    font-medium
                                '
                            >
                                Confirm New Password
                            </Form.Label>

                            <Form.Control asChild>
                                <PasswordInput
                                    value={ confirmPassword }
                                    onChange={ ( e ) => setConfirmPassword( e.target.value ) }
                                    required
                                    minLength={6}
                                />
                            </Form.Control>
                            

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
                        </Form.Field>

                        {/* submit button */}
                        <Button 
                            type='submit'
                            className="
                                reset-password--form__submit-btn
                                mt-4.5
                            "
                        >
                            Reset Password
                        </Button>
                    </Form.Root>

                    {/* theme toggle */}
                    <button 
                        className='
                            reset-password--theme-toggle
                            fixed
                            top-4
                            right-4
                            flex
                            gap-2
                            items-center
                            bg-gray-300 dark:bg-gray-700
                            p-3 px-4.5
                            rounded-lg
                        '
                        onClick={ () => toggleTheme() }
                    >
                        { theme == 'dark' && <FaRegSun 
                            className="
                                reset-password--theme-toggle__icon
                            "
                        /> }
                        
                        { theme == 'light' && <FaMoon 
                            className="
                                reset-password--theme-toggle__icon
                            "
                        /> }

                        <span 
                            className="
                                reset-password--theme-toggle__text
                            ">
                            Toggle Theme
                        </span>
                    </button>
                </RouteContainer>
            </div>
        </>
    )
}
