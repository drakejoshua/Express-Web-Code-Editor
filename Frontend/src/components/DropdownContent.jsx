import { DropdownMenu } from 'radix-ui'

export default function DropdownContent({ label, options = [] }) {
    return (
        <DropdownMenu.Content 
            className='
                dropdown-content
                p-4 px-3.5
                rounded-md
                bg-gray-600
                flex
                flex-col
                w-48
            '
            align="end"
            sideOffset={8}
        >
            {/* dropdown label */}
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
