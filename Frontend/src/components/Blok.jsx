// Blok.jsx
// This component represents a "blok" in the dashboard, displaying a preview of its content
// using an iframe and providing options to rename or delete the blok via a dropdown menu.
// It uses Radix UI's DropdownMenu for the dropdown functionality.



// import component dependencies
import { DropdownMenu } from 'radix-ui'
import { FaEllipsisVertical, FaPencil, FaTrash } from 'react-icons/fa6'
import DropdownContent from './DropdownContent'
import { useNavigate } from 'react-router-dom'


// define NavMenuBlok component
export default function Blok({ id, name, iframeContent }) {
    const navigateTo = useNavigate()

    return (
        <div 
            // apply default and custom classes
            className="
                dashboard--blok-list__blok
                rounded-md
                overflow-hidden
                w-full
                border-2
                border-gray-800
                bg-gray-800
                hover:border-blue-500
                transition-all
                duration-200
            "
        >
            {/* iframe preview for blok content */}
            <iframe 
                srcDoc={ iframeContent }
                frameborder="0" 
                className="
                    dashboard--blok-list__blok-preview
                    w-full
                    min-h-[200px] max-h-[250px]
                    pointer-events-none
                    select-none
                "
            ></iframe>

            {/* blok details and options */}
            <div 
                className="
                    dashboard--blok-list__blok-details
                    bg-transparent
                    flex
                    justify-between
                    items-center
                    p-4
                "
            >
                {/* blok name */}
                <span 
                    className="
                        dashboard--blok-list__blok-name
                        text-white
                        text-lg
                        font-medium
                        cursor-pointer
                    "
                    onClick={ () => navigateTo(`/editor/${id}`) }
                >
                    { name }
                </span>

                {/* blok dropdown menu for more options */}
                <DropdownMenu.Root>
                    {/* dropdown menu trigger */}
                    <DropdownMenu.Trigger asChild>
                        <button 
                            className="
                                dashboard--blok-list__blok-trigger
                                text-white
                                text-xl
                                bg-gray-600
                                p-2
                                rounded-md
                            "
                        >
                            <FaEllipsisVertical className="dashboard--blok-list__blok-trigger-icon"/>
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
        </div>
    )
}
