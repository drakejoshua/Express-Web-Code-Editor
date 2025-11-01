// import component dependencies
import { Slider } from 'radix-ui'
import React, { useState } from 'react'


// define RangeOption component
const RangeOption = React.forwardRef( ( {
    // extract key props and apply default values if needed
    className,
    label,
    defaultValue,
    onValueChange = function() {},
    unit,
    ...props
}, ref ) => {

    // state for the slider value
    const [ value, setValue ] = useState( defaultValue )

    // handle value change() - updates state and calls onValueChange callback
    // it is used by the Slider component to notify about value changes
    function handleValueChange( newValue ) {
        setValue( newValue[0] )
    }
    
    function handleValueCommit( newValue ) {
        onValueChange( newValue[0] )
    }

    return (
        <div 
            // apply custom and default styles
            className={`
                range-option
                flex
                flex-col
                gap-2
                ${ className || ""}
            `}
            ref={ref}
        >
            {/* Render the label if it exists */}
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
                {/* slider control root */}
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
                    onValueCommit={ handleValueCommit }
                    {...props}
                >
                    {/* slider track */}
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
                        {/* slider range */}
                        <Slider.Range 
                            className="
                                slider__range
                                absolute
                                bg-gray-300 dark:bg-gray-600
                                h-full
                            " 
                        />
                    </Slider.Track>
                    
                    {/* movable slider thumb */}
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

                {/* display the current value with unit if provided */}
                { unit && <span className="range-option__value">
                    { value }{ unit }
                </span>}
            </div>

        </div>
    )
})


// export the RangeOption component
// for use in other parts of the application
export default RangeOption