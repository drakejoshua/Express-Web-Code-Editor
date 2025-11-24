// ToastProvider.jsx
// This provider manages toast notifications across the application.
// It allows components to show and hide toasts with custom messages,
// types, and actions using a shared context.


// import provider dependencies
import { createContext, useContext, useState } from 'react'
import { Toast } from "radix-ui"
import Button from '../components/Button'
import { FaCircleCheck, FaCircleInfo, FaTriangleExclamation, FaXmark } from 'react-icons/fa6'

// create context for sharing toast state and functions
// across the application
const ToastContext = createContext()

// custom hook to access toast context from ToastProvider
export function useToastProvider() {
    return useContext(ToastContext)
}


// ToastProvider component to provide toast state and functions
// while rendering active toasts and children components
export default function ToastProvider({ children }) {
    // state to manage active toasts
    const [ toasts, setToasts ] = useState([])
    // toast - message, type, action, actionLabel

    // showToast() - add a new toast to the state
    function showToast({ message, type, action, actionLabel }) {
        // generate unique id for the toast
        const id = Date.now()

        // add new toast to the list of active toasts
        setToasts([...toasts, { id, message, type, action, actionLabel }])

        // return the unique id of the new toast
        return id
    }

    // hideToast() - remove a toast from the state by its id
    function hideToast(id) {
        // filter out the toast with the given id
        setToasts(toasts.filter(toast => toast.id !== id))
    }

    // ToastProvider component to provide toast state and functions
    // while rendering active toasts and children components
    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {/* Toast provider to manage toast notifications */}
            <Toast.Provider
                swipeDirection='right'
                duration={5000}
            >
                { children }

                {/* Render active toasts by mapping over the toasts state */}
                { toasts.map(toast => (
                        // Toast root for each toast object
                        <Toast.Root
                            key={toast.id}
                            className='
                                flex
                                items-center
                                p-3 px-4
                                gap-4
                                bg-gray-200
                                rounded-lg
                                data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
                                data-[swipe=cancel]:translate-x-[0]
                                transition-transform
                                duration-200
                            '
                            onOpenChange={ () => hideToast( toast.id ) }
                            onEscapeKeyDown={ () => hideToast( toast.id ) }
                        >
                            {/* Icon based on toast type */}
                            { toast.type == "success" && <FaCircleCheck
                                className='
                                    flex-shrink-0
                                    text-2xl
                                    text-green-700
                                '
                            />}
                            { toast.type == "error" && <FaTriangleExclamation
                                className='
                                    flex-shrink-0
                                    text-2xl
                                    text-amber-700
                                '
                            />}
                            { toast.type == "info" && <FaCircleInfo
                                className='
                                    flex-shrink-0
                                    text-2xl
                                    text-blue-700
                                '
                            />}

                            {/* Toast message description */}
                            <Toast.Description>
                                { toast.message}
                            </Toast.Description>

                            {/* Render action button if action is provided */}
                            { toast.action && <Toast.Action 
                                asChild
                                altText='Notification Action'
                            >
                                <Button
                                    onClick={ function() {
                                        toast.action()
                                        hideToast(toast.id)
                                    }}
                                >
                                    { toast.actionLabel }
                                </Button>
                            </Toast.Action> }

                            {/* Toast close button */}
                            <Toast.Close
                                className='ml-auto'
                            >
                                <FaXmark 
                                    className='
                                        text-2xl
                                        text-gray-900
                                    '
                                />
                            </Toast.Close>
                        </Toast.Root>
                    ))
                }

                {/* Toast viewport to position toasts on screen */}
                <Toast.Viewport 
                    className='
                        fixed
                        right-2 lg:right-4
                        top-2 lg:top-4
                        flex
                        flex-col
                        gap-4
                        w-[350px]
                        max-w-full
                    '
                />
            </Toast.Provider>
        </ToastContext.Provider>
    )
}