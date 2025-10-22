import { Avatar } from 'radix-ui'
import { forwardRef } from 'react'
import { FaUser } from 'react-icons/fa6'

const UserAvatar = forwardRef( function ( { className, ...props }, ref ) {
    return (
        <Avatar.Root 
            className={`
                avatar-ctn
                h-10
                w-10
                rounded-full
                overflow-hidden
                bg-blue-600 dark:bg-white
                ${ className || ""}
            `}
            ref={ref}
            { ...props }
        >
            <Avatar.Image 
                src={'https://images.unsplash.com/photo-1598096969068-7f52cac10c83?ixlib=rb-4.1.0'
                +'&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym95JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}
                className='
                    avatar-photo
                    h-full
                    w-full
                    object-cover
                '
            />
            
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

UserAvatar.displayName = 'UserAvatar'

export default UserAvatar
