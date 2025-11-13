// import route dependencies
import { 
    FaArrowRightFromBracket, 
    FaArrowRotateLeft, 
    FaArrowsRotate, 
    FaBars, 
    FaClipboardList, 
    FaEllipsisVertical, 
    FaMagnifyingGlass, 
    FaMoon, 
    FaPencil, 
    FaPlus, 
    FaRegSun, 
    FaSpinner, 
    FaTrash, 
    FaTriangleExclamation, 
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
import { useAuthProvider } from '../providers/AuthProvider'
import { useBlokProvider } from '../providers/BlokProvider'
import { generateIframeContent } from '../utils/editor_utils'
import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'


export default function Dashboard() {
    const navigateTo = useNavigate()

    const { theme, toggleTheme } = useThemeProvider()
    const {
        getBloks
    } = useBlokProvider()

    const [ bloks, setBloks ] = useState("loading")
    const [ totalBloksCount, setTotalBloksCount ] = useState( 0 )

    const defaultLimit = 10
    const [ filter, setFilter ] = useState("")
    const [ limit, setLimit ] = useState( defaultLimit )
    const debouncedFilter = useDebounce( filter )
    
    useEffect( function() {
        fetchBloks()
    }, [ limit, debouncedFilter ])

    function loadMoreBloks() {
        if ( limit < totalBloksCount ) {
            if ( totalBloksCount - limit <= 10 ) {
                setLimit( ( prevLimit ) => prevLimit + ( totalBloksCount - prevLimit ) )
            } else {
                setLimit( limit + 10 )
            }
        }
    }

    async function fetchBloks() {
        const { status, data } = await getBloks( limit, debouncedFilter )

        if ( status === "success" ) {
            setBloks( data.bloks )
            setTotalBloksCount( data.totalBloks )
        } else {
            setBloks("error")
        }
    }

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
                        value={ filter }
                        onChange={ (e) => setFilter( e.target.value ) }
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
                    { 
                        ( 
                            bloks === "loading" && 
                            bloks !== "error" 
                        ) && <div 
                            className="
                                dashboard--blok-list-ctn__loading-state
                                flex
                                flex-col
                                gap-6
                                items-center
                            "
                        >
                            <FaSpinner 
                                className='
                                    text-2xl
                                    animate-spin
                                '
                            />

                            <span 
                                className="
                                    dashboard--blok-list-ctn__loading-text
                                "
                            >
                                { filter === "" ? "loading your bloks..." : "searching bloks..."}
                            </span>
                        </div> 
                    }
                    
                    { 
                        ( 
                            bloks === "error" && 
                            bloks !== "loading"
                        ) && 
                        <div 
                            className="
                                dashboard--blok-list-ctn__error-state
                                flex
                                flex-col
                                gap-6
                                items-center
                            "
                        >
                            <FaTriangleExclamation 
                                className='
                                    text-2xl
                                '
                            />

                            <span 
                                className="
                                    dashboard--blok-list-ctn__loading-text
                                    text-xl
                                    capitalize
                                "
                            >
                                { 
                                    filter === "" ? 
                                    "There was an error loading your bloks" : 
                                    "There was an error searching your bloks"
                                }
                            </span>

                            <Button
                                className="
                                    gap-2
                                "
                            >
                                <FaArrowRotateLeft
                                    className='
                                        text-xl
                                    '
                                />

                                <span>
                                    retry
                                </span>
                            </Button>
                        </div> 
                    }
                    
                    { 
                        ( 
                            bloks !== "error" && 
                            bloks !== "loading" && 
                            bloks.length == 0 
                        ) && 
                        <div 
                            className="
                                dashboard--blok-list-ctn__error-state
                                flex
                                flex-col
                                gap-6
                                items-center
                            "
                        >
                            <FaClipboardList 
                                className='
                                    text-2xl
                                '
                            />

                            <span 
                                className="
                                    dashboard--blok-list-ctn__loading-text
                                    text-xl
                                    capitalize
                                "
                            >
                                You have not created any bloks yet
                                { 
                                    filter === "" ? 
                                    "You have not created any bloks yet" : 
                                    `There were no bloks matching that search term ${ filter }`
                                }
                            </span>

                            { filter === "" && <Button
                                className="
                                    gap-2
                                "
                            >
                                <FaPlus
                                    className='
                                        text-xl
                                    '
                                />

                                <span>
                                    create your first blok
                                </span>
                            </Button>}

                        </div> 
                    }

                    { 
                        ( 
                            bloks !== "loading" && 
                            bloks !== "error" && 
                            bloks.length != 0 
                        ) &&
                        <div 
                            className="
                                dashboard--blok-list-ctn__blok-list
                                grid
                                grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                                gap-6 lg:gap-10
                            "
                        >
                            { ( bloks !== "loading" && bloks !== "error" ) && 
                                bloks.map(
                                    function( blok ) {
                                        return (
                                            <Blok 
                                                name={ blok.name } 
                                                iframeContent={ generateIframeContent( 
                                                    blok.html,
                                                    blok.css,
                                                    blok.js,
                                                    theme
                                                )}
                                            /> 
                                        )
                                    }
                                ) 
                            }
                        </div>
                    }

                    { 
                        ( 
                            bloks !== 'loading' &&
                            bloks !== "error" && 
                            limit > totalBloksCount &&
                            totalBloksCount > defaultLimit
                        ) 
                        && 
                        <Button
                            className='
                                mt-14
                                mx-auto
                            '
                            onClick={ loadMoreBloks }
                        >
                            <FaArrowsRotate className='dashboard--blok-list-ctn__refresh-icon' />

                            <span className="dashboard--blok-list-ctn__refresh-text">
                                load more bloks
                            </span>
                        </Button>
                    }
                </div>
            </div>
        </WideLayout>
    )
}
