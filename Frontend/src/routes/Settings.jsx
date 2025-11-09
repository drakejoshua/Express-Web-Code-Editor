import { FaArrowLeftLong, FaMoon, FaPen, FaPencil, FaRegSun, FaTrash, FaXmark } from "react-icons/fa6";
import WideLayout from "../components/WideLayout";
import { DropdownMenu, Form } from "radix-ui";
import TextField from "../components/TextField";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import UserAvatar from "../components/UserAvatar";
import FinishButton from "../components/FinishButton";
import ScrollSpy from "react-ui-scrollspy";
import { useRef } from "react";
import { useThemeProvider } from '../providers/ThemeProvider'
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const parentRef = useRef(null)
    const { theme, toggleTheme } = useThemeProvider()

    const navigateTo = useNavigate() 
    
    return (
        <WideLayout>
            <div
                className="
                    settings
                    mt-8
                    h-[85%]
                    gap-8
                    flex
                    flex-col
                    pb-12
                "
            >
                <div 
                    className="
                        settings--header
                        flex
                        items-center
                        gap-6
                        text-3xl
                        capitalize
                    "
                >
                    <FaXmark 
                        className="settings--header__icon" 
                        onClick={ () => navigateTo(-1) }
                    />

                    <h1 className="settings--header__text">
                        settings
                    </h1>

                    <button 
                        className="
                            settings--header__theme-toggle
                            ml-auto
                            text-2xl
                        "
                        onClick={ toggleTheme }
                    >
                        { theme == "light" && <FaMoon className="settings--header__theme-toggle-icon"/>}
                        { theme == "dark" && <FaRegSun className="settings--header__theme-toggle-icon"/>}
                    </button>
                </div>

                <div 
                    className="
                        h-full
                        settings--options-ctn
                        grid
                        grid-cols-[100%] lg:grid-cols-[18%_75%]
                        items-stretch
                        gap-8
                        flex-grow
                    "
                >
                    <div 
                        className="
                            settings--options-ctn__navbar
                            hidden lg:flex
                            flex-col
                            items-stretch
                            gap-1
                            border-r-2 border-gray-300
                            p-4

                            *:text-left
                            *:p-2 *:px-4
                            *:rounded-md
                            *:outline-none
                            *:hover:bg-gray-200 dark:*:hover:bg-gray-800
                            *:cursor-pointer
                            *:tracking-wide
                            [&>.active-scroll-spy]:bg-blue-600 dark:[&>.active-scroll-spy]:bg-gray-700
                            [&>.active-scroll-spy]:text-white
                        "
                    >
                        <button 
                            className="settings--options-ctn__nav-item"
                            data-to-scrollspy-id="account"
                        >
                            <a href="#account" className="block">Account</a>
                        </button>
                        
                        <button 
                            className="settings--options-ctn__nav-item"
                            data-to-scrollspy-id="api"
                        >
                            <a href="#api" className="block">API key</a>
                        </button>
                    </div>

                    <div 
                        className="
                            settings--options-ctn__content
                            h-full
                            *:flex lg:*:block
                            *:flex-col
                            *:gap-8
                            *:h-full
                            overflow-auto
                            pt-4
                            

                            [&_.settings--options-ctn\_\_settings]:w-full lg:[&_.settings--options-ctn\_\_settings]:w-1/2

                            [&_.settings--options-ctn\_\_settings-heading]:text-2xl
                            [&_.settings--options-ctn\_\_settings-heading]:mb-2
                            
                            [&_.settings--options-ctn\_\_settings-text]:mb-8
                            
                            [&_.settings--options-ctn\_\_settings-form]:flex
                            [&_.settings--options-ctn\_\_settings-form]:flex-col
                            [&_.settings--options-ctn\_\_settings-form]:gap-2
                            
                            [&_.settings--options-ctn\_\_settings-submit-btn]:mt-4
                        "
                        ref={parentRef}
                    >
                        <ScrollSpy
                            parentScrollContainerRef={parentRef}
                        >
                            <div 
                                className="
                                    settings--options-ctn__settings
                                    h-max
                                "
                                id="account"
                            >
                                <h2 className="settings--options-ctn__settings-heading">
                                    Update Account Information
                                </h2>
                                
                                <p className="settings--options-ctn__settings-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, provident?
                                </p>

                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild>
                                        <UserAvatar
                                            className="
                                                h-28
                                                w-28
                                                mb-8
                                            "
                                        />
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content
                                            className="
                                                bg-gray-500
                                                p-3.5
                                                rounded-md

                                                *:p-2 *:px-3
                                                *:rounded-md
                                                *:text-white
                                                *:font-medium
                                                *:hover:bg-gray-400
                                                *:cursor-pointer
                                                *:flex
                                                *:gap-2
                                                *:items-center
                                            "
                                            side="right"
                                            sideOffset={12}
                                            align="center"
                                        >
                                            <DropdownMenu.Item>
                                                <FaTrash/>

                                                <span>Delete Photo</span>
                                            </DropdownMenu.Item>
                                            
                                            <DropdownMenu.Item>
                                                <FaPen/>

                                                <span>Update Photo</span>
                                            </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Root>

                                <Form.Root
                                    className="
                                        settings--options-ctn__settings-form
                                    "
                                >
                                    <TextField
                                        label="Username:"
                                    />

                                    <EmailField
                                        label="Email:"
                                    />

                                    <PasswordField
                                        label="Password:"
                                    />

                                    <FinishButton
                                        className="
                                            settings--options-ctn__settings-submit-btn
                                        "
                                    >
                                        Update Profile
                                    </FinishButton>
                                </Form.Root>
                            </div>

                            <div 
                                className="
                                    settings--options-ctn__settings
                                    h-full
                                    lg:mt-10
                                "
                                id="api"
                            >
                                <h2 className="settings--options-ctn__settings-heading">
                                    Your API Key
                                </h2>
                                
                                <p className="settings--options-ctn__settings-text">
                                    Retrieve or generate your api key 
                                </p>

                                <Form.Root
                                    className="
                                        settings--options-ctn__settings-form
                                    "
                                >
                                    <PasswordField
                                        label="API Key"
                                        value="jsn3j4njk3jn34jnj"
                                    />

                                    <a href="#" className="settings--options-ctn__help-link underline">
                                        Want to use this API key? Learn how to integrate it
                                    </a>

                                    <FinishButton
                                        className="
                                            settings--options-ctn__settings-submit-btn
                                        "
                                    >
                                        Generate API Key
                                    </FinishButton>
                                </Form.Root>
                            </div>
                        </ScrollSpy>
                    </div>
                </div>
            </div>
        </WideLayout>
    )
}
