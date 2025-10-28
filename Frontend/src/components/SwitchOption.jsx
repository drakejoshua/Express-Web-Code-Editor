// SwitchOption.jsx
// A customizable switch component using Radix UI's Switch primitive.
// It supports rendering a switch with a label and className for custom styling



// import component dependencies
import { Switch } from 'radix-ui'
import React from 'react'


// define SwitchOption component
const SwitchOption = React.forwardRef( ({
    // extract key props to be used in the component
    label,
    className,
    ...props
}, ref ) => {
  return (
    <div 
        // apply default and custom values
        className={`
            switch-option
            flex
            flex-col
            gap-2
            ${ className || "" }
        `}
        ref={ref}
    >
        {/* render label if it's provided */}
        { label && <span 
            className="
                switch-option
                font-medium
            "
        >
            { label }
        </span>}

        {/* switch root */}
        <Switch.Root 
            className='
                w-12
                h-7
                p-1
                bg-gray-300
                rounded-full
                flex
                items-center
                data-[state=checked]:justify-end
                data-[state=checked]:bg-blue-200
            '
            {...props}
        >
            {/* switch thumb */}
            <Switch.Thumb 
                className="
                    switch__thumb
                    block
                    w-5
                    h-full
                    bg-blue-700
                    rounded-full
                " 
            />
        </Switch.Root>
    </div>
  )
})


// export SwitchOption component for use
// in other parts of the application
export default SwitchOption