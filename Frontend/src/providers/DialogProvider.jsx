// DialogProvider.jsx
// This provider manages dialog modals across the application.
// It allows components to show and hide dialogs with custom content,
// titles, and descriptions using a shared context.


// import provider dependencies
import { createContext, useContext, useState } from 'react'
import { Dialog } from "radix-ui"
import { FaXmark } from 'react-icons/fa6'

// create context for sharing dialog state and functions
// across the application
const DialogContext = createContext()

// custom hook to access dialog context from DialogProvider
export function useDialogProvider() {
    return useContext(DialogContext)
}


export default function DialogProvider({ children }) {
    // state to manage active dialogs
    const [ dialogs, setDialogs ] = useState([])
    // dialog - content, title, description

    // showDialog() - add a new dialog to the state
    function showDialog({ content, title, description }) {
        // generate unique id for the dialog
        const id = Date.now()

        // add new dialog to the list of active dialogs
        setDialogs([...dialogs, { id, content, title, description }])

        // return the unique id of the new dialog
        return id
    }

    // hideDialog() - remove a dialog from the state by its id
    function hideDialog(id) {
        // filter out the dialog with the given id
        setDialogs(dialogs.filter(dialog => dialog.id !== id))
    }

    // DialogProvider component to provide dialog state and functions
    // while rendering active dialogs and children components
    return (
        <DialogContext.Provider value={{ showDialog, hideDialog }}>
            { children }

            {
                // display active dialogs by mapping over the dialogs state
                // and rendering a Dialog.Root for each dialog object
                dialogs.map( function( dialog ) {
                    return (
                        <Dialog.Root 
                            key={dialog.id}
                            defaultOpen
                            onOpenChange={() => hideDialog( dialog.id )}
                        >
                            <Dialog.Portal>
                                {/* Dialog overlay to darken the background */}
                                <Dialog.Overlay 
                                    className='
                                        fixed
                                        inset-0
                                        bg-black/50
                                        backdrop-blur-sm
                                    '
                                />

                                {/* Dialog content container */}
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
                                    {/* Dialog close button */}
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

                                    {/* Dialog content wrapper */}
                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-2
                                            items-center
                                            mt-4
                                        "
                                    >
                                        {/* Dialog title */}
                                        { dialog.title && <Dialog.Title
                                            className='
                                                text-2xl
                                                text-center
                                                dark:text-white
                                            '
                                        >
                                            {dialog.title}
                                        </Dialog.Title>}
                                        
                                        {/* Dialog description */}
                                        { dialog.description && <Dialog.Description
                                            className='
                                                text-center
                                                dark:text-white
                                            '
                                        >
                                            {dialog.description}
                                        </Dialog.Description>}
                                    </div>

                                    {/* external dialog content */}
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

// DialogComponent - reusable dialog component for cases whereby a dialog is 
// required to be rendered directly without using the DialogProvider context
// e.g. when parent state is to be shown in the dialog content
export function DialogComponent({ content, title, description, ...props }) {
    return (
        <Dialog.Root { ...props} >
            <Dialog.Portal>
                {/* Dialog overlay to darken the background */}
                <Dialog.Overlay 
                    className='
                        fixed
                        inset-0
                        bg-black/50
                        backdrop-blur-sm
                    '
                />

                {/* Dialog content container */}
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
                    {/* Dialog close button */}
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

                    {/* Dialog content wrapper */}
                    <div
                        className="
                            flex
                            flex-col
                            gap-2
                            items-center
                            mt-4
                        "
                    >
                        {/* Dialog title */}
                        { title && <Dialog.Title
                            className='
                                text-2xl
                                text-center
                                dark:text-white
                            '
                        >
                            {title}
                        </Dialog.Title>}
                        
                        {/* Dialog description */}
                        { description && <Dialog.Description
                            className='
                                text-center
                                dark:text-white
                            '
                        >
                            {description}
                        </Dialog.Description>}
                    </div>

                    {/* external dialog content */}
                    { content }
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}