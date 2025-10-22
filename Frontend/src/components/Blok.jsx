import { DropdownMenu } from 'radix-ui'
import { FaEllipsisVertical, FaPencil, FaTrash } from 'react-icons/fa6'

export default function Blok({ id, name, iframeContent }) {
  return (
    <div 
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
        <iframe 
            srcDoc={ iframeContent }
            frameborder="0" 
            className="
                dashboard--blok-list__blok-preview
                w-full
                min-h-[180px] max-h-[250px]
                pointer-events-none
                select-none
            "
        ></iframe>

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
            <span 
                className="
                    dashboard--blok-list__blok-name
                    text-white
                    text-lg
                    font-medium
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
                            p-2
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
    </div>
  )
}
