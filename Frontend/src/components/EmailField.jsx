import { Form } from 'radix-ui'
import React from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'

const EmailField = React.forwardRef(({
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
    <Form.Field 
        name={name}
        ref={ref}
        className={`
            signin--form__email-field
            flex 
            flex-col
            gap-2
            ${className}
        `}
    >
        <Form.Label 
            className='
                signin--form__email-field--label
                font-medium
            '
        >
            {label}
        </Form.Label>

        <Form.Control asChild>
            <input 
                type="email" 
                className='
                    signin--form__email-field--input
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

        { emptyValidationMessage && <Form.Message 
            className='
                signin--form__email-field--message
                flex
                gap-2
                items-center
            ' 
            match="typeMismatch"
        >
            <FaTriangleExclamation className='signin--form__email-field--icon' />
            {emptyValidationMessage}
        </Form.Message>}

        { invalidValidationMessage && <Form.Message 
            className='
                signin--form__email-field--message
                flex
                gap-2
                items-center
            ' 
            match="typeMismatch"
        >
            <FaTriangleExclamation className='signin--form__email-field--icon' />
            {invalidValidationMessage}
        </Form.Message>}

        { children }
    </Form.Field>
  )
})


export default EmailField
