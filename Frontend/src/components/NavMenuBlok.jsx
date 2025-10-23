// NavMenuBlok component 
// This component represents a  blok in the navigation menu
// It displays the blok name and provides a dropdown menu with options
// to rename or delete the blok.
// It uses Radix UI's DropdownMenu for the dropdown functionality.


// import component dependencies
import { DropdownMenu } from 'radix-ui'
import { FaEllipsisVertical, FaPencil, FaTrash } from 'react-icons/fa6'


// define NavMenuBlok component
export default function NavMenuBlok({ id, name }) {
    return (
        <div 
            // apply default and custom classes
            className="
                nav-menu-blok
                flex
                justify-between
                items-center
                p-2.5 px-4
                hover:bg-gray-200 dark:hover:bg-gray-800
                rounded-lg
                overflow-hidden
                cursor-pointer
            "
        >
            {/* blok name */}
            <span 
                className="
                    nav-menu-blok__name
                    font-medium
                    dark:text-white
                "
            >
                { name }
            </span>

            {/* blok dropdown menu for more options */}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    {/* dropdown menu trigger for toggling more options dropdown */}
                    <button 
                        className="
                            nav-menu-blok__trigger
                            text-white
                            text-xl
                            bg-gray-600
                            p-1 py-1.5
                            rounded-md
                        "
                    >
                        <FaEllipsisVertical className="nav-menu-blok__trigger-icon"/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    {/* dropdown menu content */}
                    <DropdownMenu.Content 
                        className='
                            nav-menu-blok__options
                            p-4 px-3.5
                            rounded-md
                            bg-gray-600
                            flex
                            flex-col
                            w-48
                        '
                        align="end"
                        sideOffset  ={8}
                    >
                        {/* dropdown label */}
                        <DropdownMenu.Label 
                            className='
                                nav-menu-blok__options-label
                                uppercase
                                text-xs
                                font-medium
                                text-white
                                mb-2
                            '
                        >
                            more options
                        </DropdownMenu.Label>

                        {/* options list */}
                        <div 
                            className="
                                nav-menu-blok__options-ctn
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
                            <DropdownMenu.Item
                                className='
                                    nav-menu-blok__option
                                '
                            >
                                <FaPencil className='nav-menu-blok__option-icon' />

                                <span className="nav-menu-blok__option-text">
                                    rename blok
                                </span>
                            </DropdownMenu.Item>

                            {/* delete blok option */}
                            <DropdownMenu.Item
                                className='
                                    nav-menu-blok__option
                                '
                            >
                                <FaTrash className='nav-menu-blok__option-icon' />

                                <span className="nav-menu-blok__option-text">
                                    delete blok
                                </span>
                            </DropdownMenu.Item>
                        </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    )
}
