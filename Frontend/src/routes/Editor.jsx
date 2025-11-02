import { 
    FaArrowUpRightFromSquare,
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
    FaShare, 
    FaXmark
} from "react-icons/fa6";
import NavMenu from "../components/NavMenu";
import WideLayout from "../components/WideLayout";
import { DropdownMenu, Popover, Tabs } from "radix-ui";
import Button from "../components/Button";
import DropdownContent from "../components/DropdownContent";
import NavAvatar from "../components/NavAvatar";
import ToggleOption from "../components/ToggleOption";
import { TbLayoutNavbar, TbLayoutSidebar, TbLayoutSidebarRight } from "react-icons/tb";
import SwitchOption from "../components/SwitchOption";
import SelectOption from "../components/SelectOption";
import { editorThemes } from "../utils/editor_themes";
import RangeOption from "../components/RangeOption";
import MonacoEditor from "@monaco-editor/react";
import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import { useThemeProvider } from "../providers/ThemeProvider";
import JSZip from "jszip";
import { saveAs } from "file-saver";



const EditorContext = createContext()



export default function Editor() {
    // editor state and data
    const { theme, toggleTheme } = useThemeProvider() 
    const [ mobileBreakpoint, setMobileBreakpoint ] = useState( window.innerWidth <= 1024 )

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

    let autoRunInterval = useRef( null )

    const [ editorSettings, setEditorSettings ] = useState( { 
        focusMode: false,
        layout: "editor_top",
        editors: ["html", "css", "js"],
        fontSize: 16,
        tabSize: '2',
        lineNumbers: true,
        autocomplete: true,
        theme: "vs",
        autoRun: false
    } )


    // editor controllers

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

    useEffect( function() {
        window.addEventListener( "resize", handleBreakpointResize )

        return function() {
            window.removeEventListener( "resize", handleBreakpointResize )
        }
    }, [])
    
    function toggleFocusMode() {
        if ( !editorSettings.focusMode ) {
            document.body.requestFullscreen()
        } else {
            document.exitFullscreen()
        }

        setEditorSettings( function( prev ) { return { ...prev, focusMode: !prev.focusMode } })
    }

    function toggleHTMLEditor() {
        if ( editorSettings.editors.length > 1 ) {
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
        if ( editorSettings.editors.length > 1 ) {
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
        if ( editorSettings.editors.length > 1 ) {
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

    useEffect( function() {
        if ( editorSettings.autoRun ) {
            if ( autoRunInterval.current ) {
                clearInterval( autoRunInterval.current )
            }

            autoRunInterval.current = setTimeout( function() {
                runEditorCode()
            }, 300 )
        }
    }, [ editorContent ])

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
            initializeEditorThemes
        } }>
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
                                New_Blok
                            </span>

                            <button 
                                className="
                                    editor--header__rename-btn
                                    text-gray-500 dark:text-gray-300
                                "
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
                                [&>button]:bg-gray-100 [&>button]:dark:bg-gray-600
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
                                            action: function(){},
                                            content: <>
                                                <FaDesktop/>

                                                <span>
                                                    preview
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
                            flex-grow
                            hidden lg:grid
                            ${ editorSettings.layout == "editor_top" ? "grid-rows-2" : "grid-cols-2" }
                            gap-4
                        `}
                    >
                        <div 
                            className={`
                                editor--main__editors-ctn
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
                                    className="flex-grow"
                                    value={ editorContent.html }
                                    onChange={ ( value ) => setEditorContent({ ...editorContent, html: value }) }
                                />
                            }
                            { 
                                editorSettings.editors.includes("css") && <MainEditor 
                                    label="css" 
                                    defaultLanguage="css"
                                    onToggle={ toggleCSSEditor }
                                    className="flex-grow"
                                    value={ editorContent.css }
                                    onChange={ ( value ) => setEditorContent({ ...editorContent, css: value }) }
                                />
                            }
                            {
                                editorSettings.editors.includes("js") && <MainEditor 
                                    label="js" 
                                    defaultLanguage="javascript"
                                    onToggle={ toggleJSEditor }
                                    className="flex-grow"
                                    value={ editorContent.js }
                                    onChange={ ( value ) => setEditorContent({ ...editorContent, js: value }) }
                                />
                            }
                        </div>
                        
                        <PreviewFrame 
                            srcDoc={`
                                <!DOCTYPE html>
                                <html lang="en">
                                    <head>
                                        <meta charset="UTF-8" />
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                        <title>Preview</title>
                                        <style>
                                            ${ previewContent.css }
                                        </style>
                                    </head>
                                    <body>
                                        ${ previewContent.html }

                                        <script>
                                            ${ previewContent.js }
                                        </script>
                                    </body>
                                </html>
                            `}
                            className="
                                border-2
                                border-gray-400 dark:border-gray-600
                            "
                        />
                    </div>

                    <Tabs.Root 
                        className="
                            editor--mobile-main
                            flex-grow
                            flex lg:hidden
                            flex-col
                            border-2
                            border-gray-100 dark:border-gray-600
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
                                *:rounded-md
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
                                flex-grow
                            "

                        >
                            <MonacoEditor 
                                options={{
                                    minimap: { enabled: false }
                                }}
                            />
                        </Tabs.Content>

                        <Tabs.Content 
                            value="css"
                            className="
                                flex-grow
                            "

                        >
                            <MonacoEditor 
                                options={{
                                    minimap: { enabled: false }
                                }}
                            />
                        </Tabs.Content>

                        <Tabs.Content 
                            value="js"
                            className="
                                flex-grow
                            "

                        >
                            <MonacoEditor 
                                options={{
                                    minimap: { enabled: false }
                                }}
                            />
                        </Tabs.Content>

                        <Tabs.Content 
                            value="preview"
                            className="
                                flex-grow
                            "

                        >
                            <PreviewFrame 
                                srcDoc={`
                                    <h1>hello</h1>
                                    <p>this is a new blok</p>
                                `}
                                className="
                                    h-full
                                "
                            />
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </WideLayout>
        </EditorContext.Provider>
    )
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
                        mb-3
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

                <button 
                    className="
                        shortcut-option
                        w-full
                        flex
                        items-center
                        justify-between
                    "
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
                </button>
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

function PreviewFrame( { srcDoc, className } ) {
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
                    bg-gray-400 dark:bg-gray-600

                    *:text-white
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
                    share <FaShare />
                </button>

                <button 
                    className="
                        editor--main__preview-btn
                        py-2 px-3
                    "
                >
                    <FaArrowUpRightFromSquare />
                </button>
            </div>
        </div>
    )
}