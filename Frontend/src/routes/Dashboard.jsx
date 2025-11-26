// Dashboard.jsx
// This route displays the user's dashboard with their code bloks. It includes
// functionality to view, search, create, rename, and delete bloks,
// as well as theme toggling and navigation.


// import route dependencies
import { 
    FaArrowRotateLeft, 
    FaArrowsRotate, 
    FaClipboardList, 
    FaMoon, 
    FaPlus, 
    FaRegSun, 
    FaSpinner,
    FaTriangleExclamation,
} from 'react-icons/fa6'
import Logo from '../components/Logo'
import { Dialog, Form } from 'radix-ui'
import Button from '../components/Button'
import { useThemeProvider } from '../providers/ThemeProvider'
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
import { useToastProvider } from '../providers/ToastProvider'
import { DialogComponent, useDialogProvider } from '../providers/DialogProvider'
import TextField from '../components/TextField'
import { Helmet } from 'react-helmet-async'


export default function Dashboard() {
    // define navigate function from react-router
    const navigateTo = useNavigate()

    // get theme state and theme toggle function from theme provider
    const { theme, toggleTheme } = useThemeProvider()

    // get blok manipulation functions from blok provider
    const {
        getBloks,
        deleteBlok,
        updateBlok
    } = useBlokProvider()

    // get the user state from the auth provider
    const { user } = useAuthProvider()

    // get toast and dialog helper functions from their respective providers
    const { showToast } = useToastProvider()
    const { showDialog, hideDialog } = useDialogProvider()

    // define local bloks and blok count state for route
    const [ bloks, setBloks ] = useState("loading")
    const [ totalBloksCount, setTotalBloksCount ] = useState( 0 )

    // define state for blok renaming functionality
    const [ isRenameDialogOpen, setIsRenameDialogOpen ] = useState( false )
    const [ renameBlokDetails, setRenameBlokDetails ] = useState({
        id: "",
        name: ""
    })

    // default blok fetch limit
    const defaultLimit = 10

    // define blok fetch limit and filter states
    const [ filter, setFilter ] = useState("")
    const [ limit, setLimit ] = useState( defaultLimit )
    const debouncedFilter = useDebounce( filter )
    
    // useEffect to fetch bloks using limit and filter state, initially on mount and
    // whenever any of them changes due to pagination or user input
    useEffect( function() {
        fetchBloks()
    }, [ limit, debouncedFilter ])

    // loadMoreBloks() - loads more bloks when user requests more based on limit
    // and totalBloksCount
    function loadMoreBloks() {
        // check if limit is less than totalBloksCount before loading more bloks
        if ( limit < totalBloksCount ) {
            // since limit is less than totalBloksCount, we can safely
            // increase limit by 10 or set it to totalBloksCount if less than 10 remaining
            if ( totalBloksCount - limit <= 10 ) {
                // set limit to totalBloksCount if less than 10 remaining
                setLimit( ( prevLimit ) => prevLimit + ( totalBloksCount - prevLimit ) )
            } else {
                // otherwise, increase limit by 10
                setLimit( limit + 10 )
            }
        }
    }

    // fetchBloks() - async function to fetch bloks from the server
    async function fetchBloks() {
        // set bloks to loading state if not already loading
        if ( bloks !== "" ) {
            setBloks("loading")
        }

        // fetch bloks using getBloks from blok provider
        const { status, data } = await getBloks( limit, debouncedFilter )

        if ( status === "success" ) {
            // set bloks and totalBloksCount state with fetched data
            setBloks( data.bloks )
            setTotalBloksCount( data.totalBloks )
        } else {
            // set bloks to error state on fetch failure
            setBloks("error")
        }
    }

    // confirmBlokDeletion() - shows a confirmation dialog before deleting a blok
    async function confirmBlokDeletion( id ) {
        // show delete confirmation dialog using showDialog from dialog provider
        const dialogId = showDialog({
            title: "Delete Blok?",
            description: "Are you sure you want to delete this blok",
            content: (
                <Button
                    className="
                        mt-4
                        capitalize
                        w-full
                    "
                    onClick={ handleDelete }
                >
                    delete blok
                </Button>
            )
        })

        // handleDelete() - handles the actual deletion of the blok
        async function handleDelete() {
            // hide the delete confirmation dialog
            hideDialog( dialogId )

            // proceed to delete the blok using deleteBlok from blok provider
            const { status, error } = await deleteBlok( id )

            if ( status === "success" ) {
                // if blok deletion is successful, update local bloks state to remove deleted blok
                setBloks( ( prevBloks ) => prevBloks.filter( ( blok ) => blok.id !== id ) )
                setTotalBloksCount( totalBloksCount - 1 )

                // show success confirmation toast
                showToast({
                    type: "success",
                    message: `The ${ name } Blok has successfully been deleted`
                })
            } else {
                // if blok deletion is unsuccessful, show error confirmation toast
                showToast({
                    type: "error",
                    message: `Error deleting ${ name } Blok: ${ error.message }`
                })
            }
        }
    }

    // handleBlokRename() - handles the renaming of a blok
    async function handleBlokRename( e ) {
        // prevent default form submission behavior
        e.preventDefault()

        // update the blok name using updateBlok from blok provider
        const { status, error } = await updateBlok( renameBlokDetails.id, {
            name: renameBlokDetails.name
        } )

        if ( status === "success" ) {
            // if blok rename is successful, show success confirmation toast
            showToast({
                type: "success",
                message: "Blok renamed successfully"
            })

            // update local bloks state to reflect the new name
            setBloks( bloks.map( function( blok ) {
                if ( blok.id === renameBlokDetails.id ) {
                    return {
                        ...blok,
                        name: renameBlokDetails.name
                    }
                }

                return blok
            }))
        } else {
            // if blok rename is unsuccessful, show error confirmation toast
            showToast({
                type: "error",
                message: `Error renaming Blok: ${ error.message }`
            })
        }

        // reset rename blok state and close the dialog
        setRenameBlokDetails({
            id: "",
            name: ""
        })
        setIsRenameDialogOpen( false )
    }

    // promptBlokRename() - opens the rename dialog with the current blok details
    function promptBlokRename( id, name ) {
        setRenameBlokDetails({
            id,
            name
        })

        setIsRenameDialogOpen( true )
    }

    return (
        <>
            {/* route meta inforation using React-Helmet */}
            <Helmet>
                <title>Dashboard - CodeBloks</title>
                <meta name="description" content="Your CodeBloks Dashboard" />
            </Helmet>

            {/* Main content area */}
            <WideLayout>
                <div
                    className='
                        dashboard
                        pb-12
                    '
                >
                    {/* Dashboard header */}
                    <div
                        className="
                            dashboard--header
                            flex
                            items-center
                            pt-8 lg:py-2
                        "
                    >
                        {/* Navigation menu */}
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
                            {/* Logo */}
                            <Logo 
                                className='
                                    dashboard--header__logo
                                    lg:scale-[0.7]
                                    lg:origin-left
                                ' 
                            />

                            {/* Welcome message */}
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
                                Welcome, { user.username }
                            </h1>
                        </div>

                        {/* Theme toggle button */}
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

                        {/* User avatar and menu */}
                        <NavAvatar className="ml-4"/>
                    </div>

                    {/* Filter bar */}
                    <div 
                        className="
                            dashboard--filter-bar
                            flex
                            items-center
                            gap-2
                            mt-4 lg:mt-2
                        "
                    >
                        {/* Search input - allows users to filter their bloks using a search term */}
                        <SearchInput 
                            className="
                                flex-1
                                min-w-0
                            "
                            value={ filter }
                            onChange={ (e) => setFilter( e.target.value ) }
                        />

                        {/* New Blok button - navigates to blok creation page */}
                        <Button
                            onClick={ () => navigateTo('/create') }
                        >
                            <FaPlus className='dashboard--filter-bar__add-btn-icon' />

                            <span className="dashboard--filter-bar__add-btn-text">
                                New Blok
                            </span>
                        </Button>
                    </div>

                    {/* Blok list container */}
                    <div 
                        className="
                            dashboard--blok-list-ctn
                            mt-8
                        "
                    >
                        {/* Loading state */}
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
                        
                        {/* Error state */}
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
                        
                        {/* Empty state */}
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
                                    { 
                                        filter === "" ? 
                                        "You have not created any bloks yet" : 
                                        `There were no bloks matching that search term "${ filter }"`
                                    }
                                </span>

                                { filter === "" && <Button
                                    className="
                                        gap-2
                                    "
                                    onClick={ () => navigateTo('/create') }
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

                        {/* Blok list */}
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
                                                    key={ blok.id }
                                                    name={ blok.name } 
                                                    id={ blok.id }
                                                    iframeContent={ generateIframeContent( 
                                                        blok.html,
                                                        blok.css,
                                                        blok.js,
                                                        theme
                                                    )}
                                                    confirmBlokDeletion={ () => confirmBlokDeletion( blok.id ) }
                                                    promptBlokRename={ () => promptBlokRename( blok.id, blok.name ) }
                                                /> 
                                            )
                                        }
                                    ) 
                                }
                            </div>
                        }

                        {/* Load more button - allows users to load more bloks if available */}
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

            {/* Rename Blok Dialog */}
            <DialogComponent
                open={ isRenameDialogOpen }
                onOpenChange={ setIsRenameDialogOpen }
                title="Rename Blok"
                description="Enter the new blok name in the form below"
                content={(
                    <Form.Root
                        onSubmit={ handleBlokRename }
                        className="
                            mt-4
                            flex
                            flex-col
                            gap-2
                            text-gray-900 dark:text-white
                        "
                    >
                        <TextField
                            label="Name"
                            value={ renameBlokDetails.name }
                            onChange={ ( e ) => setRenameBlokDetails( { 
                                ...renameBlokDetails,
                                name: e.target.value
                            })}
                        />

                        <Button
                            className="
                                w-full
                                capitalize
                            "
                        >
                            rename blok
                        </Button>
                    </Form.Root>
                )}
            />
        </>
    )
}
