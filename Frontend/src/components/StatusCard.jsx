// StatusCard.jsx
// This component displays a status card with an icon, heading, text,
// and optional redirect link or action button based on the provided status prop.
// It supports different status types like success, loading, and error.
// It uses the link component from react-router-dom for navigation, custom Button component for actions.
// and reacts-icons for status icons.



// import component dependencies
import React from 'react'
import { FaCircleCheck, FaSpinner, FaTriangleExclamation } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Button from './Button'

// define StatusCard component
const StatusCard = React.forwardRef(({ className, status, ...props }, ref) => {
  return (
    <div 
        // apply default and custom classes
        className={`
            status-card
            flex 
            flex-col 
            items-center 
            gap-5 
            bg-gray-900 dark:bg-gray-950/80 
            p-10 py-14 
            rounded-xl
            ${ className || ''}
        `}
        ref={ref}

        {...props}
    >
        {
            // render icon based on status type: success, loading, or error
            {
                success: <FaCircleCheck
                    className='
                        status-card__icon 
                        text-5xl
                        text-green-300
                    '
                />,

                loading: <FaSpinner 
                    className='
                        status-card__loading-spinner
                        animate-spin 
                        text-3xl
                        text-white
                    '
                />,

                error: <FaTriangleExclamation 
                    className='
                        status-card-error__icon 
                        text-5xl
                        text-yellow-300
                    '
                />
            }[ status.type ]
        }
      
        {/* status section - heading */}
        <h1 
            className='
                status-card__heading 
                text-xl 
                font-medium 
                text-center
                text-white
            '
        >
            { status.heading }
        </h1>

        {/* status section - description text */}
        <p 
            className='
                status-card__text 
                text-center 
                text-gray-300
            '
        >
            { status.text }
        </p>

        {/* status section - redirect link if available */}
        { status.redirect && <Link
            to={ status.redirect } 
            className='
                status-card__btn
                bg-blue-600 hover:bg-blue-500 dark:bg-blue-800 hover:dark:bg-blue-700 
                transition-colors
                p-2 px-6 
                rounded-lg 
                font-medium 
                flex 
                items-center 
                gap-2
                text-white 
            '
        >
            { status.redirect_content }
        </Link>}

        {/* status section - action button if available */}
        { status.action && <Button 
            onClick={ status.action }
        >
            { status.action_content }
        </Button>}
    </div>
  )
})


// export StatusCard component for use in other parts
// of the application
export default StatusCard