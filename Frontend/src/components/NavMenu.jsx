// NavMenu.jsx
// This component represents the navigation sidebar for the application
// It uses radix-ui dialog and displays actions for adding, deleting, 
// renaming bloks, etc



// import component depedencies
import { FaBars, FaPlus, FaXmark, FaSpinner, FaClipboardList, FaTriangleExclamation, FaArrowRotateLeft, FaEllipsisVertical } from "react-icons/fa6";
import Logo from "./Logo";
import NavMenuBlok from "./NavMenuBlok";
import SearchInput from "./SearchInput";
import { Dialog, Form } from "radix-ui";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useBlokProvider } from "../providers/BlokProvider";
import { useToastProvider } from "../providers/ToastProvider";
import { useDialogProvider, DialogComponent } from "../providers/DialogProvider";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useEffect } from "react";
import TextField from "./TextField";


// define and export NavMenu component
export default function NavMenu() {

    const navigateTo = useNavigate()

    const {
        getBloks,
        deleteBlok,
        updateBlok
    } = useBlokProvider()

    const { showToast } = useToastProvider()
    const { showDialog, hideDialog } = useDialogProvider()

    const [ bloks, setBloks ] = useState("loading")
    const [ totalBloksCount, setTotalBloksCount ] = useState( 0 )

    const [ isRenameDialogOpen, setIsRenameDialogOpen ] = useState( false )
    const [ renameBlokDetails, setRenameBlokDetails ] = useState({
        id: "",
        name: ""
    })

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
        if ( bloks !== "" ) {
            setBloks("loading")
        }

        const { status, data } = await getBloks( limit, debouncedFilter )

        if ( status === "success" ) {
            setBloks( data.bloks )
            setTotalBloksCount( data.totalBloks )
        } else {
            setBloks("error")
        }
    }

    async function confirmBlokDeletion( id ) {
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

        async function handleDelete() {
            hideDialog( dialogId )

            const { status, error } = await deleteBlok( id )

            if ( status === "success" ) {
                setBloks( ( prevBloks ) => prevBloks.filter( ( blok ) => blok.id !== id ) )
                setTotalBloksCount( totalBloksCount - 1 )

                showToast({
                    type: "success",
                    message: `The ${ name } Blok has successfully been deleted`
                })
            } else {
                showToast({
                    type: "error",
                    message: `Error deleting ${ name } Blok: ${ error.message }`
                })
            }
        }
    }

    async function handleBlokRename( e ) {
        e.preventDefault()

        const { status, error } = await updateBlok( renameBlokDetails.id, {
            name: renameBlokDetails.name
        } )

        if ( status === "success" ) {
            showToast({
                type: "success",
                message: "Blok renamed successfully"
            })

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
            showToast({
                type: "error",
                message: `Error renaming Blok: ${ error.message }`
            })
        }

        setRenameBlokDetails({
            id: "",
            name: ""
        })
        setIsRenameDialogOpen( false )
    }

    function promptBlokRename( id, name ) {
        setRenameBlokDetails({
            id,
            name
        })

        setIsRenameDialogOpen( true )
    }

    return (
        <>
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
                        <Dialog.Title className="hidden"></Dialog.Title>
                        <Dialog.Description className="hidden"></Dialog.Description>

                        <Logo className='dashboard--header__menu-logo' />

                        <SearchInput 
                            value={ filter }
                            onChange={ ( e ) => setFilter( e.target.value ) }
                        />

                        <div 
                            className="
                                dashboard--header__menu-blok-list
                                flex-grow
                                overflow-auto
                                text-gray-900 dark:text-white
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
                                        gap-3
                                        items-center
                                    "
                                >
                                    <FaSpinner 
                                        className='
                                            text-xl
                                            animate-spin
                                        '
                                    />
        
                                    <span 
                                        className="
                                            dashboard--blok-list-ctn__loading-text
                                            w-4/5
                                            inline-block
                                            text-center
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
                                        gap-3
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
                                            text-center
                                            inline-block
                                            w-4/5
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
                                        gap-3
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
                                            capitalize
                                            text-center
                                            inline-block
                                            w-[80%]
                                        "
                                    >
                                        { 
                                            filter === "" ? 
                                            "You have not created any bloks yet" : 
                                            `There were no bloks matching that search term "${ filter }"`
                                        }
                                    </span>
        
                                </div> 
                            }
        
                            { 
                                ( 
                                    bloks !== "loading" && 
                                    bloks !== "error" && 
                                    bloks.length != 0 
                                ) &&
                                <>
                                    { ( bloks !== "loading" && bloks !== "error" ) && 
                                        bloks.map(
                                            function( blok ) {
                                                return (
                                                    <NavMenuBlok 
                                                        key={ blok.id }
                                                        name={ blok.name } 
                                                        confirmBlokDeletion={ () => confirmBlokDeletion( blok.id ) }
                                                        promptBlokRename={ () => promptBlokRename( blok.id, blok.name )}
                                                    />
                                                )
                                            }
                                        ) 
                                    }
                                </>
                            }
                        </div>

                        {
                            ( 
                                bloks !== 'loading' &&
                                bloks !== "error" && 
                                limit > totalBloksCount &&
                                totalBloksCount > defaultLimit
                            ) 
                            && 
                            <button 
                                className="
                                    dashboard--header__load-more-btn
                                    text-blue-600 dark:text-blue-400
                                    underline
                                    mb-8
                                "
                                onClick={ loadMoreBloks }
                            >
                                load more
                            </button>
                        }

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
                            onClick={ () => navigateTo("/create") }
                        >
                            <FaPlus/>

                            <span>
                                add new blok
                            </span>
                        </Button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

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
