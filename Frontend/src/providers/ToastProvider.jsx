import { createContext, forwardRef, useContext, useState } from 'react'
import { Toast } from "radix-ui"
import Button from '../components/Button'
import { FaCircleCheck, FaCircleInfo, FaTriangleExclamation, FaXmark } from 'react-icons/fa6'


const ToastContext = createContext()

export function useToastProvider() {
    return useContext(ToastContext)
}


export default function ToastProvider({ children }) {
    const [ toasts, setToasts ] = useState([])
    // message, type, action, actionLabel

    function showToast({ message, type, action, actionLabel }) {
        const id = Date.now()
        setToasts([...toasts, { id, message, type, action, actionLabel }])

        return id
    }

    function hideToast(id) {
        setToasts(toasts.filter(toast => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            <Toast.Provider
                swipeDirection='right'
                duration={5000}
            >
                { children }

                { toasts.map(toast => (
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

                            <Toast.Description>
                                { toast.message}
                            </Toast.Description>

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