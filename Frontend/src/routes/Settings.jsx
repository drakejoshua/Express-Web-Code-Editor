import { FaArrowLeft } from "react-icons/fa6";
import WideLayout from "../components/WideLayout";
import { DropdownMenu, Form } from "radix-ui";
import TextField from "../components/TextField";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import UserAvatar from "../components/UserAvatar";
import FinishButton from "../components/FinishButton";
import ScrollSpy from "react-ui-scrollspy";

export default function Settings() {
  return (
    <WideLayout>
        <div
            className="
                settings
            "
        >
            <div className="settings--header">
                <FaArrowLeft className="settings--header__icon"/>

                <h1 className="settings--header__text">
                    settings
                </h1>
            </div>

            <div className="settings--options-ctn">
                <div 
                    className="
                        settings--options-ctn__navbar
                        [&>.active-scroll-spy]:bg-gray-400 dark:[&>.active-scroll-spy]:bg-gray-700
                    "
                >
                    <button 
                        className="settings--options-ctn__nav-item"
                        data-to-scrollspy-id="account"
                    >
                        Account
                    </button>
                    
                    <button 
                        className="settings--options-ctn__nav-item"
                        data-to-scrollspy-id="api"
                    >
                        API key
                    </button>
                </div>

                <div className="settings--options-ctn__content">
                    <ScrollSpy>
                        <div 
                            className="settings--options-ctn__account-content"
                            id="account"
                        >
                            <h2 className="settings--options-ctn__content-heading">
                                Update Account Information
                            </h2>
                            
                            <p className="settings--options-ctn__content-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, provident?
                            </p>

                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <UserAvatar/>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item>
                                            Delete Photo
                                        </DropdownMenu.Item>
                                        
                                        <DropdownMenu.Item>
                                            Update Photo
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>

                            <Form.Root>
                                <TextField
                                    label="Username:"
                                />

                                <EmailField
                                    label="Email:"
                                />

                                <PasswordField
                                    label="Password:"
                                />

                                <FinishButton>
                                    Update Profile
                                </FinishButton>
                            </Form.Root>
                        </div>

                        <div 
                            className="settings--options-ctn__api-content"
                            id="api"
                        >
                            <Form.Root>
                                <PasswordField
                                    label="API Key"
                                    value="jsn3j4njk3jn34jnj"
                                />

                                <a href="#" className="settings--options-ctn__help-link">
                                    Want to use this API key? Learn how to integrate it
                                </a>

                                <FinishButton>
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
