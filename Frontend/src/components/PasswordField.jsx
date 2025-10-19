import React, { Children } from 'react'
import { Form } from 'radix-ui'
import { FaTriangleExclamation } from 'react-icons/fa6'
import PasswordInput from './PasswordInput'

const PasswordField = React.forwardRef(({ 
    className, 
    label, 
    name,
    value, 
    onChange,
    emptyValidationMessage = "Please enter your password",
    shortValidationMessage = "The password can't be lower than 6 characters",
    children
 }, ref) => {
    return (
        <Form.Field
            className={`
                password-field
                flex 
                flex-col
                gap-2
                ${className}
            `}
            name={name}
        >
            <Form.Label 
                className='
                    password-field__label
                    font-medium
                '
            >
                {label}
            </Form.Label>

            <Form.Control asChild>
                <PasswordInput
                    ref={ref}
                    value={ value }
                    onChange={ onChange }
                    required
                    minLength={6}
                />
            </Form.Control>
            

            {/* validation - no value */}
            { emptyValidationMessage && <Form.Message
                className='
                    password-field__message
                    flex
                    gap-2
                    items-center
                '
                match="valueMissing"
            >
                <FaTriangleExclamation/>
                
                <span>
                    {emptyValidationMessage}
                </span>
            </Form.Message>}

            {/* validation - too short */}
            { shortValidationMessage && <Form.Message
                className='
                    password-field__message
                    flex
                    gap-2
                    items-center
                '
                match="tooShort"
            >
                <FaTriangleExclamation/>
                
                <span>
                    {shortValidationMessage}
                </span>
            </Form.Message>}

            {/* other content */}
            { children }
        </Form.Field>
    )
})


export default PasswordField
