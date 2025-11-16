// UserAvatar.jsx
// This component renders a user avatar using Radix UI's Avatar component.
// It displays the user's profile picture if available, otherwise falls back to a default user icon.
// It accepts additional class names and props to customize its behavior and appearance.


// import component dependencies
import { Avatar } from 'radix-ui'
import { forwardRef } from 'react'
import { FaUser } from 'react-icons/fa6'
import { useAuthProvider } from '../providers/AuthProvider'

// define UserAvatar component
const UserAvatar = forwardRef( function ( { className, ...props }, ref ) {
    const { user } = useAuthProvider()

    return (
        // avatar root container
        <Avatar.Root 
            // apply default and custom classes
            className={`
                avatar-ctn
                h-10
                w-10
                rounded-full
                overflow-hidden
                bg-blue-600 dark:bg-white
                block
                ${ className || ""}
            `}
            ref={ref}
            { ...props }
        >
            {/* User avatar image */}
            <Avatar.Image 
                src={ user !== "loading" || user !== "error" ? user.profile_photo_url : "" }
                className='
                    avatar-photo
                    h-full
                    w-full
                    object-cover
                '
            />
            
            {/* Fallback icon if avatar image fails to load */}
            <Avatar.Fallback 
                delayMs={3000}
                className='
                    h-full
                    w-full
                    flex
                    justify-center
                    items-center
                '
            >
                <FaUser 
                    className='
                        avatar-icon
                        text-xl
                        text-white dark:text-gray-900
                    '
                />
            </Avatar.Fallback>
        </Avatar.Root>
    )
})

// set display name for debugging purposes
UserAvatar.displayName = 'UserAvatar'


// export UserAvatar component for use in other parts of 
// the application
export default UserAvatar
