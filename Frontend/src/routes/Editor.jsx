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
import { forwardRef } from "react";
import { useThemeProvider } from "../providers/ThemeProvider";


export default function Editor() {
    const { theme, toggleTheme } = useThemeProvider() 

    return (
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
                                        action: function(){},
                                        content: <>
                                            <FaCheck/>

                                            <span>
                                                autorun
                                            </span>
                                        </>
                                    },
                                    {
                                        action: function(){},
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
                        >
                            <FaExpand/>
                            {/* <FaCompress/> */}
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
                    className="
                        editor--main
                        flex-grow
                        hidden lg:grid
                        grid-rows-2
                        __grid-cols-2
                        gap-4
                    "
                >
                    <div 
                        className="
                            editor--main__editors-ctn
                            flex
                            __flex-col
                            gap-4
                            __order-2

                            *:flex-grow
                            *:flex
                            *:flex-col
                            *:rounded-md
                            *:overflow-hidden
                            
                            [&_.editor--main\_\_editor-header]:bg-gray-100 [&_.editor--main\_\_editor-header]:dark:bg-gray-600
                            [&_.editor--main\_\_editor-header]:flex
                            [&_.editor--main\_\_editor-header]:justify-between
                            [&_.editor--main\_\_editor-header]:items-center
                            [&_.editor--main\_\_editor-header]:py-2 [&_.editor--main\_\_editor-header]:px-4

                            [&_.editor--main\_\_editor-body]:flex-grow
                            [&_.editor--main\_\_editor-body]:w-full
                            [&_.editor--main\_\_editor-body]:h-full

                            [&_.editor--main\_\_editor-name]:uppercase
                            [&_.editor--main\_\_editor-name]:font-medium
                            
                            [&_.editor--main\_\_editor-close-btn]:text-xl
                        "
                    >
                        <MainEditor label="html" defaultLanguage="html"/>
                        <MainEditor label="css" defaultLanguage="css"/>
                        <MainEditor label="js" defaultLanguage="javascript"/>
                    </div>
                    
                    <PreviewFrame 
                        srcDoc={`
                            <h1>hello</h1>
                            <p>this is a new blok</p>
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
    )
}


function EditorSettingsPopover({ className }) {
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

                <ToggleOption
                    label="Layout"
                    defaultValue="editor-top"
                    className="
                        mb-2
                    "
                    options={[
                        {
                            value: "editor-top",
                            content: <TbLayoutNavbar className='text-2xl mx-auto'/>
                        },
                        {
                            value: "editor-left",
                            content: <TbLayoutSidebar className='text-2xl mx-auto'/>
                        },
                        {
                            value: "editor-right",
                            content: <TbLayoutSidebarRight className='text-2xl mx-auto'/>
                        },
                    ]}
                />

                <ToggleOption
                    label="Toggle Code"
                    defaultValue={["html", "css", "js"]}
                    type="multiple"
                    className="
                        mb-4
                    "
                    options={[
                        {
                            value: "html",
                            content: <div className="flex items-center justify-center py-2">
                                <FaCheck className='text-2xl'/>
                                <span className="ml-2 uppercase">html</span>
                            </div>
                        },
                        {
                            value: "css",
                            content: <div className="flex items- justify-center py-2">
                                <FaCheck className='text-2xl'/>
                                <span className="ml-2 uppercase">css</span>
                            </div>
                        },
                        {
                            value: "js",
                            content: <div className="flex items-center justify-center py-2">
                                <FaCheck className='text-2xl'/>
                                <span className="ml-2 uppercase">js</span>
                            </div>
                        },
                    ]}
                />

                <SwitchOption
                    className="
                        flex-row
                        justify-between
                        mb-2
                    "
                    label="Focus Mode"
                />

                <SelectOption
                    label="Editor Theme:"
                    type="grouped"
                    placeholder="Select a theme"
                    className="
                        mb-3
                    "
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
                    defaultValue={16}
                    className="
                        mb-2
                    "
                />

                <ToggleOption
                    label="Tab Size"
                    defaultValue="4"
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
                    label="Autocomplete"
                />
                
                <SwitchOption
                    className="
                        flex-row
                        justify-between
                        mb-3
                    "
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

const MainEditor = forwardRef( function( { label, ...props}, ref ) {
    return (
        <div className="editor--main__editor">
            <div className="editor--main__editor-header">
                <span className="editor--main__editor-name">
                    { label }
                </span>

                <FaXmark className="editor--main__editor-close-btn"/>
            </div>

            <MonacoEditor 
                className="editor--main__editor-body" 
                ref={ref} 
                options={{
                    minimap: { enabled: false },
                    wordWrap: "off"
                }}
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
