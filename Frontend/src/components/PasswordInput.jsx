import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const PasswordInput = React.forwardRef( function({ value, onChange, className, ...props}, ref ) {
    const [ visibility, setVisibility ] = useState(false);

    return (
        <div 
            className={`
                reset-password--form__password-field--input-ctn
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
            ` + className }
        >
            <input
                className='
                    reset-password--form__password-field--input
                    flex-grow
                    outline-none
                    bg-transparent
                '
                ref={ref}
                type={ visibility == 'hidden' ? 'password' : 'text' }
                minLength={6}
                required
                value={ value }
                onChange={ onChange }
                { ...props }
            />

            <button
                className='
                    reset-password--form__password-field--toggle
                '
                onClick={() => setVisibility( visibility == "hidden" ? "visible" : "hidden" )}
                type="button"
            >
                {
                    {
                        visible: <FaRegEye
                            className='
                                reset-password--form__password-field--toggle-icon
                                text-xl
                            '
                        />,
                    
                        hidden: <FaRegEyeSlash
                            className='
                                reset-password--form__password-field--toggle-icon
                                text-xl
                            '
                        />
                    }[ visibility ? "visible" : "hidden" ]
                }
            </button>
        </div>
    )
})

export default PasswordInput
