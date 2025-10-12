import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const PasswordInput = React.forwardRef( function({ value, onChange, className, ...props}, ref ) {
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);

    return (
        <div 
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
            <input
                className='
                    password-input
                    flex-grow
                    outline-none
                    bg-transparent
                '
                ref={ref}
                type={ isPasswordVisible ? 'text' : 'password' }
                minLength={6}
                required
                value={ value }
                onChange={ onChange }
                { ...props }
            />

            <button
                className='
                    password-toggle
                '
                onClick={() => setIsPasswordVisible( !isPasswordVisible )}
                type="button"
            >
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

export default PasswordInput
