import { createContext, useContext, useState } from 'react'
import { Dialog } from "radix-ui"
import { FaXmark } from 'react-icons/fa6'


const DialogContext = createContext()

export function useDialogProvider() {
    return useContext(DialogContext)
}


export default function DialogProvider({ children }) {
    const [ dialogs, setDialogs ] = useState([])
    // content, title, description

    function showDialog({ content, title, description }) {
        const id = Date.now()
        setDialogs([...dialogs, { id, content, title, description }])

        return id
    }

    function hideDialog(id) {
        setDialogs(dialogs.filter(dialog => dialog.id !== id))
    }

    return (
        <DialogContext.Provider value={{ showDialog, hideDialog }}>
            { children }

            {
                dialogs.map( function( dialog ) {
                    return (
                        <Dialog.Root 
                            key={dialog.id}
                            defaultOpen
                            onOpenChange={() => hideDialog( dialog.id )}
                        >
                            <Dialog.Portal>
                                <Dialog.Overlay 
                                    className='
                                        fixed
                                        inset-0
                                        bg-black/50
                                        backdrop-blur-sm
                                    '
                                />

                                <Dialog.Content
                                    className='
                                        fixed
                                        top-1/2
                                        left-1/2
                                        -translate-x-1/2
                                        -translate-y-1/2
                                        w-full
                                        min-w-[290px]
                                        max-w-[400px]
                                        bg-white dark:bg-gray-900
                                        p-8 
                                        rounded-md
                                        data-[state=open]:animate-[scaleIn_0.2s_ease-in-out]
                                    '
                                >
                                    <Dialog.Close
                                        className='
                                            absolute
                                            top-4
                                            right-4
                                            dark:text-white
                                        '
                                    >
                                        <FaXmark className='text-2xl'/>
                                    </Dialog.Close>

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-2
                                            items-center
                                            mt-4
                                        "
                                    >
                                        { dialog.title && <Dialog.Title
                                            className='
                                                text-2xl
                                                text-center
                                                dark:text-white
                                            '
                                        >
                                            {dialog.title}
                                        </Dialog.Title>}
                                        
                                        { dialog.description && <Dialog.Description
                                            className='
                                                text-center
                                                dark:text-white
                                            '
                                        >
                                            {dialog.description}
                                        </Dialog.Description>}
                                    </div>


                                    { dialog.content }
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    )
                })
            }
        </DialogContext.Provider>
    )
}

export function DialogComponent({ content, title, description, ...props }) {
    return (
        <Dialog.Root { ...props} >
            <Dialog.Portal>
                <Dialog.Overlay 
                    className='
                        fixed
                        inset-0
                        bg-black/50
                        backdrop-blur-sm
                    '
                />

                <Dialog.Content
                    className='
                        fixed
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        w-full
                        min-w-[290px]
                        max-w-[400px]
                        bg-white dark:bg-gray-900
                        p-8 
                        rounded-md
                        data-[state=open]:animate-[scaleIn_0.2s_ease-in-out]
                    '
                >
                    <Dialog.Close
                        className='
                            absolute
                            top-4
                            right-4
                            dark:text-white
                        '
                    >
                        <FaXmark className='text-2xl'/>
                    </Dialog.Close>

                    <div
                        className="
                            flex
                            flex-col
                            gap-2
                            items-center
                            mt-4
                        "
                    >
                        { title && <Dialog.Title
                            className='
                                text-2xl
                                text-center
                                dark:text-white
                            '
                        >
                            {title}
                        </Dialog.Title>}
                        
                        { description && <Dialog.Description
                            className='
                                text-center
                                dark:text-white
                            '
                        >
                            {description}
                        </Dialog.Description>}
                    </div>


                    { content }
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}