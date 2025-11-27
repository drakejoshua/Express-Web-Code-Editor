// import route dependencies
import {
    FaArrowRightLong,
    FaArrowRotateLeft,
    FaArrowUpRightFromSquare,
    FaBan,
    FaCheck, 
    FaChevronDown, 
    FaCode, 
    FaCompress, 
    FaCopy, 
    FaDesktop, 
    FaDownload, 
    FaEnvelope, 
    FaExpand,
    FaFacebook,
    FaGear, 
    FaLink, 
    FaLinkedin, 
    FaMoon, 
    FaPencil, 
    FaRegSun, 
    FaRotateLeft, 
    FaShareNodes, 
    FaSpinner, 
    FaTriangleExclamation, 
    FaWhatsapp, 
    FaX, 
    FaXmark
} from "react-icons/fa6";
import NavMenu from "../components/NavMenu";
import WideLayout from "../components/WideLayout";
import { DropdownMenu, Form, Popover, Tabs } from "radix-ui";
import Button from "../components/Button";
import DropdownContent from "../components/DropdownContent";
import NavAvatar from "../components/NavAvatar";
import ToggleOption from "../components/ToggleOption";
import { TbLayoutNavbar, TbLayoutSidebar, TbLayoutSidebarRight } from "react-icons/tb";
import SwitchOption from "../components/SwitchOption";
import SelectOption from "../components/SelectOption";
import { editorThemes, generateIframeContent } from "../utils/editor_utils";
import RangeOption from "../components/RangeOption";
import MonacoEditor from "@monaco-editor/react";
import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import { useThemeProvider } from "../providers/ThemeProvider";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useNavigate, useParams } from "react-router-dom";
import RouteContainer from "../components/RouteContainer";
import { useBlokProvider } from "../providers/BlokProvider";
import { DialogComponent } from "../providers/DialogProvider";
import { useToastProvider } from "../providers/ToastProvider";
import TextField from "../components/TextField";
import { useHotkeys } from 'react-hotkeys-hook'
import { Helmet } from "react-helmet-async";


// create editor context to share editor settings and controls across 
// editor sub-components
const EditorContext = createContext()

export default function Editor() {
    // get the theme and toggleTheme function from ThemeProvider
    const { theme, toggleTheme } = useThemeProvider() 

    // state to manage mobile breakpoint
    const [ mobileBreakpoint, setMobileBreakpoint ] = useState( window.innerWidth <= 1024 )

    // state to manage loading state and errors
    const [ loadingState, setLoadingState ] = useState("loading")
    const [ loadingError, setLoadingError ] = useState("")

    // get blok id from route params
    const { id } = useParams()

    // get blok functions from BlokProvider
    const {
        getBlok,
        updateBlok
    } = useBlokProvider()

    // get showToast function from ToastProvider
    const { showToast } = useToastProvider()

    // state to manage rename dialog visibility and new blok name
    const [ isRenameDialogOpen, setIsRenameDialogOpen ] = useState( false )
    const [ newBlokName, setNewBlokName ] = useState( "" )

    // state to manage shortcuts dialog visibility
    const [ isShortcutsDialogOpen, setIsShortcutsDialogOpen ] = useState( false )

    // state to manage share dialog visibility
    const [ isShareDialogOpen, setIsShareDialogOpen ] = useState( false )

    // state to manage blok name for display in editor header
    const [ blokName, setBlokName ] = useState("loading")

    // share options for share dialog
    const shareOptions = [
        {
            text: "link",
            icon: FaLink
        },
        {
            text: "embed",
            icon: FaCode
        },
        {
            text: "facebook",
            icon: FaFacebook
        },
        {
            text: "x",
            icon: FaX
        },
        {
            text: "linkedin",
            icon: FaLinkedin
        },
        {
            text: "whatsapp",
            icon: FaWhatsapp
        },
        {
            text: "email",
            icon: FaEnvelope
        },
    ]

    // get navigate function from react-router to navigate programmatically
    const navigateTo = useNavigate()

    // state to manage editor content from the three editors
    const [ editorContent, setEditorContent ] = useState( {
        html: "",
        css: "",
        js: ""
    } )

    // state to manage preview content for displaying in iframe
    const [ previewContent, setPreviewContent ] = useState({
        html: "",
        css: "",
        js: ""
    })

    // ref to manage autoRun timeout
    let autoRunTimeout = useRef( null )

    // state to manage editor settings
    const [ editorSettings, setEditorSettings ] = useState( { 
        focusMode: false,
        layout: "editor_top",
        editors: ["html", "css", "js"],
        fontSize: 16,
        tabSize: '2',
        lineNumbers: true,
        autocomplete: true,
        theme: theme == "dark" ? "vs-dark" : "vs",
        autoRun: false,
        isTabPreviewVisible: false,
    } )

    // ref to manage tab preview broadcast channel
    let tabPreviewChannelRef = useRef( null )

    // ref to manage preview channel timeout
    let previewChannelTimeout = useRef( null )
    
    // ref to manage editor save timeout when saving to backend
    let editorSaveTimeoutRef = useRef( null )

    // ref to manage render count for skipping initial effects
    const renderCount = useRef( 0 )

    // predefined editor shortcuts for display in shortcuts dialog
    const editorShortcuts = [
        {
            keys: "Alt+Shift+H",
            label: "Toggle HTML Editor"
        },
        {
            keys: "Alt+Shift+C",
            label: "Toggle CSS Editor"
        },
        {
            keys: "Alt+Shift+J",
            label: "Toggle JS Editor"
        },
        {
            keys: "Alt+Shift+R",
            label: "Run Editor Code"
        },
        {
            keys: "Ctrl+Alt+R",
            label: "Toggle AutoRun"
        },
        {
            keys: "Alt+Shift+E",
            label: "Export as .ZIP"
        },
        {
            keys: "Alt+Shift+P",
            label: "Toggle Tab Preview"
        },
        {
            keys: "Alt+Shift+1",
            label: "Editor Left Layout"
        },
        {
            keys: "Alt+Shift+2",
            label: "Editor Top Layout"
        },
        {
            keys: "Alt+Shift+3",
            label: "Editor Right Layout"
        },
        {
            keys: "Ctrl+Alt+F",
            label: "Toggle Focus Mode"
        },
        {
            keys: "Ctrl+Alt+I",
            label: "Increase Font Size"
        },
        {
            keys: "Ctrl+Alt+D",
            label: "Decrease Font Size"
        },
        {
            keys: "Ctrl+Alt+L",
            label: "Toggle Line Numbers"
        }
    ]



    // editor keybindings/shortcuts

    // toggle editors
    useHotkeys('alt+shift+h', function() {
           toggleHTMLEditor()
        },
        { enableOnFormTags: true }
    )
    useHotkeys('alt+shift+c', function() {
            toggleCSSEditor()
        },
        { enableOnFormTags: true }
    )
    useHotkeys('alt+shift+j', function() {
            toggleJSEditor()
        },
        { enableOnFormTags: true }
    )

    // run and export actions
    useHotkeys('alt+shift+e', function() {
            exportAsZip()
        },
        { enableOnFormTags: true }
    )
    useHotkeys('alt+shift+r', function() {
            runEditorCode()
        },
        { enableOnFormTags: true }
    )
    useHotkeys('alt+shift+p', function() {
            toggleTabPreviewVisibility()
        },
        { enableOnFormTags: true }
    )
    useHotkeys('ctrl+alt+r', function() {
            toggleEditorAutoRunCode()
        },
        { enableOnFormTags: true }
    )

    // editor layout actions
    useHotkeys('alt+shift+1', function() {
            changeEditorLayout("editor_left")
        },
        { enableOnFormTags: true }
    )
    useHotkeys('alt+shift+2', function() {
            changeEditorLayout("editor_top")
        },
        { enableOnFormTags: true }
    )
    useHotkeys('alt+shift+3', function() {
            changeEditorLayout("editor_right")
        },
        { enableOnFormTags: true }
    )
    useHotkeys('ctrl+alt+f', function() {
            toggleFocusMode()
        },
        { enableOnFormTags: true }
    )

    // editor internals action
    useHotkeys('ctrl+alt+i', function() {
            changeEditorFontSize( editorSettings.fontSize + 1 )
        },
        { enableOnFormTags: true }
    )
    useHotkeys('ctrl+alt+d', function() {
            changeEditorFontSize( editorSettings.fontSize - 1 )
        },
        { enableOnFormTags: true }
    )
    useHotkeys('ctrl+alt+l', function() {
            toggleLineNumbers()
        },
        { enableOnFormTags: true }
    )



    // editor controllers

    // fetchBlokToBeEdited() - fetches blok data from backend to be edited
    // on editor load and when blok id changes
    async function fetchBlokToBeEdited() {
        // set loading state to loading and clear previous errors
        setLoadingState("loading")
        setLoadingError("")

        // validate blok id, if not found set error state
        if ( !id ) {
            setLoadingState("error")
            setLoadingError("Invalid blok id found in request. Please go to dashboard and try again")
        }

        // fetch blok data from backend
        const { status, error, data } = await getBlok( id )

        if ( status === "success" ) {
            // since blok fetch is successful, set editor content and settings 
            // from fetched blok data
            setLoadingState("loaded")

            setBlokName( data.blok.name )

            setEditorContent({
                html: data.blok.html,
                css: data.blok.css,
                js: data.blok.js
            })

            setEditorSettings({
                ...editorSettings,
                theme: data.blok.settings.theme,
                tabSize: data.blok.settings.tab_size.toString(),
                fontSize: data.blok.settings.font_size,
                autocomplete: data.blok.settings.auto_complete,
                layout: data.blok.settings.editor_layout,
            })
        } else {
            // if blok fetch fails, set error state with error message
            setLoadingState("error")
            setLoadingError( error.message )
        }
    }

    // handleBreakpointResize() - updates mobile breakpoint state based on window width
    function handleBreakpointResize() {
        setMobileBreakpoint( window.innerWidth <= 1024 )
    }

    // initializeEditorThemes() - initializes custom editor themes in monaco editor
    function initializeEditorThemes( monaco ) {
        // omit default themes from initialization
        const themeValueToOmit = [ "vs", "vs-dark", "hc-black", "hc-light" ]

        // define each custom theme in monaco editor by iterating over editorThemes
        // and omitting default themes
        editorThemes.forEach( function( theme ) {
            if ( themeValueToOmit.includes( theme.value ) ) {
                return
            } else {
                monaco.editor.defineTheme( theme.value, theme.json )
            }
        })
    }

    // handleFullscreenChange() - updates focusMode setting based on fullscreen state
    function handleFullscreenChange() {
        // check if document is in fullscreen mode
        if ( document.fullscreenElement ) {
            // if in fullscreen, set focusMode to true
            setEditorSettings( ( prev ) => ({ ...prev, focusMode: true }) )
        } else {
            // if not in fullscreen, set focusMode to false
            setEditorSettings( ( prev ) => ({ ...prev, focusMode: false }) )
        }
    }

    // useEffect to add event listeners on component mount and clean up on unmount
    useEffect( function() {
        window.addEventListener( "resize", handleBreakpointResize )

        document.addEventListener( "fullscreenchange", handleFullscreenChange )

        return function() {
            window.removeEventListener( "resize", handleBreakpointResize )

            document.removeEventListener( "fullscreenchange", handleFullscreenChange )

            if ( tabPreviewChannelRef.current ) {
                tabPreviewChannelRef.current.close()
            }
        }
    }, [])

    // useEffect to fetch blok to be edited on component mount and when blok id changes
    useEffect( function() {
        fetchBlokToBeEdited()
    }, [id])
    
    // toggleFocusMode() - toggles focus mode by entering/exiting fullscreen
    function toggleFocusMode() {
        // check current focusMode setting and enter/exit fullscreen accordingly
        if ( !editorSettings.focusMode ) {
            // enter fullscreen
            document.body.requestFullscreen()
        } else {
            // exit fullscreen
            document.exitFullscreen()
        }
    }

    // toggleHTMLEditor() - toggles visibility of HTML editor
    function toggleHTMLEditor() {
        // check if there's at least one editor visible
        if ( editorSettings.editors.length > 0 ) {
            // toggle HTML editor visibility by adding/removing it from editors array
            if ( editorSettings.editors.includes("html") ) {
                // if HTML editor is visible, remove it from editors array
                setEditorSettings( ( prevEditorSettings ) => ({ 
                    ...prevEditorSettings,
                    editors: prevEditorSettings.editors.filter( function( editor ) {
                        return editor != "html"
                    })
                }))
            } else {
                // if HTML editor is not visible, add it to editors array
                setEditorSettings( ( prevEditorSettings ) => ({
                    ...prevEditorSettings,
                    editors: [ ...prevEditorSettings.editors, "html" ]
                }))
            }
        }
    }
    
    // toggleCSSEditor() - toggles visibility of CSS editor
    function toggleCSSEditor() {
        // check if there's at least one editor visible
        if ( editorSettings.editors.length > 0 ) {
            // toggle CSS editor visibility by adding/removing it from editors array
            if ( editorSettings.editors.includes("css") ) {
                // if CSS editor is visible, remove it from editors array
                setEditorSettings( ( prevEditorSettings ) => ({ 
                    ...prevEditorSettings,
                    editors: prevEditorSettings.editors.filter( function( editor ) {
                        return editor != "css"
                    })
                }))
            } else {
                // if CSS editor is not visible, add it to editors array
                setEditorSettings( ( prevEditorSettings ) => ({
                    ...prevEditorSettings,
                    editors: [ ...prevEditorSettings.editors, "css" ]
                }))
            }
        }
    }
    
    // toggleJSEditor() - toggles visibility of JS editor
    function toggleJSEditor() {
        // check if there's at least one editor visible
        if ( editorSettings.editors.length > 0 ) {
            // toggle JS editor visibility by adding/removing it from editors array
            if ( editorSettings.editors.includes("js") ) {
                // if JS editor is visible, remove it from editors array
                setEditorSettings( ( prevEditorSettings ) => ({ 
                    ...prevEditorSettings,
                    editors: prevEditorSettings.editors.filter( function( editor ) {
                        return editor != "js"
                    })
                }))
            } else {
                // if JS editor is not visible, add it to editors array
                setEditorSettings( ( prevEditorSettings ) => ({
                    ...prevEditorSettings,
                    editors: [ ...prevEditorSettings.editors, "js" ]
                }))
            }
        }
    }

    // changeActiveEditors() - changes the active editors based on provided array
    function changeActiveEditors( editors ) {
        // update editors in editor settings if not in mobile breakpoint( i.e. only on desktop )
        if ( editors.length > 0 && !mobileBreakpoint ) {
            setEditorSettings( ( prevEditorSettings ) => ({
                ...prevEditorSettings,
                editors: editors
            }))
        }
    }

    // changeEditorLayout() - changes the editor layout based on provided layout value
    function changeEditorLayout( layout ) {
        // define allowable editor layout values
        const allowableEditorLayouts = [ "editor_top", "editor_left", "editor_right" ]

        // update layout in editor settings if layout is valid and not in mobile breakpoint (i.e. only on desktop )
        if ( allowableEditorLayouts.includes( layout ) && !mobileBreakpoint ) {
            setEditorSettings( function( prev ) {
                return { ...prev, layout }
            } )
        }
    }

    // changeEditorFontSize() - changes the editor font size based on provided font size value
    function changeEditorFontSize( fontSize ) {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            fontSize: fontSize
        }))
    }

    // changeTabSize() - changes the editor tab size based on provided tab size value
    function changeTabSize( tabSize ) {
        // define allowable tab size values
        const allowableTabSizes = [ "2", "4", "6" ]

        // update tab size in editor settings if tab size is valid
        if ( allowableTabSizes.includes( tabSize ) ) {
            setEditorSettings( ( prevEditorSettings ) => ({
                ...prevEditorSettings,
                tabSize: tabSize
            }))
        }
    }

    // toggleLineNumbers() - toggles line numbers visibility in editors
    function toggleLineNumbers() {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            lineNumbers: !prevEditorSettings.lineNumbers
        }))
    }

    // toggleAutocomplete() - toggles autocomplete functionality in editors
    function toggleAutocomplete() {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            autocomplete: !prevEditorSettings.autocomplete
        }))
    }

    // changeTheme() - changes the editor theme based on provided theme value
    function changeTheme( value ) {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            theme: value
        }))
    }

    // runEditorCode() - sets the preview content to current editor content
    function runEditorCode() {
        setPreviewContent({ ...editorContent })
    }

    // toggleEditorAutoRunCode() - toggles autorun setting in editor settings
    function toggleEditorAutoRunCode() { 
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            autoRun: !prevEditorSettings.autoRun
        }))
    }

    // toggleTabPreviewVisibility() - toggles tab preview visibility, opens/closes preview tab window
    // and manages broadcast channel for multi-tab communication
    function toggleTabPreviewVisibility() {
        // get frontend url from environment variables or use default localhost url
        const frontendURL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"

        // check if tab preview is currently not visible
        if ( editorSettings.isTabPreviewVisible == false ) {
            // open new tab for preview and setup broadcast channel for communication
            tabPreviewChannelRef.current = new BroadcastChannel("tab_preview_channel")

            // setup onmessage handler to respond to content requests from preview tab
            tabPreviewChannelRef.current.onmessage = function( event ) {
                if ( event.data.type == "Request_Editor_Content" ) {
                    tabPreviewChannelRef.current.postMessage({
                        type: "Request_Editor_Content",
                        payload: editorContent
                    })
                }
            }

            // open preview tab window
            window.open(`${ frontendURL }/preview`, "_blank")
        } else {
            // close the broadcast channel if tab preview is being hidden
            if ( tabPreviewChannelRef.current ) {
                tabPreviewChannelRef.current.close()
            }
        }

        // toggle isTabPreviewVisible setting in editor settings
        setEditorSettings( function( prevEditorSettings ) {
            return {
                ...prevEditorSettings,
                isTabPreviewVisible: !prevEditorSettings.isTabPreviewVisible
            }
        })
    }

    // useEffect to handle autoRun, tab preview updates, and saving editor to backend
    useEffect( function() {
        // handle autorun functionality
        if ( editorSettings.autoRun ) {
            // clear previous autorun timeout if exists
            if ( autoRunTimeout.current ) {
                clearTimeout( autoRunTimeout.current )
            }

            // set new autorun timeout to run editor code after 300ms of inactivity/typing
            autoRunTimeout.current = setTimeout( function() {
                runEditorCode()
            }, 300 )
        }

        // handle tab preview content updates
        if ( editorSettings.isTabPreviewVisible ) {
            // clear previous preview channel timeout if exists
            if ( previewChannelTimeout.current ) {
                clearTimeout( previewChannelTimeout.current )
            }

            // set new timeout to send updated editor content to preview tab after 300ms of inactivity/typing
            previewChannelTimeout.current = setTimeout( function() {
                if ( tabPreviewChannelRef.current ) {
                    tabPreviewChannelRef.current.postMessage({
                        type: "Preview_Content",
                        payload: editorContent
                    })
                }
            }, 300 )
        }

        // handle saving editor content to backend, skip initial renders
        if ( renderCount.current > 2 ) {
            // clear previous editor save timeout if exists
            if ( editorSaveTimeoutRef.current ) {
                clearTimeout( editorSaveTimeoutRef.current )
            }
    
            // set new timeout to save editor content to backend after 1 second of inactivity/typing
            editorSaveTimeoutRef.current = setTimeout( saveEditorToBackend, 1000 )
        } else {
            // increment render count to skip initial renders
            renderCount.current += 1
        }

        // cleanup function to clear all timeouts on unmount or before next effect run
        return function() {
            clearTimeout(autoRunTimeout.current);
            clearTimeout(previewChannelTimeout.current);
            clearTimeout(editorSaveTimeoutRef.current);
        }
    }, [ editorContent ])

    // useEffect to handle saving editor settings to backend
    useEffect( function() {
        // handle saving editor settings to backend, skip initial renders
        if ( renderCount.current > 2 ) {
            // clear previous editor save timeout if exists
            if ( editorSaveTimeoutRef.current ) {
                clearTimeout( editorSaveTimeoutRef.current )
            }
    
            // set new timeout to save editor settings to backend after 1 second of inactivity/typing
            editorSaveTimeoutRef.current = setTimeout( saveEditorToBackend, 1000 )
        } else {
            // increment render count to skip initial renders
            renderCount.current += 1
        }

        // cleanup function to clear editor settings save timeout on unmount or before next effect run
        return function() {
            clearTimeout(editorSaveTimeoutRef.current);
        }
    }, [ editorSettings ])

    // exportAsZip() - exports current editor content as a ZIP file using JSZip
    async function exportAsZip() {
        // create new JSZip instance
        const zip = JSZip()

        // define HTML template for export with embedded editor content
        const htmlTemplateToExport = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Codeblok Export</title>
                    
                    <!-- css file -->
                    <link rel="stylesheet" href="./styles.css" />
                </head>
                <body>
                    ${ editorContent.html }

                    <!-- script file -->
                    <script src="./script.js"></script>
                </body>
            </html>
        `

        // add content to files and files to zip
        zip.file( "index.html", htmlTemplateToExport )
        zip.file( "styles.css", editorContent.css )
        zip.file( "script.js", editorContent.js )

        // generate zip blob and trigger download using file-saver
        const blob = await zip.generateAsync({ type: "blob" })
        saveAs( blob, "codeblok.zip" )
    }

    // handleBlokRename() - handles renaming the current blok
    async function handleBlokRename( e ) {
        // prevent default form submission behavior
        e.preventDefault()

        // update blok name in backend
        const { status, error } = await updateBlok( id, {
            name: newBlokName
        } )


        if ( status === "success" ) {
            // show success toast notification
            showToast({
                type: "success",
                message: "Blok renamed successfully"
            })

            // update blok name in state for display
            setBlokName( newBlokName )
        } else {
            // show error toast notification
            showToast({
                type: "error",
                message: `Error renaming Blok: ${ error.message }`
            })
        }

        // reset rename dialog state and new blok name
        setNewBlokName("")
        setIsRenameDialogOpen( false )
    }

    // promptBlokRename() - handles showing rename dialog with current blok name
    function promptBlokRename() {
        setNewBlokName( blokName )

        setIsRenameDialogOpen( true )
    }

    // saveEditorToBackend() - saves current editor content and settings to backend
    async function saveEditorToBackend() {
        // update blok in backend with current editor content and settings
        const { status, error } = await updateBlok( id, {
            name: blokName,
            html: editorContent.html,
            css: editorContent.css,
            javascript: editorContent.js,
            settings: {
                theme: editorSettings.theme,
                font_size: editorSettings.fontSize,
                tab_size: editorSettings.tabSize,
                auto_complete: editorSettings.autocomplete,
                editor_layout: editorSettings.layout
            }
        })

        if ( status === "error" ) {
            // show error toast notification with retry action
            showToast({
                type: "error",
                message: `Error saving blok: ${ error.message }`,
                action: saveEditorToBackend,
                actionLabel: "Retry"
            })
        }
    }

    // handleSharing() - handles sharing the blok via Web Share API or share dialog
    function handleSharing() {
        // construct share link using backend url and blok id
        const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000"
        const shareLink = `${ backendURL }/share/#/${ id }`

        // use Web Share API if available and on mobile breakpoint, else open share dialog
        if ( navigator.share && mobileBreakpoint ) {
            // use Web Share API to share blok link on mobile devices
            navigator.share({
                text: "Hey! Check out this code on CodeBloks",
                url: shareLink
            })
        } else {
            // open share dialog for desktop sharing options
            setIsShareDialogOpen( true )
        }
    }


    switch( loadingState ) {
        // render loading state
        case "loading":
            return (
                <>
                    {/* Add page metadata using React Helmet */}
                    <Helmet>
                        <title>Edit Blok - CodeBloks</title>
                        <meta name="description" content="Edit your code blok using the online code editor" />
                    </Helmet>

                    <div 
                        className="
                            h-screen
                            text-black dark:text-white
                            bg-white dark:bg-gray-800
                        "
                    >
                        <RouteContainer
                            className="
                                gap-4
                                flex-row
                            "
                        >
                            <FaSpinner className="text-3xl animate-spin"/>

                            <p className="text-center">
                                The editor is loading. Please wait...
                            </p>
                        </RouteContainer>
                    </div>
                </>
            )
        
        // render error state
        case "error":
            return (
                <>
                    {/* Add page metadata using React Helmet */}
                    <Helmet>
                        <title>Edit Blok - CodeBloks</title>
                        <meta name="description" content="Edit your code blok using the online code editor" />
                    </Helmet>


                    <div 
                        className="
                            h-screen
                            text-black dark:text-white
                            bg-white dark:bg-gray-800
                        "
                    >
                        <RouteContainer
                            className="
                                gap-4
                            "
                        >
                            <FaTriangleExclamation className="text-3xl"/>

                            <p className="text-center">
                                There was an error loading the editor. Error: { loadingError }
                            </p>

                            <Button
                                className="
                                    capitalize
                                "
                                onClick={ 
                                    id ?
                                    fetchBlokToBeEdited :
                                    navigateTo("/dashboard")
                                }
                            >
                                <FaArrowRotateLeft/>

                                <span>
                                    retry
                                </span>
                            </Button>
                        </RouteContainer>
                    </div>
                </>
            )

        // render loaded state
        case "loaded":
            return (
                <>
                    {/* Editor content */}
                    <EditorContext.Provider value={ {
                        editorSettings,
                        mobileBreakpoint,
                        changeEditorLayout,
                        changeActiveEditors,
                        toggleFocusMode,
                        changeTheme,
                        changeEditorFontSize,
                        changeTabSize,
                        toggleAutocomplete,
                        toggleLineNumbers,
                        initializeEditorThemes,
                        toggleTabPreviewVisibility,
                        exportAsZip,
                        setIsShortcutsDialogOpen,
                        handleSharing
                    } }>
                        <>
                            {/* Add page metadata using React Helmet */}
                            <Helmet>
                                <title>Edit Blok - CodeBloks</title>
                                <meta name="description" content="Edit your code blok using the online code editor" />
                            </Helmet>


                            {/* Editor main layout */}
                            <WideLayout>
                                <div 
                                    className="
                                        editor
                                        flex
                                        flex-col
                                        h-full
                                        pb-8
                                    "
                                >
                                    {/* editor header */}
                                    <div 
                                        className="
                                            editor--header
                                            py-3
                                            flex
                                            items-center
                                        "
                                    >
                                        {/* Editor navigation menu */}
                                        <NavMenu />
                
                                        {/* Editor blok name and rename button */}
                                        <span 
                                            className="
                                                editor--header__name-ctn
                                                items-center
                                                gap-3
                                                ml-4
                                                hidden md:flex
                                            "
                                        >
                                            <span 
                                                className="
                                                    editor--header__blok-name
                                                    text-xl
                                                    font-medium
                                                    font-mono
                                                "
                                            >
                                                { blokName }
                                            </span>
                
                                            <button 
                                                className="
                                                    editor--header__rename-btn
                                                    text-gray-500 dark:text-gray-300
                                                "
                                                onClick={ promptBlokRename }
                                            >
                                                <FaPencil/>
                                            </button>
                                        </span>
                
                                        {/* Editor header actions container */}
                                        <div 
                                            className="
                                                editor--header__actions-ctn
                                                ml-auto
                                                flex
                                                gap-2 md:gap-4 
                                                items-center
                
                                                [&>button]:p-3
                                                [&>button]:bg-gray-300 [&>button]:dark:bg-gray-600
                                                [&>button]:text-xl
                                                [&>button]:dark:text-white
                                                [&>button]:rounded-md
                                            "
                                        >
                                            {/* Editor run code and other options dropdown menu */}
                                            <DropdownMenu.Root>
                                                <div
                                                    className="
                                                        flex
                                                        gap-0.5
                                                    "
                                                >
                                                    <Button
                                                        className="
                                                            rounded-r-none
                                                            capitalize
                                                        "
                                                        onClick={ runEditorCode }
                                                    >
                                                        run
                                                    </Button>
                                                    <DropdownMenu.Trigger asChild>
                                                        <Button
                                                            className="
                                                                rounded-l-none
                                                            "
                                                        >
                                                            <FaChevronDown/>
                                                        </Button>
                                                    </DropdownMenu.Trigger>
                                                </div>
                
                                                <DropdownContent 
                                                    label="run options"
                                                    className="
                                                        z-1
                                                    "
                                                    options={[
                                                        {
                                                            action: toggleEditorAutoRunCode,
                                                            content: <>
                                                                { editorSettings.autoRun && <FaCheck/> }
                                                                { editorSettings.autoRun == false && <FaRotateLeft/> }
                
                                                                <span>
                                                                    autorun
                                                                </span>
                                                            </>
                                                        },
                                                        {
                                                            action: exportAsZip,
                                                            content: <>
                                                                <FaDownload/>
                
                                                                <span>
                                                                    export as .ZIP
                                                                </span>
                                                            </>
                                                        },
                                                        {
                                                            action: toggleTabPreviewVisibility,
                                                            content: <>
                                                                { editorSettings.isTabPreviewVisible ? <FaBan/> : <FaDesktop/> }
                
                                                                <span>
                                                                    { editorSettings.isTabPreviewVisible ? <>previewing... </> : <>preview </> }
                                                                </span>
                                                            </>
                                                        },
                                                    ]}
                                                />
                                            </DropdownMenu.Root>
                
                                            {/* Editor fullscreen/focus mode toggle button */}
                                            <button 
                                                className="
                                                    editor--header__fullscreen-btn
                                                    p-3
                                                    bg-gray-100
                                                    text-xl
                                                    rounded-md
                                                    hidden md:block
                                                "
                                                onClick={ toggleFocusMode }
                                            >
                                                { !editorSettings.focusMode && <FaExpand/> }
                                                { editorSettings.focusMode && <FaCompress/>}
                                            </button>
                
                                            {/* Editor theme toggle button */}
                                            <button 
                                                className="editor--header__theme-toggle"
                                                onClick={ toggleTheme }
                                            >
                                                { theme == "light" && <FaMoon/> }
                                                { theme == "dark" && <FaRegSun/> }
                                            </button>
                
                                            {/* Editor settings popover */}
                                            <EditorSettingsPopover 
                                                className="
                                                    hidden lg:block
                                                "
                                            />
                
                                            {/* User avatar and profile menu */}
                                            <NavAvatar />
                                        </div>
                                    </div>
                
                                    {/* editor desktop content */}
                                    <div 
                                        className={`
                                            editor--main
                                            flex-1
                                            min-h-0
                                            hidden lg:flex
                                            ${ editorSettings.layout == "editor_top" ? "flex-col" : "" }
                                            gap-4
                                        `}
                                    >
                                        {/* editor main editors: html, css, js container */}
                                        <div 
                                            className={`
                                                editor--main__editors-ctn
                                                flex-1
                                                min-h-0
                                                flex
                                                ${ editorSettings.layout == "editor_top" ? "" : "flex-col" }
                                                gap-4
                                                ${ editorSettings.layout != "editor_top" && editorSettings.layout == "editor_right" ? "order-2" : "" }
                                            `}
                                        >
                                            { 
                                                editorSettings.editors.includes("html") && <MainEditor 
                                                    label="html" 
                                                    defaultLanguage="html"
                                                    onToggle={ toggleHTMLEditor }
                                                    className="flex-1 min-h-0"
                                                    value={ editorContent.html }
                                                    onChange={ ( value ) => setEditorContent({ ...editorContent, html: value }) }
                                                />
                                            }
                                            { 
                                                editorSettings.editors.includes("css") && <MainEditor 
                                                    label="css" 
                                                    defaultLanguage="css"
                                                    onToggle={ toggleCSSEditor }
                                                    className="flex-1 min-h-0"
                                                    value={ editorContent.css }
                                                    onChange={ ( value ) => setEditorContent({ ...editorContent, css: value }) }
                                                />
                                            }
                                            {
                                                editorSettings.editors.includes("js") && <MainEditor 
                                                    label="js" 
                                                    defaultLanguage="javascript"
                                                    onToggle={ toggleJSEditor }
                                                    className="flex-1 min-h-0"
                                                    value={ editorContent.js }
                                                    onChange={ ( value ) => setEditorContent({ ...editorContent, js: value }) }
                                                />
                                            }
                                        </div>
                                        
                                        {/* preview frame container */}
                                        <PreviewFrame 
                                            srcDoc={ generateIframeContent( 
                                                previewContent.html,
                                                previewContent.css,
                                                previewContent.js,
                                                theme
                                            )}
                                            className="
                                                border-2
                                                border-gray-300 dark:border-gray-600
                                                flex-1
                                                min-h-0
                                            "
                                        />
                                    </div>
                
                                    {/* editor non-desktop coontent */}
                                    <Tabs.Root 
                                        className="
                                            editor--mobile-main
                                            flex-1
                                            min-h-0
                                            flex lg:hidden
                                            flex-col
                                            border-2
                                            border-gray-300 dark:border-gray-600
                                            rounded-md
                                            overflow-hidden
                                        " 
                                        defaultValue="html"
                                    >
                                        {/* Editor mobile navigation list */}
                                        <Tabs.List 
                                            className="
                                                editor--mobile-main__tabs
                                                flex
                                                items-center
                                                bg-gray-100 dark:bg-gray-600
                                                w-full
                                                overflow-x-auto
                
                                                *:py-2 *:px-5
                                                *:rounded-t-md
                                                *:data-[state=active]:bg-gray-300 dark:*:data-[state=active]:bg-gray-800
                                            "
                                        >
                                            <Tabs.Trigger value="html">
                                                html
                                            </Tabs.Trigger>
                                            <Tabs.Trigger value="css">
                                                css
                                            </Tabs.Trigger>
                                            <Tabs.Trigger value="js">
                                                js
                                            </Tabs.Trigger>
                                            <Tabs.Trigger value="preview">
                                                preview
                                            </Tabs.Trigger>
                
                                            <EditorSettingsPopover />
                                        </Tabs.List>
                
                                        {/* HTML editor on mobile */}
                                        <Tabs.Content 
                                            value="html"
                                            className="
                                                flex-1
                                                min-h-0
                                            "
                
                                        >
                                            <MobileEditor 
                                                defaultLanguage="html"
                                                value={ editorContent.html }
                                                onChange={ ( value ) => setEditorContent({ ...editorContent, html: value }) }
                                            />
                                        </Tabs.Content>
                
                                        {/* CSS editor on mobile */}
                                        <Tabs.Content 
                                            value="css"
                                            className="
                                                flex-1
                                                min-h-0
                                            "
                
                                        >
                                            <MobileEditor 
                                                defaultLanguage="css"
                                                value={ editorContent.css }
                                                onChange={ ( value ) => setEditorContent({ ...editorContent, css: value }) }
                                            />
                                        </Tabs.Content>
                
                                        {/* JS editor on mobile */}
                                        <Tabs.Content 
                                            value="js"
                                            className="
                                                flex-1
                                                min-h-0
                                            "
                
                                        >
                                            <MobileEditor 
                                                defaultLanguage="js"
                                                value={ editorContent.js }
                                                onChange={ ( value ) => setEditorContent({ ...editorContent, js: value }) }
                                            />
                                        </Tabs.Content>
                
                                        {/* Preview tab on mobile */}
                                        <Tabs.Content 
                                            value="preview"
                                            className="
                                                flex-1
                                                min-h-0
                                            "
                
                                        >
                                            <PreviewFrame 
                                                srcDoc={ generateIframeContent( 
                                                    editorContent.html,
                                                    editorContent.css,
                                                    editorContent.js,
                                                    theme
                                                )}
                                                className="
                                                    h-full
                                                "
                                            />
                                        </Tabs.Content>
                                    </Tabs.Root>
                                </div>
                            </WideLayout>

                            {/* Rename blok dialog */}
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
                                            value={ newBlokName }
                                            onChange={ ( e ) => setNewBlokName( e.target.value ) }
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
                            
                            {/* Shortcuts dialog */}
                            <DialogComponent
                                open={ isShortcutsDialogOpen }
                                onOpenChange={ setIsShortcutsDialogOpen }
                                title="Editor Shortcuts"
                                description="Below are the keyboard shortcuts to help you navigate and use the editor more efficiently."
                                content={(
                                    <div
                                        className="
                                            shortcuts-dialog__content
                                            mt-4
                                            p-4
                                            pt-2
                                            rounded-md
                                            bg-gray-200 dark:bg-gray-700
                                            overflow-y-auto
                                            max-h-[30vh]
                                        "
                                    >
                                        {
                                            // list all editor shortcuts by mapping through editorShortcuts array
                                            // and rendering each shortcut with its keys and description
                                            editorShortcuts.map( ( shortcut, index ) => (
                                                <div 
                                                    className="
                                                        shortcuts-dialog__shortcut
                                                        border-b-2
                                                        border-gray-600 dark:border-gray-400
                                                        py-4 px-2
                                                        flex
                                                        gap-4
                                                        items-center
                                                        last:border-b-0
                                                    "
                                                    key={ index }
                                                >
                                                    <span 
                                                        className="
                                                            shortcuts-dialog__keys
                                                            p-1.5 px-4
                                                            rounded-md
                                                            bg-gray-600 dark:bg-gray-400
                                                            inline-block
                                                            text-white
                                                            font-mono
                                                            font-medium
                                                            text-sm
                                                        "
                                                    >
                                                        { shortcut.keys }
                                                    </span>

                                                    <span 
                                                        className="
                                                            shortcuts-dialog__description
                                                            inline-block
                                                            capitalize
                                                            dark:text-white
                                                        "
                                                    >
                                                        { shortcut.label }
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            />
                            
                            {/* Share blok dialog */}
                            <DialogComponent
                                open={ isShareDialogOpen }
                                onOpenChange={ setIsShareDialogOpen }
                                title="Share Blok"
                                description="Share your blok with others using the link/code below."
                                content={(
                                    <Tabs.Root
                                        className="
                                            share-dialog--tabs
                                            mt-4
                                            flex
                                            flex-col
                                            gap-3
                                            bg-gray-200 dark:bg-gray-700
                                            rounded-md
                                            p-3
                                        "
                                        defaultValue="link"
                                    >
                                        {/* Share options tabs list */}
                                        <Tabs.List
                                            className="
                                                share-dialog--tabs__list
                                                flex
                                                items-center
                                                w-full
                                                overflow-x-auto
                                                [scrollbar-width:none]

                                                [&_.share-dialog--tabs\_\_trigger]:flex
                                                [&_.share-dialog--tabs\_\_trigger]:items-center
                                                [&_.share-dialog--tabs\_\_trigger]:gap-2
                                                [&_.share-dialog--tabs\_\_trigger]:p-2 
                                                [&_.share-dialog--tabs\_\_trigger]:px-3
                                                [&_.share-dialog--tabs\_\_trigger]:rounded-md
                                                [&_.share-dialog--tabs\_\_trigger]:text-gray-900
                                                dark:[&_.share-dialog--tabs\_\_trigger]:text-white
                                                [&_.share-dialog--tabs\_\_trigger]:data-[state='active']:bg-gray-600
                                                dark:[&_.share-dialog--tabs\_\_trigger]:data-[state='active']:bg-gray-300
                                                [&_.share-dialog--tabs\_\_trigger]:data-[state='active']:text-white
                                                dark:[&_.share-dialog--tabs\_\_trigger]:data-[state='active']:text-gray-900
                                                
                                                [&_.share-dialog--tabs\_\_trigger-icon]:text-xl

                                                [&_.share-dialog--tabs\_\_trigger-text]:capitalize
                                                [&_.share-dialog--tabs\_\_trigger-text]:font-medium
                                            "
                                        >
                                            {
                                                // map through shareOptions array to render each share option as a tab trigger
                                                shareOptions.map( function ( Option, index ) {
                                                    const Icon = Option.icon

                                                    return (
                                                        <Tabs.Trigger 
                                                            key={index}
                                                            value={ Option.text }
                                                            className="
                                                                share-dialog--tabs__trigger
                                                            "
                                                        >
                                                            <Icon className="share-dialog--tabs__trigger-icon"/>

                                                            <span className="share-dialog--tabs__trigger-text">
                                                                { Option.text }
                                                            </span>
                                                        </Tabs.Trigger>
                                                    )
                                                })
                                            }
                                        </Tabs.List>

                                        {
                                            // map through shareOptions array to render each share option content
                                            // using ShareTabContent component for their link and action buttons
                                            shareOptions.map( function( option, index ) {
                                                return (
                                                    <ShareTabContent
                                                        key={ index }
                                                        value={ option.text }
                                                        blokId={ id }
                                                    />
                                                )
                                            })
                                        }
                                    </Tabs.Root>
                                )}
                            />
                        </>
                    </EditorContext.Provider>
                </>
            )
    }
}


// internal/partial components to be used inside Editor component

// editor settings popover component - for changing editor settings like 
// theme, font size, tab size, etc.
function EditorSettingsPopover({ 
    className,
}) {
    const {
        editorSettings,
        mobileBreakpoint,
        changeEditorLayout,
        changeActiveEditors,
        toggleFocusMode,
        changeTheme,
        changeEditorFontSize,
        changeTabSize,
        toggleAutocomplete,
        toggleLineNumbers,
        setIsShortcutsDialogOpen
    } = useContext( EditorContext )

    return <Popover.Root>
        {/* Editor settings popover trigger button */}
        <Popover.Trigger asChild>
            <button className={`editor--header__editor-setting ${className}`}>
                <FaGear/>
            </button>
        </Popover.Trigger>

        <Popover.Portal>
            {/* Editor settings popover content */}
            <Popover.Content 
                className="
                    bg-gray-100 dark:bg-gray-800
                    *:text-black *:dark:text-white
                    rounded-md
                    p-4
                    overflow-auto
                    max-h-[70vh]
                    max-w-[90vw]
                "
                align="end"
                sideOffset={8}
            >
                {/* popover content */}
                <span 
                    className="
                        editor-settings__popover-content
                        uppercase
                        text-sm
                        font-medium
                        mb-4
                        inline-block
                    "
                >
                    editor settings
                </span>

                {/* Editor layout toggle option */}
                { !mobileBreakpoint && <ToggleOption
                    label="Layout"
                    value={ editorSettings.layout }
                    className="
                        mb-2
                    "
                    onValueChange={ changeEditorLayout }
                    options={[
                        {
                            value: "editor_top",
                            content: <TbLayoutNavbar className='text-2xl mx-auto'/>
                        },
                        {
                            value: "editor_left",
                            content: <TbLayoutSidebar className='text-2xl mx-auto'/>
                        },
                        {
                            value: "editor_right",
                            content: <TbLayoutSidebarRight className='text-2xl mx-auto'/>
                        },
                    ]}
                />}

                {/* Active code editors toggle option */}
                { !mobileBreakpoint && <ToggleOption
                    label="Toggle Code"
                    value={ editorSettings.editors }
                    onValueChange={ changeActiveEditors }
                    type="multiple"
                    className="
                        mb-4
                    "
                    options={[
                        {
                            value: "html",
                            content: <div className="flex items-center justify-center py-2">
                                { editorSettings.editors.includes("html") && <FaCheck className='text-2xl'/> }
                                <span className="ml-2 uppercase">html</span>
                            </div>
                        },
                        {
                            value: "css",
                            content: <div className="flex items- justify-center py-2">
                                { editorSettings.editors.includes("css") && <FaCheck className='text-2xl'/> }
                                <span className="ml-2 uppercase">css</span>
                            </div>
                        },
                        {
                            value: "js",
                            content: <div className="flex items-center justify-center py-2">
                                { editorSettings.editors.includes("js") && <FaCheck className='text-2xl'/> }
                                <span className="ml-2 uppercase">js</span>
                            </div>
                        },
                    ]}
                />}

                {/* Focus mode switch option */}
                <SwitchOption
                    className="
                        flex-row
                        justify-between
                        mb-2
                    "
                    label="Focus Mode"
                    checked={ editorSettings.focusMode }
                    onCheckedChange={ toggleFocusMode }
                />

                {/* Editor theme select option */}
                <SelectOption
                    label="Editor Theme:"
                    type="grouped"
                    placeholder="Select a theme"
                    className="
                        mb-3
                    "
                    value={ editorSettings.theme}
                    onValueChange={ changeTheme }
                    options={
                        {
                            "light themes": editorThemes.filter(
                                ( theme ) => theme.type == "light"
                            ),
                            "dark themes": editorThemes.filter(
                                ( theme ) => theme.type == "dark"
                            )
                        }
                    }
                />

                {/* Editor font size range option */}
                <RangeOption
                    label="Font Size"
                    unit="px"
                    min={8}
                    max={48}
                    step={1}
                    defaultValue={ editorSettings.fontSize }
                    onValueChange={ changeEditorFontSize }
                    className="
                        mb-2
                    "
                />

                {/* Tab size toggle option */}
                <ToggleOption
                    label="Tab Size"
                    value={ editorSettings.tabSize }
                    onValueChange={ changeTabSize }
                    options={[
                        {
                            value: "2",
                            content: "2 spaces"
                        },
                        {
                            value: "4",
                            content: "4 spaces"
                        },
                        {
                            value: "6",
                            content: "6 spaces"
                        },
                    ]}
                    className="
                        mb-3
                    "
                />

                {/* Autocomplete switch option */}
                <SwitchOption
                    className="
                        flex-row
                        justify-between
                        mb-3
                    "
                    checked={ editorSettings.autocomplete }
                    onCheckedChange={ toggleAutocomplete }
                    label="Autocomplete"
                />
                
                {/* Line numbers switch option */}
                <SwitchOption
                    className="
                        flex-row
                        justify-between
                        mb-3
                    "
                    checked={ editorSettings.lineNumbers }
                    onCheckedChange={ toggleLineNumbers }
                    label="Line Number"
                />

                {/* Shortcuts button option */}
                { !mobileBreakpoint && <button 
                    className="
                        shortcut-option
                        w-full
                        flex
                        items-center
                        justify-between
                        cursor-pointer
                    "
                    onClick={ () => setIsShortcutsDialogOpen( true ) }
                >
                    <span 
                        className="
                            shortcut-option__label
                            font-medium
                        "
                    >
                        Shortcuts
                    </span>

                    <FaArrowUpRightFromSquare/>
                </button>}
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
}

// main code editor component - for the code editors in desktop layout
const MainEditor = forwardRef( function( { 
    label, 
    onToggle, 
    className,
    ...props
}, ref ) {
    // get editor settings and initializeEditorThemes function from EditorContext
    const {
        editorSettings,
        initializeEditorThemes
    } = useContext( EditorContext )


    return (
        // main editor container
        <div 
            className={`
                editor--main__editor
                flex
                flex-col
                rounded-md
                overflow-hidden
                ${ className || "" }
            `}
        >
            <div 
                className="
                    editor--main__editor-header
                    bg-gray-300 dark:bg-gray-600
                    flex
                    justify-between
                    items-center
                    py-2 px-4
                "
            >
                {/* editor label - e.g. HTML */}
                <span 
                    className="
                        editor--main__editor-name
                        uppercase
                        font-medium
                    "
                >
                    { label }
                </span>

                {/* editor close button */}
                <FaXmark 
                    className="
                        editor--main__editor-close-btn
                        text-xl
                    "
                    onClick={ onToggle }
                />
            </div>

            {/* monaco instance for rendering the code editor */}
            <MonacoEditor 
                className="
                    editor--main__editor-body
                    flex-grow
                    w-full
                    h-full
                " 
                ref={ref} 
                options={{
                    minimap: { enabled: false },
                    fontSize: editorSettings.fontSize,
                    wordWrap: "off",
                    tabSize: parseInt( editorSettings.tabSize ),
                    lineNumbers: editorSettings.lineNumbers ? "on" : "off",
                    quickSuggestions: editorSettings.autocomplete,
                    suggestOnTriggerCharacters: editorSettings.autocomplete,
                    parameterHints: { enabled: editorSettings.autocomplete },
                    hover: { enabled: editorSettings.autocomplete },
                    wordBasedSuggestions: editorSettings.autocomplete,
                    tabCompletion: editorSettings.autocomplete ? "on" : "off"
                }}
                theme={ editorSettings.theme }
                beforeMount={ initializeEditorThemes }
                { ...props } 
            />
        </div>
    )
})

// mobile code editor component - for the code editors in mobile layout
const MobileEditor = forwardRef( function( props, ref ) {
    // get editor settings and initializeEditorThemes function from EditorContext
    const {
        editorSettings,
        initializeEditorThemes
    } = useContext( EditorContext )

    return (
        // monaco instance for rendering the code editor
        <MonacoEditor 
            options={{
                minimap: { enabled: false },
                fontSize: editorSettings.fontSize,
                wordWrap: "off",
                tabSize: parseInt( editorSettings.tabSize ),
                lineNumbers: editorSettings.lineNumbers ? "on" : "off",
                quickSuggestions: editorSettings.autocomplete,
                suggestOnTriggerCharacters: editorSettings.autocomplete,
                parameterHints: { enabled: editorSettings.autocomplete },
                hover: { enabled: editorSettings.autocomplete },
                wordBasedSuggestions: editorSettings.autocomplete,
                tabCompletion: editorSettings.autocomplete ? "on" : "off"
            }}
            theme={ editorSettings.theme }
            beforeMount={ initializeEditorThemes }
            ref={ref}
            { ...props }
        />
    )
})

// preview frame component - for rendering the live preview of the code
function PreviewFrame( { srcDoc, className } ) {
    // get editor settings and toggleTabPreviewVisibility function from EditorContext
    const { 
        editorSettings, 
        toggleTabPreviewVisibility,
        handleSharing
    } = useContext( EditorContext )

    return (
        // preview frame container
        <div 
            className={`
                editor--main__preview   
                rounded-md
                overflow-hidden
                relative
                ${className || ''}
            `}
        >
            {/* preview iframe */}
            <iframe 
                className="
                    editor--main__preview-iframe
                    w-full
                    h-full
                    rounded-md
                "
                srcDoc={ srcDoc }
            ></iframe>

            {/* preview action buttons */}
            <div 
                className="
                    editor--main__preview-actions
                    absolute
                    bottom-0
                    right-0
                    flex
                    gap-2
                    bg-gray-300 dark:bg-gray-600

                    dark:*:text-white
                    *:capitalize
                    *:cursor-pointer
                "
            >
                {/* preview share button */}
                <button 
                    className="
                        editor--main__share-btn
                        flex
                        gap-2
                        items-center
                        py-2 px-3
                    "
                    onClick={ handleSharing }
                >
                    share <FaShareNodes />
                </button>

                {/* preview toggle button */}
                <button 
                    className="
                        editor--main__preview-btn
                        py-2 px-3
                    "
                    onClick={ toggleTabPreviewVisibility }
                >
                    { editorSettings.isTabPreviewVisible ? <FaBan/> : <FaDesktop/> }
                </button>
            </div>
        </div>
    )
}

// shareTabContent component - component to render the content of each share tab
function ShareTabContent({ value, blokId }) {
    // get backend URL from environment variables
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000"

    // construct share link and embed code using the blok ID
    const shareLink = `${ backendURL }/share/#/${ blokId }`
    const embedCode = `<iframe 
                                width="600" 
                                height="400"
                                src="${ shareLink }"
                                title="Express Web Code Editor Blok"
                                allowFullScreen
                            ></iframe>`

    // state to track if the link/code has been copied
    const [ isCopied, setIsCopied ] = useState( false )

    // copyText() - function to copy the share link or embed code to clipboard
    async function copyText() {
        // check if the Clipboard API is supported
        if ( navigator.clipboard && navigator.clipboard.writeText ) {
            // copy the appropriate text based on the tab value
            if ( value === "link" ) {
                // if value is "link", copy the share link
                await navigator.clipboard.writeText( shareLink )
                
                setIsCopied( true )
            } else {
                // if value is "embed", copy the embed code
                await navigator.clipboard.writeText( embedCode )
                
                setIsCopied( true )
            }

            setTimeout( function() {
                // reset isCopied state after 1 second
                setIsCopied( false )
            }, 1000 )
        }
    }

    // promptSocialShare() - function to open social media share dialogs
    function promptSocialShare() {
        // open the appropriate social media share window based on the tab value
        switch( value ) {
            // Facebook share
            case "facebook":
                window.open( `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent( shareLink )}`)
            break;
            
            // X (Twitter) share
            case "x":
                window.open( `https://twitter.com/intent/tweet?url=${encodeURIComponent( shareLink )}&text=${encodeURIComponent("Hey! Check out my code on codebloks")}`)
            break;
            
            // LinkedIn share
            case "linkedin":
                window.open( `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent( shareLink )}&title=${encodeURIComponent("Hey! Check out my code on codebloks")}`)
            break;
            
            // WhatsApp share
            case "whatsapp":
                window.open( `https://wa.me/?text=${encodeURIComponent("Hey! Check out my code on codebloks " + shareLink)}` )
            break;
        }
    }

    return (
        // share tab content container
        <Tabs.Content 
            value={ value }
            className="
                p-3
                px-4
                rounded-md
                bg-gray-600 dark:bg-gray-300
                text-white dark:text-gray-900
            "
        >
            {/* share tab content group */}
            <div 
                className="
                    share-dialog--tabs__link-ctn

                    [&_.share-dialog--tabs\_\_link-copy-btn]:mt-3
                    [&_.share-dialog--tabs\_\_link-copy-btn]:w-full
                    [&_.share-dialog--tabs\_\_link-copy-btn]:capitalize
                "
            >
                {/* share link or embed code */}
                <span 
                    className="
                        share-dialog--tabs__link-text
                        break-all
                    "
                >
                    {
                        value === "embed" ?
                            `${ embedCode }`
                        :
                            `${ shareLink }`
                    }
                </span>

                {/* copy link button */}
                { value === "link" && <Button
                    className="
                        share-dialog--tabs__link-copy-btn
                    "
                    onClick={ copyText }
                >
                    {
                        isCopied ?
                            <>copied!</>
                        :
                            <>    
                                <FaCopy />

                                <span>
                                    copy link
                                </span>
                            </>
                    }
                </Button> }
                
                {/* copy embed code button */}
                { value === "embed" && <Button
                    className="
                        share-dialog--tabs__link-copy-btn
                    "
                    onClick={ copyText }
                >
                    {
                        isCopied ?
                            <>copied!</>
                        :
                            <>    
                                <FaCopy />

                                <span>
                                    copy code
                                </span>
                            </>
                    }
                </Button> }
                
                {/* email send button */}
                { value === "email" && <Button
                    className="
                        share-dialog--tabs__link-copy-btn
                    "
                    onClick={ 
                        () => window.open(
                            `mailto:?subject=${encodeURIComponent("Hey! Check Out This Code Blok")}&body=${encodeURIComponent("use the link below:" + "\n\n" + shareLink)}`
                        ) 
                    }
                >
                    <span>
                        send mail
                    </span>

                    <FaArrowRightLong />
                </Button> }
                
                {/* social media share buttons */}
                { ["facebook", "x", "linkedin", "whatsapp" ].includes(value) && 
                    <Button
                        className="
                            share-dialog--tabs__link-copy-btn
                        "
                        onClick={ promptSocialShare }
                    >
                        <FaShareNodes />

                        <span>
                            Share Code
                        </span>
                    </Button> 
                }
            </div>
        </Tabs.Content>
    )
}