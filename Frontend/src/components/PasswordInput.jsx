// import component dependencies
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'


// define PasswordInput component
const PasswordInput = React.forwardRef( function({ value, onChange, className, ...props}, ref ) {
    // state to track password input visibility
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);

    return (
        <div 
            // apply default and custom classes
            className={`
                password-input-ctn
                flex
                gap-2
                items-center
                border-2
                border-gray-600 dark:border-gray-300
                rounded-sm
                py-2 px-3
                bg-gray-600 dark:bg-gray-300
                text-white dark:text-black
                font-medium
                ${ className || '' }
            ` }
        >
            {/* password input toggling between visible and hidden */}
            {/* based on isPasswordVisible state */}
            <input
                className='
                    password-input
                    flex-grow
                    outline-none
                    bg-transparent
                '

                // forward ref to input element
                ref={ref}

                // toggle input type based on visibility state
                type={ isPasswordVisible ? 'text' : 'password' }
                minLength={6}
                required
                value={ value }
                onChange={ onChange }

                // spread any additional props to the input element
                { ...props }
            />

            {/* password visibility toggle button */}
            <button
                className='
                    password-toggle
                '
                // toggle password visibility using onClick handler
                onClick={() => setIsPasswordVisible( !isPasswordVisible )}
                type="button"
            >
                {/* conditionally render eye icon based on visibility state */}
                {
                    {
                        visible: <FaRegEye
                            className='
                                password-toggle-icon
                                text-xl
                            '
                        />,
                    
                        hidden: <FaRegEyeSlash
                            className='
                                password-toggle-icon
                                text-xl
                            '
                        />
                    }[ isPasswordVisible ? "visible" : "hidden" ]
                }
            </button>
        </div>
    )
})


// export PasswordInput component for use in other parts
// of the application
export default PasswordInput