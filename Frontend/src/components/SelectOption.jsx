// SelectOption.jsx
// A customizable select dropdown component using Radix UI's Select primitive.
// It supports both grouped and ungrouped options, with a label and placeholder.
// The options prop can be an array of options for ungrouped selects
// or an object with group labels as keys and arrays of options as values for grouped selects.


// import component dependencies
import { Select } from 'radix-ui'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa6'


// define SelectOption component
const SelectOption = React.forwardRef(({ 
    // extract key props and apply default values if needed
    className, 
    label,
    options = [],
    type,
    placeholder,
    ...props
}, ref) => {
    return (
        <div 
            // apply custom and default styles
            className={`
                select-option
                flex
                flex-col
                gap-2
                ${className || ""}
            `}
            ref={ref}
        >
            {/* Render the label if it exists */}
            { label && <span 
                className="
                    select-option__label
                    font-medium
                "
            >
                { label }
            </span>}

            {/* select control root */}
            <Select.Root 
                className="
                    select-option__select
                "
                { ...props }
            >
                {/* visible select trigger */}
                <Select.Trigger 
                    className="
                        select__trigger
                        bg-gray-400 dark:bg-gray-300
                        inline-flex
                        justify-between
                        items-center
                        gap-2
                        p-2 px-4
                        rounded-md
                        outline-none

                        *:text-white dark:*:text-black
                        *:font-medium
                    "
                >
                    {/* visible select value */}
                    <Select.Value placeholder={ placeholder || "Select a value" } />

                    {/* select icon - dropdown indicator */}
                    <Select.Icon 
                        className="
                            select__icon
                        "
                    >
                        <FaChevronDown />
                    </Select.Icon>
                </Select.Trigger>

                {/* 
                    select dropdown portal for rendering the 
                    dropdown content outside the root element 
                */}
                <Select.Portal>
                    {/* Render the dropdown content */}
                    <Select.Content
                        className='
                            bg-gray-400 dark:bg-gray-300
                            rounded-md
                            overflow-hidden
                        '
                    >
                        {/* Render the dropdown items using the select viewport */}
                        <Select.Viewport
                            className='
                                p-4

                                [&_.select\_\_group-label]:font-medium
                                [&_.select\_\_group-label]:mb-2
                                [&_.select\_\_group-label]:text-sm
                                [&_.select\_\_group-label]:uppercase
                                [&_.select\_\_group-label]:text-white dark:[&_.select\_\_group-label]:text-black
                                
                                [&_.select\_\_item]:p-1.5
                                [&_.select\_\_item]:px-3
                                [&_.select\_\_item]:rounded-sm
                                [&_.select\_\_item]:data-[state=checked]:bg-gray-600 dark:[&_.select\_\_item]:data-[state=checked]:bg-gray-800
                                [&_.select\_\_item]:data-[state=checked]:text-white
                                [&_.select\_\_item]:text-white dark:[&_.select\_\_item]:text-black
                            '
                        >
                            {/* 
                                check type prop value to decide whether 
                                to render grouped or ungrouped options 
                            */}
                            {
                                type == "grouped" && Object.entries(options).map( 
                                    ( [ groupLabel, groupOptions ], index ) => (
                                    <Select.Group key={ index }>
                                        <Select.Label
                                            className='
                                                select__group-label
                                            '
                                        >
                                            { groupLabel }
                                        </Select.Label>

                                        {
                                            groupOptions.map( ( option, index ) => (
                                                <Select.Item 
                                                    value={ option.value } 
                                                    className="select__item"
                                                    key={index}
                                                >
                                                    <Select.ItemText>
                                                        { option.name }
                                                    </Select.ItemText>
                                                </Select.Item>
                                            ) )
                                        }
                                    </Select.Group>
                                ))
                            }
                            
                            {
                                type == "ungrouped" && options.map( ( option, index ) => (
                                    <Select.Item 
                                        value={ option.value } 
                                        className="select__item"
                                        key={index}
                                    >
                                        <Select.ItemText>
                                            { option.name }
                                        </Select.ItemText>
                                    </Select.Item>
                                ))
                            }
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
})


// export SelectOption component
// for use in other parts of the application
export default SelectOption
