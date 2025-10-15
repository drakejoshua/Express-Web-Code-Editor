// import component dependencies
import { Form } from 'radix-ui'
import React from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'


// define EmailField component
const EmailField = React.forwardRef(({
    // extract key props and provide default values
    className,
    label,
    name,
    value,
    onChange,
    emptyValidationMessage = "Please enter your email",
    invalidValidationMessage = "Please enter a valid email",
    children
}, ref) => {
  return (
    // form field wrapper
    <Form.Field 
        name={name}
        ref={ref}
        className={`
            email-field
            flex 
            flex-col
            gap-2
            ${className}
        `}
    >
        {/* form field label */}
        <Form.Label 
            className='
                email-field__label
                font-medium
            '
        >
            {label}
        </Form.Label>

        {/* form field input */}
        <Form.Control asChild>
            <input 
                type="email" 
                className='
                    email-field__input
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
                email-field__message
                flex
                gap-2
                items-center
            ' 
            match="typeMismatch"
        >
            <FaTriangleExclamation className='email-field__icon' />
            {emptyValidationMessage}
        </Form.Message>}

        {/* validation - invalid email */}
        { invalidValidationMessage && <Form.Message 
            className='
                email-field__message
                flex
                gap-2
                items-center
            ' 
            match="typeMismatch"
        >
            <FaTriangleExclamation className='email-field__icon' />
            {invalidValidationMessage}
        </Form.Message>}

        {/* other content or validation messages */}
        { children }
    </Form.Field>
  )
})


export default EmailField
