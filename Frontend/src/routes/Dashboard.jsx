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
import { Dialog, DropdownMenu } from 'radix-ui'
import Button from '../components/Button'
import { useThemeProvider } from '../providers/ThemeProvider'
import NavMenuBlok from '../components/NavMenuBlok'
import UserAvatar from '../components/UserAvatar'
import SearchInput from '../components/SearchInput'
import Blok from '../components/Blok'
import WideLayout from '../components/WideLayout'


export default function Dashboard() {
    
    const { theme, toggleTheme } = useThemeProvider()

    return (
        <WideLayout>
            <div
                className='
                    dashboard
                '
            >
                <div
                    className="
                        dashboard--header
                        flex
                        items-center
                        pt-8 lg:py-2
                    "
                >
                    <Dialog.Root>
                        <Dialog.Trigger className='dashboard--header__menu-trigger'>
                            <FaBars 
                                className='
                                    dashboard--header__menu-trigger-icon
                                    text-2xl
                                    outline-none
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
                                    w-1/5 min-w-[300px] max-w-[350px]
                                '
                            >
                                <Logo className='dashboard--header__menu-logo' />

                                <SearchInput />

                                <div 
                                    className="
                                        dashboard--header__menu-blok-list
                                        flex-grow
                                        overflow-auto
                                    "
                                >
                                    <NavMenuBlok name={"blok_1"} />
                                    
                                    <NavMenuBlok name="simple_one" />

                                    <NavMenuBlok name="color riot example" />

                                    <NavMenuBlok name="animation" />
                                    
                                    <NavMenuBlok name="image_example" />
                                </div>

                                <button 
                                    className="
                                        dashboard--header__load-more-btn
                                        text-blue-600 dark:text-blue-400
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
                                        text-gray-900 dark:text-white
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
                            ml-3 lg:ml-8
                        "
                    >
                        <Logo 
                            className='
                                dashboard--header__logo
                                lg:scale-[0.7]
                                lg:origin-left
                            ' 
                        />

                        <h1 
                            className="
                                dashboard--header__title
                                font-medium
                                font-mono
                                text-2xl
                                -mt-1
                                hidden lg:block
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
                            <UserAvatar 
                                className="
                                    ml-4
                                "
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
                </div>

                <div 
                    className="
                        dashboard--filter-bar
                        flex
                        items-center
                        gap-2
                        mt-4 lg:mt-2
                    "
                >
                    <SearchInput 
                        className="
                            flex-1
                            min-w-0
                        "
                    />

                    <Button
                        className="
                            
                        "
                    >
                        <FaPlus className='dashboard--filter-bar__add-btn-icon' />

                        <span className="dashboard--filter-bar__add-btn-text">
                            New Blok
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
                            grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                            gap-6 lg:gap-10
                        "
                    >
                        <Blok 
                            name="blok_1" 
                            iframeContent={`<body class="text-white bg-black">
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
                        />

                        <Blok 
                            name="simple_one" 
                            iframeContent={`<body class="text-white bg-neutral-500">
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
                        />

                        <Blok 
                            name="animation" 
                            iframeContent={`<body class="text-white bg-amber-800">
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
                        />
                        <Blok 
                            name="color_riot_example" 
                            iframeContent={`<body class="text-white bg-red-400">
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
                        />
                        <Blok 
                            name="image_example" 
                            iframeContent={`<body class="text-white bg-black">
                                    <!-- Tailwind CDN -->
                                    <script src="https://cdn.tailwindcss.com"></script>

                                    <img class="text-2xl font-medium mb-2" height=100 width=100
                                        src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3V5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500" alt="Code Example" />
                                    <code class="text-gray-300 mb-8 px-4">
                                        > Image of some guy
                                    </code>
                                </body>`}
                        />
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
        </WideLayout>
    )
}
