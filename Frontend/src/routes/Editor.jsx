import { 
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
    FaXmark
} from "react-icons/fa6";
import NavMenu from "../components/NavMenu";
import WideLayout from "../components/WideLayout";
import { DropdownMenu } from "radix-ui";
import Button from "../components/Button";
import DropdownContent from "../components/DropdownContent";
import NavAvatar from "../components/NavAvatar";


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

                    <button className="editor--header__editor-setting">
                        <FaGear/>
                    </button>

                    <NavAvatar />
                </div>
            </div>

            <div className="editor--main">
                <div className="editor--main__editors-ctn">
                    <div className="editor--main__html-editor">
                        <div className="editor--main__editor-header">
                            <span className="editor--main__editor-name">
                                html
                            </span>

                            <FaXmark/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </WideLayout>
  )
}
