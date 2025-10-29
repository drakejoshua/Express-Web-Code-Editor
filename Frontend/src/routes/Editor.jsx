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


export default function Editor() {
  return (
    <WideLayout>
        <div className="editor">
            <div className="editor--header">
                <NavMenu />

                <span className="editor--header__name-ctn">
                    <span className="editor--header__blok-name">
                        New_Blok
                    </span>

                    <button className="editor--header__rename-btn">
                        <FaPencil/>
                    </button>
                </span>

                <div className="editor--header__actions-ctn">
                    <DropdownMenu.Root>
                        <div>
                            <Button>
                                run
                            </Button>
                            <DropdownMenu.Trigger asChild>
                                <Button>
                                    <FaChevronDown/>
                                </Button>
                            </DropdownMenu.Trigger>
                        </div>

                        <DropdownContent 
                            label="run options"
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

                    <button className="editor--header__fullscreen-btn">
                        <FaExpand/>
                        {/* <FaCompress/> */}
                    </button>

                    <button className="editor--header__theme-toggle">
                        <FaMoon/>
                        {/* <FaRegSun/> */}
                    </button>

                    <EditorSettingsPopover />

                    <NavAvatar />
                </div>
            </div>

            <div className="editor--main">
                <div className="editor--main__editors-ctn">
                    <div className="editor--main__editor">
                        <div className="editor--main__editor-header">
                            <span className="editor--main__editor-name">
                                html
                            </span>

                            <FaXmark/>
                        </div>

                        <div className="editor--main__editor-body">

                        </div>
                    </div>
                    <div className="editor--main__editor">
                        <div className="editor--main__editor-header">
                            <span className="editor--main__editor-name">
                                css
                            </span>

                            <FaXmark/>
                        </div>

                        <div className="editor--main__editor-body">

                        </div>
                    </div>
                    <div className="editor--main__editor">
                        <div className="editor--main__editor-header">
                            <span className="editor--main__editor-name">
                                js
                            </span>

                            <FaXmark/>
                        </div>

                        <div className="editor--main__editor-body">

                        </div>
                    </div>
                </div>
                 
                <div className="editor--main__preview">
                    <iframe 
                        className="editor--main__preview-iframe"
                        srcDoc={`
                            <h1>hello</h1>
                            <p> Welcome to code bloks </p>
                        `}
                    ></iframe>

                    <div className="editor--main__preview-actions">
                        <button className="editor--main__share-btn">
                            share <FaShare />
                        </button>

                        <button className="editor--main__preview-btn">
                            <FaArrowUpRightFromSquare />
                        </button>
                    </div>
                </div>
            </div>

            <Tabs.Root 
                className="
                    editor--mobile-main
                " 
                defaultValue="html"
            >
                <Tabs.List>
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

                <Tabs.Content value="html" asChild>
                    <div className="editor--main__editor">
                        <div className="editor--main__editor-header">
                            <span className="editor--main__editor-name">
                                html
                            </span>

                            <FaXmark/>
                        </div>

                        <div className="editor--main__editor-body">

                        </div>
                    </div>
                </Tabs.Content>

                <Tabs.Content value="css" asChild>
                    <div className="editor--main__editor">
                        <div className="editor--main__editor-header">
                            <span className="editor--main__editor-name">
                                css
                            </span>

                            <FaXmark/>
                        </div>

                        <div className="editor--main__editor-body">

                        </div>
                    </div>
                </Tabs.Content>

                <Tabs.Content value="js">
                    <div className="editor--main__editor">
                        <div className="editor--main__editor-header">
                            <span className="editor--main__editor-name">
                                js
                            </span>

                            <FaXmark/>
                        </div>

                        <div className="editor--main__editor-body">

                        </div>
                    </div>
                </Tabs.Content>

                <Tabs.Content value="preview">
                    <div className="editor--main__preview">
                        <iframe 
                            className="editor--main__preview-iframe"
                            srcDoc={`
                                <h1>hello</h1>
                                <p> Welcome to code bloks </p>
                            `}
                        ></iframe>

                        <div className="editor--main__preview-actions">
                            <button className="editor--main__share-btn">
                                share <FaShare />
                            </button>

                            <button className="editor--main__preview-btn">
                                <FaArrowUpRightFromSquare />
                            </button>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </WideLayout>
  )
}


function EditorSettingsPopover() {
    return <Popover.Root>
        <Popover.Trigger asChild>
            <button className="editor--header__editor-setting">
                <FaGear/>
            </button>
        </Popover.Trigger>

        <Popover.Portal>
            <Popover.Content>
                <span className="editor-settings__popover-content">
                    editor settings
                </span>

                <ToggleOption
                    label="layout"
                    defaultValue="editor-top"
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
                    label="toggle code"
                    defaultValue={["html", "css", "js"]}
                    type="multiple"
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
                    "
                    label="focus mode"
                />

                <SelectOption
                    label="Editor Theme:"
                    type="grouped"
                    placeholder="Select a theme"
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
                    label="font size"
                    unit="px"
                    min={8}
                    max={48}
                    step={1}
                    defaultValue={16}
                />

                <ToggleOption
                    label="tab size"
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
                />

                <SwitchOption
                    className="
                        flex-row
                        justify-between
                    "
                    label="autocomplete"
                />
                
                <SwitchOption
                    className="
                        flex-row
                        justify-between
                    "
                    label="line number"
                />

                <button className="shortcut-option">
                    <span className="shortcut-option__label">
                        shortcuts
                    </span>

                    <FaArrowUpRightFromSquare/>
                </button>
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
}
