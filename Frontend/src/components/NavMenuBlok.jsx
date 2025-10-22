import { DropdownMenu } from 'radix-ui'
import { FaEllipsisVertical, FaPencil, FaTrash } from 'react-icons/fa6'

export default function NavMenuBlok({ id, name }) {
  return (
    <div 
        className="
            dashboard--header__menu-blok
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
        <span 
            className="
                dashboard--header__blok-name
                font-medium
                dark:text-white
            "
        >
            { name }
        </span>

        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button 
                    className="
                        dashboard--blok-list__blok-trigger
                        text-white
                        text-xl
                        bg-gray-600
                        p-1 py-1.5
                        rounded-md
                    "
                >
                    <FaEllipsisVertical className="dashboard--blok-list__blok-trigger-icon"/>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content 
                    className='
                        dashboard--blok-list__blok-options
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
                    <DropdownMenu.Label 
                        className='
                            dashboard--blok-list__blok-options-label
                            uppercase
                            text-xs
                            font-medium
                            text-white
                            mb-2
                        '
                    >
                        more options
                    </DropdownMenu.Label>

                    <DropdownMenu.Item
                        className='
                            dashboard--blok-list__blok-option
                            flex
                            items-center
                            gap-3
                            text-white
                            capitalize
                            hover:bg-gray-800
                            p-2 px-3
                            outline-none
                            rounded-sm
                        '
                    >
                        <FaPencil className='dashboard--blok-list__blok-option-icon' />

                        <span className="dashboard--blok-list__blok-option-text">
                            rename blok
                        </span>
                    </DropdownMenu.Item>
                    
                    <DropdownMenu.Item
                        className='
                            dashboard--blok-list__blok-option
                            flex
                            items-center
                            gap-3
                            text-white
                            capitalize
                            hover:bg-gray-800
                            p-2 px-3
                            outline-none
                            rounded-sm
                        '
                    >
                        <FaTrash className='dashboard--blok-list__blok-option-icon' />

                        <span className="dashboard--blok-list__blok-option-text">
                            delete blok
                        </span>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </div>
  )
}
