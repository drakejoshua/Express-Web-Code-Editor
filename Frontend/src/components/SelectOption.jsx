import { Select } from 'radix-ui'
import React from 'react'
import { FaCaretDown, FaChevronDown } from 'react-icons/fa6'

const SelectOption = React.forwardRef(({ 
    className, 
    label,
    options = [],
    type,
    placeholder,
    ...props
}, ref) => {
  return (
    <div 
        className={`
            select-option
            flex
            flex-col
            gap-2
            ${className || ""}
        `}
    >
        { label && <span 
            className="
                select-option__label
                font-medium
            "
        >
            { label }
        </span>}

        <Select.Root 
            className="
                select-option__select
            "
            { ...props }
        >
            <Select.Trigger 
                className="
                    select__trigger
                    bg-gray-600 dark:bg-gray-300
                    inline-flex
                    justify-center
                    items-center
                    gap-2
                    p-2 px-4
                    rounded-md
                    outline-none

                    *:text-white dark:*:text-black
                    *:font-medium
                "
            >
                <Select.Value placeholder={ placeholder || "Select a value" } />
                <Select.Icon 
                    className="
                        select__icon
                    "
                >
                    <FaChevronDown />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className='
                        bg-gray-600 dark:bg-gray-300
                        rounded-md
                        overflow-hidden
                    '
                >

                    <Select.Viewport
                        className='
                            p-4

                            [&_.select\_\_group-label]:font-medium
                            [&_.select\_\_group-label]:mb-2
                            [&_.select\_\_group-label]:text-sm
                            [&_.select\_\_group-label]:uppercase
                            
                            [&_.select\_\_item]:p-1.5
                            [&_.select\_\_item]:px-3
                            [&_.select\_\_item]:rounded-sm
                            [&_.select\_\_item]:data-[state=checked]:bg-gray-800
                            [&_.select\_\_item]:data-[state=checked]:text-white
                        '
                    >
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
                                                    { option.text }
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
                                        { option.text }
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

export default SelectOption
