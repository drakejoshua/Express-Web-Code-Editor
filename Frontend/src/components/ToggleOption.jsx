import { ToggleGroup } from 'radix-ui'
import React from 'react'

const ToggleOption = React.forwardRef(({
    className,
    label,
    options,
    ...props
}, ref) => {
    return (
        <div 
            className={`
                toggle-option
                flex
                flex-col
                gap-2
                ${ className || "" }
            `}
            ref={ref}
        >
            <span 
                className="
                    toggle-option__label
                    font-medium
                "
            >
                { label }
            </span>

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
                    *:bg-gray-600 dark:*:bg-gray-300
                    *:data-[state=on]:bg-blue-800 *:data-[state=on]:text-white
                    *:text-gray-200 *:dark:text-black
                '
                {...props}
            >
                {
                    options.map( ( option ) => (
                        <ToggleGroup.Item value={ option.value }>
                            { option.content }
                        </ToggleGroup.Item>
                    ))
                }
            </ToggleGroup.Root>
        </div>
    )
})


export default ToggleOption