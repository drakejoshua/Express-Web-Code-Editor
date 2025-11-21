import { 
    FaArrowRotateLeft,
    FaArrowUpRightFromSquare,
    FaBan,
    FaCheck, 
    FaChevronDown, 
    FaCompress, 
    FaDesktop, 
    FaDownload, 
    FaExpand,
    FaGear, 
    FaMoon, 
    FaPencil, 
    FaRegSun, 
    FaRotateLeft, 
    FaShareNodes, 
    FaSpinner, 
    FaTriangleExclamation, 
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

const EditorContext = createContext()

export default function Editor() {
    // editor state and data
    const { theme, toggleTheme } = useThemeProvider() 
    const [ mobileBreakpoint, setMobileBreakpoint ] = useState( window.innerWidth <= 1024 )

    const [ loadingState, setLoadingState ] = useState("loading")
    const [ loadingError, setLoadingError ] = useState("")
    const { id } = useParams()
    const {
        getBlok,
        updateBlok
    } = useBlokProvider()
    const { showToast } = useToastProvider()

    const [ isRenameDialogOpen, setIsRenameDialogOpen ] = useState( false )
    const [ newBlokName, setNewBlokName ] = useState( "" )

    const [ isShortcutsDialogOpen, setIsShortcutsDialogOpen ] = useState( false )

    const [ blokName, setBlokName ] = useState("loading")

    const navigateTo = useNavigate()

    const [ editorContent, setEditorContent ] = useState( {
        html: "",
        css: "",
        js: ""
    } )

    const [ previewContent, setPreviewContent ] = useState({
        html: "",
        css: "",
        js: ""
    })

    let autoRunTimeout = useRef( null )

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

    let tabPreviewChannelRef = useRef( null )

    let previewChannelTimeout = useRef( null )
    
    let editorSaveTimeoutRef = useRef( null )

    const renderCount = useRef( 0 )

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
    async function fetchBlokToBeEdited() {
        setLoadingState("loading")
        setLoadingError("")

        if ( !id ) {
            setLoadingState("error")
            setLoadingError("Invalid blok id found in request. Please go to dashboard and try again")
        }

        const { status, error, data } = await getBlok( id )

        if ( status === "success" ) {
            setLoadingState("loaded")
            setBlokName( data.blok.name )
            setEditorContent({
                html: data.blok.html,
                css: data.blok.css,
                js: data.blok.js
            })

            setEditorSettings({
                ...editorSettings,
                ...data.blok.settings
            })
        } else {
            setLoadingState("error")
            setLoadingError( error.message )
        }
    }

    function handleBreakpointResize() {
        setMobileBreakpoint( window.innerWidth <= 1024 )
    }

    function initializeEditorThemes( monaco ) {
        const themeValueToOmit = [ "vs", "vs-dark", "hc-black", "hc-light" ]

        editorThemes.forEach( function( theme ) {
            if ( themeValueToOmit.includes( theme.value ) ) {
                return
            } else {
                monaco.editor.defineTheme( theme.value, theme.json )
            }
        })
    }

    function handleFullscreenChange() {
        if ( document.fullscreenElement ) {
            setEditorSettings( ( prev ) => ({ ...prev, focusMode: true }) )
        } else {
            setEditorSettings( ( prev ) => ({ ...prev, focusMode: false }) )
        }
    }

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

    useEffect( function() {
        fetchBlokToBeEdited()
    }, [id])
    
    function toggleFocusMode() {
        if ( !editorSettings.focusMode ) {
            document.body.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    function toggleHTMLEditor() {
        if ( editorSettings.editors.length > 0 ) {
            if ( editorSettings.editors.includes("html") ) {
                setEditorSettings( ( prevEditorSettings ) => ({ 
                    ...prevEditorSettings,
                    editors: prevEditorSettings.editors.filter( function( editor ) {
                        return editor != "html"
                    })
                }))
            } else {
                setEditorSettings( ( prevEditorSettings ) => ({
                    ...prevEditorSettings,
                    editors: [ ...prevEditorSettings.editors, "html" ]
                }))
            }
        }
    }
    
    function toggleCSSEditor() {
        if ( editorSettings.editors.length > 0 ) {
            if ( editorSettings.editors.includes("css") ) {
                setEditorSettings( ( prevEditorSettings ) => ({ 
                    ...prevEditorSettings,
                    editors: prevEditorSettings.editors.filter( function( editor ) {
                        return editor != "css"
                    })
                }))
            } else {
                setEditorSettings( ( prevEditorSettings ) => ({
                    ...prevEditorSettings,
                    editors: [ ...prevEditorSettings.editors, "css" ]
                }))
            }
        }
    }
    
    function toggleJSEditor() {
        if ( editorSettings.editors.length > 0 ) {
            if ( editorSettings.editors.includes("js") ) {
                setEditorSettings( ( prevEditorSettings ) => ({ 
                    ...prevEditorSettings,
                    editors: prevEditorSettings.editors.filter( function( editor ) {
                        return editor != "js"
                    })
                }))
            } else {
                setEditorSettings( ( prevEditorSettings ) => ({
                    ...prevEditorSettings,
                    editors: [ ...prevEditorSettings.editors, "js" ]
                }))
            }
        }
    }

    function changeActiveEditors( editors ) {
        if ( editors.length > 0 && !mobileBreakpoint ) {
            setEditorSettings( ( prevEditorSettings ) => ({
                ...prevEditorSettings,
                editors: editors
            }))
        }
    }

    function changeEditorLayout( layout ) {
        const allowableEditorLayouts = [ "editor_top", "editor_left", "editor_right" ]

        if ( allowableEditorLayouts.includes( layout ) && !mobileBreakpoint ) {
            setEditorSettings( function( prev ) {
                return { ...prev, layout }
            } )
        }
    }

    function changeEditorFontSize( fontSize ) {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            fontSize: fontSize
        }))
    }

    function changeTabSize( tabSize ) {
        const allowableTabSizes = [ "2", "4", "6" ]

        if ( allowableTabSizes.includes( tabSize ) ) {
            setEditorSettings( ( prevEditorSettings ) => ({
                ...prevEditorSettings,
                tabSize: tabSize
            }))
        }
    }

    function toggleLineNumbers() {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            lineNumbers: !prevEditorSettings.lineNumbers
        }))
    }

    function toggleAutocomplete() {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            autocomplete: !prevEditorSettings.autocomplete
        }))
    }

    function changeTheme( value ) {
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            theme: value
        }))
    }

    function runEditorCode() {
        setPreviewContent({ ...editorContent })
    }

    function toggleEditorAutoRunCode() { 
        setEditorSettings( ( prevEditorSettings ) => ({
            ...prevEditorSettings,
            autoRun: !prevEditorSettings.autoRun
        }))
    }

    function toggleTabPreviewVisibility() {
        const frontendURL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"

        if ( editorSettings.isTabPreviewVisible == false ) {
            tabPreviewChannelRef.current = new BroadcastChannel("tab_preview_channel")

            tabPreviewChannelRef.current.onmessage = function( event ) {
                if ( event.data.type == "Request_Editor_Content" ) {
                    tabPreviewChannelRef.current.postMessage({
                        type: "Request_Editor_Content",
                        payload: editorContent
                    })
                }
            }

            window.open(`${ frontendURL }/preview`, "_blank")
        } else {
            if ( tabPreviewChannelRef.current ) {
                tabPreviewChannelRef.current.close()
            }
        }

        setEditorSettings( function( prevEditorSettings ) {
            return {
                ...prevEditorSettings,
                isTabPreviewVisible: !prevEditorSettings.isTabPreviewVisible
            }
        })
    }

    useEffect( function() {
        if ( editorSettings.autoRun ) {
            if ( autoRunTimeout.current ) {
                clearTimeout( autoRunTimeout.current )
            }

            autoRunTimeout.current = setTimeout( function() {
                runEditorCode()
            }, 300 )
        }

        if ( editorSettings.isTabPreviewVisible ) {
            if ( previewChannelTimeout.current ) {
                clearTimeout( previewChannelTimeout.current )
            }

            previewChannelTimeout.current = setTimeout( function() {
                if ( tabPreviewChannelRef.current ) {
                    tabPreviewChannelRef.current.postMessage({
                        type: "Preview_Content",
                        payload: editorContent
                    })
                }
            }, 300 )
        }

        if ( renderCount.current > 2 ) {
            if ( editorSaveTimeoutRef.current ) {
                clearTimeout( editorSaveTimeoutRef.current )
            }
    
            editorSaveTimeoutRef.current = setTimeout( saveEditorToBackend, 1000 )
        } else {
            renderCount.current += 1
        }

        return function() {
            clearTimeout(autoRunTimeout.current);
            clearTimeout(previewChannelTimeout.current);
            clearTimeout(editorSaveTimeoutRef.current);
        }
    }, [ editorContent ])

    useEffect( function() {
        if ( renderCount.current > 2 ) {
            if ( editorSaveTimeoutRef.current ) {
                clearTimeout( editorSaveTimeoutRef.current )
            }
    
            editorSaveTimeoutRef.current = setTimeout( saveEditorToBackend, 1000 )
        } else {
            renderCount.current += 1
        }

        return function() {
            clearTimeout(editorSaveTimeoutRef.current);
        }
    }, [ editorSettings ])

    async function exportAsZip() {
        const zip = JSZip()
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

        zip.file( "index.html", htmlTemplateToExport )
        zip.file( "styles.css", editorContent.css )
        zip.file( "script.js", editorContent.js )

        const blob = await zip.generateAsync({ type: "blob" })
        saveAs( blob, "codeblok.zip" )
    }

    async function handleBlokRename( e ) {
        e.preventDefault()

        const { status, error } = await updateBlok( id, {
            name: newBlokName
        } )

        if ( status === "success" ) {
            showToast({
                type: "success",
                message: "Blok renamed successfully"
            })

            setBlokName( newBlokName )
        } else {
            showToast({
                type: "error",
                message: `Error renaming Blok: ${ error.message }`
            })
        }

        setNewBlokName("")
        setIsRenameDialogOpen( false )
    }

    function promptBlokRename() {
        setNewBlokName( blokName )

        setIsRenameDialogOpen( true )
    }

    async function saveEditorToBackend() {
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
            showToast({
                type: "error",
                message: `Error saving blok: ${ error.message }`,
                action: saveEditorToBackend,
                actionLabel: "Retry"
            })
        }
    }


    switch( loadingState ) {
        case "loading":
            return (
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
            )
        
        case "error":
            return (
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
            )

        case "loaded":
            return (
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
                    setIsShortcutsDialogOpen
                } }>
                    <>
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
                                {/* editor desktop content */}
                                <div 
                                    className="
                                        editor--header
                                        py-3
                                        flex
                                        items-center
                                    "
                                >
                                    <NavMenu />
            
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
            
                                        <button 
                                            className="editor--header__theme-toggle"
                                            onClick={ toggleTheme }
                                        >
                                            { theme == "light" && <FaMoon/> }
                                            { theme == "dark" && <FaRegSun/> }
                                        </button>
            
                                        <EditorSettingsPopover 
                                            className="
                                                hidden lg:block
                                            "
                                        />
            
                                        <NavAvatar />
                                    </div>
                                </div>
            
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
                    </>
                </EditorContext.Provider>
            )
    }


}


// internal/partial components to be used inside Editor component
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
        <Popover.Trigger asChild>
            <button className={`editor--header__editor-setting ${className}`}>
                <FaGear/>
            </button>
        </Popover.Trigger>

        <Popover.Portal>
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

const MainEditor = forwardRef( function( { 
    label, 
    onToggle, 
    className,
    ...props
}, ref ) {
    const {
        editorSettings,
        initializeEditorThemes
    } = useContext( EditorContext )


    return (
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
                <span 
                    className="
                        editor--main__editor-name
                        uppercase
                        font-medium
                    "
                >
                    { label }
                </span>

                <FaXmark 
                    className="
                        editor--main__editor-close-btn
                        text-xl
                    "
                    onClick={ onToggle }
                />
            </div>

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

const MobileEditor = forwardRef( function( props, ref ) {
    const {
        editorSettings,
        initializeEditorThemes
    } = useContext( EditorContext )

    return (
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

function PreviewFrame( { srcDoc, className } ) {
    const { editorSettings, toggleTabPreviewVisibility } = useContext( EditorContext )

    return (
        <div 
            className={`
                editor--main__preview   
                rounded-md
                overflow-hidden
                relative
                ${className || ''}
            `}
        >
            <iframe 
                className="
                    editor--main__preview-iframe
                    w-full
                    h-full
                    rounded-md
                "
                srcDoc={ srcDoc}
            ></iframe>

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
                <button 
                    className="
                        editor--main__share-btn
                        flex
                        gap-2
                        items-center
                        py-2 px-3
                    "
                >
                    share <FaShareNodes />
                </button>

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