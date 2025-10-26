import { Switch } from 'radix-ui'
import React from 'react'

const SwitchOption = React.forwardRef( ({
    label,
    className,
    ...props
}, ref ) => {
  return (
    <div 
        className={`
            switch-option
            flex
            flex-col
            gap-2
            ${ className || "" }
        `}
        ref={ref}
    >
        { label && <span 
            className="
                switch-option
                font-medium
            "
        >
            { label }
        </span>}

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


export default SwitchOption