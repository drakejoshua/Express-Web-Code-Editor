// NavAvatar.jsx
// This component is a wrapper for the UserAvatar and Radix-ui
// dropdown components. It's used for the total functionality of
// having the avatar showing with other dropdown actions for the
// dashboard, editor routes, etc



// import component dependencies
import { DropdownMenu } from 'radix-ui'
import { FaArrowsRotate, FaArrowRightFromBracket } from 'react-icons/fa6'
import UserAvatar from './UserAvatar'


// define and export NavAvatar component
export default function NavAvatar({ className }) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <UserAvatar 
                    className={`
                        ${ className }
                    `}
                />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align='end'
                    sideOffset={8}
                    className='
                        dashboard--header__profile-dropdown
                        p-3.5
                        rounded-md
                        bg-neutral-100 dark:bg-gray-600
                        w-[30vh] min-w-[250px] max-w-[350px]
                    '
                >
                    <div 
                        className="
                            dashboard--header__profile-summary
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <UserAvatar />

                        <div 
                            className='
                                dashboard--header__profile-info
                                flex
                                flex-col
                            '
                        >
                            <span 
                                className="
                                    dashboard--header__profile-username
                                    font-medium
                                    text-lg 
                                    inline-block
                                    text-ellipsis
                                    overflow-hidden
                                    whitespace-nowrap
                                    dark:text-white
                                "
                            >
                                Joshua Mabawonku
                            </span>
                            
                            <span 
                            className="
                                    dashboard--header__profile-email
                                    inline-block
                                    text-gray-600 dark:text-gray-300
                                    text-ellipsis
                                    overflow-hidden
                                    whitespace-nowrap
                                "
                            >
                                joshua@email.com
                            </span>
                        </div>
                    </div>

                    <div 
                        className="
                            dashboard--header__profile-options-list 
                            mt-2
                            *:flex
                            *:items-center
                            *:gap-2
                            *:dark:text-white
                            *:hover:bg-neutral-300 *:hover:dark:bg-gray-700
                            *:p-2 *:px-3
                            *:outline-none
                            *:rounded-md
                            *:capitalize
                        "
                    >
                        <DropdownMenu.Item 
                            className='
                                dashboard--header__profile-option
                            '
                        >
                            <FaArrowsRotate className="dashboard--header__option-icon" /> 

                            <span className="dashboard--header__option-text">
                                Update Profile
                            </span>
                        </DropdownMenu.Item>
                        
                        <DropdownMenu.Item 
                            className='
                                dashboard--header__profile-option
                            '
                        >
                            <FaArrowRightFromBracket className="dashboard--header__option-icon" /> 

                            <span className="dashboard--header__option-text">
                                logout
                            </span>
                        </DropdownMenu.Item>
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
