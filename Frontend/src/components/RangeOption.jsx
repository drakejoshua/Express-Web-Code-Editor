import { Slider } from 'radix-ui'
import React, { useState } from 'react'

const RangeOption = React.forwardRef( ( {
    className,
    label,
    defaultValue,
    onValueChange = function() {},
    unit,
    ...props
}, ref ) => {

    const [ value, setValue ] = useState( defaultValue )

    function handleValueChange( newValue ) {
        setValue( newValue )

        onValueChange()
    }

    return (
        <div 
            className={`
                range-option
                flex
                flex-col
                gap-2
                ${ className || ""}
            `}
            ref={ref}
        >
            { label && <span 
                className="
                    range-option__label
                    font-medium
                "
            >
                { label }
            </span>}

            <div 
                className="
                    range-option__control
                    flex
                    gap-4
                    items-center
                "
            >
                <Slider.Root
                    className='
                        relative
                        flex
                        items-center
                        select-none
                        touch-none
                        h-5
                        w-full
                    '
                    defaultValue={ [value] }
                    onValueChange={ handleValueChange }
                    {...props}
                >
                    <Slider.Track 
                        className="
                            slider__track
                            relative
                            bg-gray-300 dark:bg-gray-600
                            flex-1
                            rounded-full
                            h-1
                        "
                    >
                        <Slider.Range 
                            className="
                                slider__range
                                absolute
                                bg-gray-300 dark:bg-gray-600
                                h-full
                            " 
                        />
                    </Slider.Track>
                    
                    <Slider.Thumb 
                        className="
                            slider__thumb
                            block
                            w-5
                            h-5
                            rounded-full
                            bg-gray-800 dark:bg-gray-200
                        " 
                    />
                </Slider.Root>

                { unit && <span className="range-option__value">
                    { value }{ unit }
                </span>}
            </div>

        </div>
    )
})


export default RangeOption