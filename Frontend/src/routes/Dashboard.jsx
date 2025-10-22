// import route dependencies
import { 
    FaArrowRightFromBracket, 
    FaArrowsRotate, 
    FaBars, 
    FaEllipsisVertical, 
    FaMagnifyingGlass, 
    FaMoon, 
    FaPencil, 
    FaPlus, 
    FaSun, 
    FaTrash, 
    FaUser, 
    FaXmark 
} from 'react-icons/fa6'
import Logo from '../components/Logo'
import { Avatar, Dialog, DropdownMenu } from 'radix-ui'
import Button from '../components/Button'
import { useThemeProvider } from '../providers/ThemeProvider'


export default function Dashboard() {
    
    const { theme, toggleTheme } = useThemeProvider()

    return (
        <div
            className='
                dashboard
                h-screen
                text-gray-900 dark:text-white
                bg-white dark:bg-gray-900
                overflow-auto
                px-6 pb-12
            '
        >
            <div
                className="
                    dashboard--header
                    flex
                    items-center
                    py-2
                "
            >
                <Dialog.Root>
                    <Dialog.Trigger className='dashboard--header__menu-trigger'>
                        <FaBars 
                            className='
                                dashboard--header__menu-trigger-icon
                                text-2xl
                            ' 
                        />
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay 
                            className='
                                dashboard--header__menu-overlay 
                                fixed 
                                inset-0 
                                bg-black/50
                            ' 
                        />
                        
                        <Dialog.Content 
                            className='
                                dashboard--header__menu-content
                                h-screen
                                fixed
                                top-0
                                bg-white dark:bg-gray-900
                                p-6
                                flex
                                flex-col
                                gap-6
                                w-1/5 min-w-[200px] max-w-[350px]
                            '
                        >
                            <Logo className='dashboard--header__menu-logo' />

                            <div 
                                className="
                                    dashboard--filter-bar__search-input-ctn
                                    bg-neutral-200
                                    rounded-lg
                                    flex
                                    p-2 px-4
                                    items-center
                                    gap-3
                                "
                            >
                                <FaMagnifyingGlass className='dashboard--filter-bar__search-icon' />

                                <input 
                                    type="text" 
                                    className='
                                        dashboard--filter-bar__search-input
                                        placeholder-shown:capitalize
                                        outline-none
                                        font-medium
                                        flex-grow
                                    '
                                    placeholder='search your bloks...'
                                />
                            </div>

                            <div 
                                className="
                                    dashboard--header__menu-blok-list
                                    flex-grow
                                    overflow-auto
                                "
                            >
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
                                        "
                                    >
                                        blok_1
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
                                        "
                                    >
                                        simple_one
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
                                        "
                                    >
                                        image example
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
                                        "
                                    >
                                        color_riot_example
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
                                        "
                                    >
                                        animation
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
                            </div>

                            <button 
                                className="
                                    dashboard--header__load-more-btn
                                    text-blue-600
                                    underline
                                    mb-8
                                "
                            >
                                load more
                            </button>

                            <Dialog.Close 
                                className="
                                    dashboard--header__menu-close-btn
                                    absolute
                                    right-5 
                                    text-gray-900
                                    text-2xl
                                "
                            >
                                <FaXmark/>
                            </Dialog.Close>

                            <Button
                                className="
                                    mt-auto
                                "
                            >
                                <FaPlus/>

                                <span>
                                    add new blok
                                </span>
                            </Button>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

                <div 
                    className="
                        dashboard--header__title-ctn
                        flex 
                        flex-col
                        items-start
                        ml-8
                    "
                >
                    <Logo 
                        className='
                            dashboard--header__logo
                            scale-[0.7]
                            origin-left
                        ' 
                    />

                    <h1 
                        className="
                            dashboard--header__title
                            font-medium
                            font-mono
                            text-2xl
                            -mt-1
                        "
                    >
                        Welcome, Joshua
                    </h1>
                </div>

                <button 
                    className="
                        dashboard--header__theme-toggle-btn
                        text-2xl
                        ml-auto
                    "
                    onClick={toggleTheme}
                >
                    { theme == "light" && <FaMoon className='dashboard--header__theme-toggle-icon' />}
                    { theme == "dark" && <FaSun className='dashboard--header__theme-toggle-icon' />}
                </button>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <Avatar.Root 
                            className='
                                dashboard--header__avatar-ctn
                                h-10
                                w-10
                                rounded-full
                                overflow-hidden
                                bg-blue-600 dark:bg-white
                                ml-4
                            '
                        >
                            <Avatar.Image 
                                src={'https://imagesunsplash.com/photo-1598096969068-7f52cac10c83?ixlib=rb-4.1.0'
                                +'&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym95JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}
                                className='
                                    dashboard--header__avatar-photo
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
                                        dashboard--header__avatar-icon
                                        text-xl
                                        text-white dark:text-gray-900
                                    '
                                />
                            </Avatar.Fallback>
                        </Avatar.Root>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align='end'
                            sideOffset={8}
                            className='
                                dashboard--header__profile-dropdown
                                p-3.5
                                rounded-md
                                bg-neutral-100 dark:bg-neutral-800
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
                                <Avatar.Root    
                                    className='
                                        dashboard--header__avatar-ctn
                                        h-10
                                        w-10
                                        rounded-full
                                        overflow-hidden
                                        bg-blue-600 dark:bg-white
                                    '
                                >
                                    <Avatar.Image 
                                        src={'https://imagesunsplash.com/photo-1598096969068-7f52cac10c83?ixlib=rb-4.1.0'
                                        +'&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym95JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}
                                        className='
                                            dashboard--header__avatar-photo
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
                                                dashboard--header__avatar-icon
                                                text-xl
                                                text-white dark:text-gray-900
                                            '
                                        />
                                    </Avatar.Fallback>
                                </Avatar.Root>

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
                                        "
                                    >
                                        Joshua Mabawonku
                                    </span>
                                    
                                    <span 
                                    className="
                                            dashboard--header__profile-email
                                            inline-block
                                            text-gray-600
                                            text-ellipsis
                                            overflow-hidden
                                            whitespace-nowrap
                                        "
                                    >
                                        joshua@email.com
                                    </span>
                                </div>
                            </div>

                            <div className="dashboard--header__profile-options-list mt-2">
                                <DropdownMenu.Item 
                                    className='
                                        dashboard--header__profile-option
                                        flex
                                        items-center
                                        gap-2
                                        hover:bg-neutral-300
                                        p-2 px-3
                                        outline-none
                                        rounded-md
                                        capitalize
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
                                        flex
                                        items-center
                                        gap-2
                                        hover:bg-neutral-300
                                        p-2 px-3
                                        outline-none
                                        rounded-md
                                        capitalize
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
            </div>

            <div 
                className="
                    dashboard--filter-bar
                    flex
                    items-center
                    gap-2
                    mt-2
                "
            >
                <div 
                    className="
                        dashboard--filter-bar__search-input-ctn
                        bg-neutral-200
                        flex-grow
                        rounded-lg
                        flex
                        p-2 px-4
                        items-center
                        gap-3
                    "
                >
                    <FaMagnifyingGlass className='dashboard--filter-bar__search-icon' />

                    <input 
                        type="text" 
                        className='
                            dashboard--filter-bar__search-input
                            placeholder-shown:capitalize
                            outline-none
                            font-medium
                            flex-grow
                        '
                        placeholder='search something...'
                    />
                </div>

                <Button>
                    <FaPlus className='dashboard--filter-bar__add-btn-icon' />

                    <span className="dashboard--filter-bar__add-btn-text">
                        Create Blok
                    </span>
                </Button>
            </div>

            <div 
                className="
                    dashboard--blok-list-ctn
                    mt-8
                "
            >
                <div 
                    className="
                        dashboard--blok-list-ctn__blok-list
                        grid
                        grid-cols-3
                        gap-10
                    "
                >
                    <div 
                        className="
                            dashboard--blok-list__blok
                            rounded-md
                            overflow-hidden
                            w-full
                            border-2
                            border-gray-900
                            hover:border-blue-500
                            transition-all
                            duration-200
                        "
                    >
                        <iframe 
                            srcDoc={`<body class="text-white bg-black">
                                <!-- Tailwind CDN -->
                                <script src="https://cdn.tailwindcss.com"></script>

                                <h1 class="text-2xl font-medium mb-2">Welcome !!!</h1>
                                <p class="text-gray-300 mb-8">
                                    Experience code-editing in the browser
                                </p>

                                <button class="bg-blue-500 text-white px-3 py-1.5 rounded">
                                    Only Available At Codebloks
                                </button>
                            </body>`}
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
                                bg-gray-900
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
                                blok_1
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
                    
                    <div 
                        className="
                            dashboard--blok-list__blok
                            rounded-md
                            overflow-hidden
                            w-full
                            border-2
                            border-gray-900
                            hover:border-blue-500
                            transition-all
                            duration-200
                        "
                    >
                        <iframe 
                            srcDoc={`<body class="text-white bg-neutral-500">
                                <!-- Tailwind CDN -->
                                <script src="https://cdn.tailwindcss.com"></script>

                                <h1 class="text-2xl font-medium mb-2">Simple One</h1>
                                <p class="text-gray-300 mb-8">
                                    Hello Codebloks User
                                </p>

                                <a class="bg-amber-800 text-white px-3 py-1.5 rounded">
                                    Explore More
                                </a>
                            </body>`}
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
                                bg-gray-900
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
                                simple_one
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
                    
                    <div 
                        className="
                            dashboard--blok-list__blok
                            rounded-md
                            overflow-hidden
                            w-full
                            border-2
                            border-gray-900
                            hover:border-blue-500
                            transition-all
                            duration-200
                        "
                    >
                        <iframe 
                            srcDoc={`<body class="text-white bg-amber-800">
                                <!-- Tailwind CDN -->
                                <script src="https://cdn.tailwindcss.com"></script>

                                <h1 class="text-2xl font-medium mb-2">Animation Example</h1>
                                <p class="text-gray-300 mb-8 animate-pulse">
                                    Head out With animation
                                </p>

                                <button class="bg-gray-800 text-white px-3 py-1.5 rounded animate-bounce">
                                    Only Available At Codebloks
                                </button>
                            </body>`}
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
                                bg-gray-900
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
                                animation
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
                    
                    <div 
                        className="
                            dashboard--blok-list__blok
                            rounded-md
                            overflow-hidden
                            w-full
                            border-2
                            border-gray-900
                            hover:border-blue-500
                            transition-all
                            duration-200
                        "
                    >
                        <iframe 
                            srcDoc={`<body class="text-white bg-red-400">
                                <!-- Tailwind CDN -->
                                <script src="https://cdn.tailwindcss.com"></script>

                                <h1 class="text-2xl text-gray-800 font-medium mb-2">Color Riot!!</h1>
                                <p class="text-gray-300 mb-8">
                                    Experience code-editing in the browser
                                </p>

                                <button class="bg-amber-900 text-white px-3 py-1.5 rounded">
                                    Only Available At Codebloks
                                </button>
                            </body>`}
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
                                bg-gray-900
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
                                color_riot_example
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
                    
                    <div 
                        className="
                            dashboard--blok-list__blok
                            rounded-md
                            overflow-hidden
                            w-full
                            border-2
                            border-gray-900
                            hover:border-blue-500
                            transition-all
                            duration-200
                        "
                    >
                        <iframe 
                            srcDoc={`<body class="text-white bg-black">
                                <!-- Tailwind CDN -->
                                <script src="https://cdn.tailwindcss.com"></script>

                                <img class="text-2xl font-medium mb-2" height=100 width=100
                                    src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3V5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500" alt="Code Example" />
                                <code class="text-gray-300 mb-8 px-4">
                                    > Image of some guy
                                </code>
                            </body>`}
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
                                bg-gray-900
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
                                image example
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
                </div>

                <Button
                    className='
                        mt-14
                        mx-auto
                    '
                >
                    <FaArrowsRotate className='dashboard--blok-list-ctn__refresh-icon' />

                    <span className="dashboard--blok-list-ctn__refresh-text">
                        load more bloks
                    </span>
                </Button>
            </div>
        </div>
    )
}
