// NavMenuBlok component 
// This component represents a  blok in the navigation menu
// It displays the blok name and provides a dropdown menu with options
// to rename or delete the blok.
// It uses Radix UI's DropdownMenu for the dropdown functionality.


// import component dependencies
import { DropdownMenu } from 'radix-ui'
import { FaEllipsisVertical, FaPencil, FaTrash } from 'react-icons/fa6'
import DropdownContent from './DropdownContent'


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
                    <DropdownContent
                        label="More options"
                        options={[
                            {
                                action: function(){},
                                content: <>
                                    <FaTrash className='dashboard--blok-list__blok-option-icon' />

                                    <span className="dashboard--blok-list__blok-option-text">
                                        delete blok
                                    </span>
                                </>
                            },
                            {
                                action: function(){},
                                content: <>
                                    <FaPencil className='dashboard--blok-list__blok-option-icon' />

                                    <span className="dashboard--blok-list__blok-option-text">
                                        rename blok
                                    </span>
                                </>
                            },
                        ]}
                    />
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    )
}
