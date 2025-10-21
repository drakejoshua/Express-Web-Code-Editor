// TextField.jsx
// This component defines a text input field with
// built-in validation messages for empty inputs
// used in forms across the application.
// It leverages radix-ui for form validation handling.



// import component dependencies
import { Form } from 'radix-ui'
import React from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'


// define TextField component
const TextField = React.forwardRef(({
    // extract key props and provide default values
    className,
    label,
    name,
    value,
    onChange,
    emptyValidationMessage,
    children
}, ref) => {
  return (
    // form field wrapper
    <Form.Field 
        name={name}
        className={`
            text-field
            flex 
            flex-col
            gap-2
            ${className}
        `}
    >
        {/* form field label */}
        <Form.Label 
            className='
                text-field__label
                font-medium
            '
        >
            {label}
        </Form.Label>

        {/* form field input */}
        <Form.Control asChild>
            <input 
                type="text" 
                ref={ref}
                className='
                    text-field__input
                    border-2
                    border-gray-600 dark:border-gray-300
                    rounded-sm
                    py-2 px-3
                    bg-gray-600 dark:bg-gray-300
                    text-white dark:text-black
                    font-medium
                    outline-none
                ' 
                required
                value={ value }
                onChange={ onChange }
            />
        </Form.Control>

        {/* validation - no value */}
        { emptyValidationMessage && <Form.Message 
            className='
                text-field__message
                flex
                gap-2
                items-center
            ' 
            match="valueMissing"
        >
            <FaTriangleExclamation className='text-field__icon' />
            {emptyValidationMessage}
        </Form.Message>}

        {/* other content or validation messages */}
        { children }
    </Form.Field>
  )
})


// export TextField component for use in other parts
// of the application
export default TextField
