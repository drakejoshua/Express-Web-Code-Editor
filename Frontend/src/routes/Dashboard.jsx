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
    FaRegSun, 
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
import NavMenu from '../components/NavMenu'
import NavAvatar from '../components/NavAvatar'
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {
    
    const { theme, toggleTheme } = useThemeProvider()

    const navigateTo = useNavigate()

    return (
        <WideLayout>
            <div
                className='
                    dashboard
                    pb-12
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
                    <NavMenu/>

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
                        { theme == "dark" && <FaRegSun className='dashboard--header__theme-toggle-icon' />}
                    </button>

                    <NavAvatar className="ml-4"/>
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
                        onClick={ () => navigateTo('/create') }
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
