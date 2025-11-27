// ToggleOption.jsx
// A customizable toggle group component using Radix UI's ToggleGroup primitive.
// It supports rendering toggle options from an array, with a label and placeholder.
// The options prop can be an array of toggle options with each object in the array 
// having a value and content



// import component dependencies
import { ToggleGroup } from 'radix-ui'
import React from 'react'


// define ToggleOption component
const ToggleOption = React.forwardRef(({
    // extract key props
    className,
    label,
    options,
    ...props
}, ref) => {
    return (
        <div 
            // apply custom and default styles if needed
            className={`
                toggle-option
                flex
                flex-col
                gap-2
                ${ className || "" }
            `}
            ref={ref}
        >
            { label && <span 
                className="
                    toggle-option__label
                    font-medium
                "
            >
                { label }
            </span>}

            {/* toggle group root */}
            <ToggleGroup.Root 
                type="single"
                className='
                    grid
                    grid-cols-3
                    rounded-lg
                    overflow-hidden

                    *:p-2
                    *:px-4
                    *:font-medium
                    *:bg-gray-400 dark:*:bg-gray-300
                    *:data-[state=on]:bg-blue-600 *:data-[state=on]:text-white
                    *:text-white *:dark:text-black
                '
                {...props}
            >
                {/* 
                    render the toggle options for the array passed through
                    the options prop 
                */}
                {
                    options.map( ( option, index ) => (
                        <ToggleGroup.Item value={ option.value } key={index}>
                            { option.content }
                        </ToggleGroup.Item>
                    ))
                }
            </ToggleGroup.Root>
        </div>
    )
})


// export ToggleOption component for use
// in other parts of the application
export default ToggleOption