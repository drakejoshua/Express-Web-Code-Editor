// DropdownContent.jsx
// This component acts as a wrapper for the dropdown content of radix-ui
// it accepts a label and options props for providing the content of the 
// dropdown content to be rendered.



// import route dependencies
import { DropdownMenu } from 'radix-ui'


// define and export DropdownContent component
export default function DropdownContent({ label, className, options = [] }) {
    return (
        <DropdownMenu.Content 
            className={`
                dropdown-content
                p-4 px-3.5
                rounded-md
                bg-gray-600
                flex
                flex-col
                w-48
                ${ className || '' }
            `}
            align="end"
            sideOffset={8}
        >
            {/* dropdown label if it exists */}
            { label && <DropdownMenu.Label 
                className='
                    dropdown-content__label
                    uppercase
                    text-xs
                    font-medium
                    text-white
                    mb-2
                '
            >
                { label }
            </DropdownMenu.Label>}

            {/* options list */}
            <div 
                className="
                    dropdown-content__list
                    *:flex
                    *:items-center
                    *:gap-3
                    *:text-white
                    *:capitalize
                    *:hover:bg-gray-800
                    *:p-2 *:px-3
                    *:outline-none
                    *:rounded-sm
                "
            >
                {/* rename blok option */}
                {
                    options.map( ( option, index ) => (
                        <DropdownMenu.Item
                            key={index}
                            onClick={ () => option.action() }
                        >
                            { option.content }
                        </DropdownMenu.Item>
                    ))
                }
            </div>

        </DropdownMenu.Content>
    )
}
