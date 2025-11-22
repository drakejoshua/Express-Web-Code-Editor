import { FaMoon, FaPen, FaRegSun, FaTrash, FaTriangleExclamation, FaXmark } from "react-icons/fa6";
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
import { useAuthProvider } from "../providers/AuthProvider";
import { useToastProvider } from "../providers/ToastProvider";
import { DialogComponent, useDialogProvider } from "../providers/DialogProvider";
import Button from "../components/Button";
import { useState } from "react";


export default function Settings() {
    const parentRef = useRef(null)
    const { theme, toggleTheme } = useThemeProvider()

    const { user, updateUser, generateAPIKey } = useAuthProvider()

    const { showToast } = useToastProvider()
    const { showDialog, hideDialog } = useDialogProvider()

    // state for selected profile picture file ( used to show preview )
    // when updating profile picture
    const [ selectedFile, setSelectedFile ] = useState(null)
    const [ isUpdatePhotoDialogOpen, setIsUpdatePhotoDialogOpen ] = useState( false )
    const [ isProfilePhotoUpdating, setIsProfilePhotoUpdating ] = useState( false )

    const [ newUserDetails, setNewUserDetails ] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [ isUserDetailsUpdating, setIsUserDetailsUpdating ] = useState( false )

    const [ isGeneratingAPIKey, setIsGeneratingAPIKey ] = useState( false )

    function confirmProfilePhotoDeletion() {
        const dialogId = showDialog({
            title: "Delete Profile Photo?",
            description: "Are you sure you want to delete your profile photo?",
            content: (
                <Button
                    className="
                        w-full
                        mt-4
                    "
                    onClick={ handleProfilePhotoDeletion }
                >
                    Delete Photo
                </Button>
            )
        })

        
        async function handleProfilePhotoDeletion() {
            const { status, error } = await updateUser( {}, true )

            if ( status === "success" ) {
                showToast({
                    type: "success",
                    message: "User profile photo deleted"
                })
            } else {
                showToast({
                    type: "error",
                    message: `Error deleting user profile photo: ${ error.message }`
                })
            }

            hideDialog( dialogId )
        }
    }

    async function handleUpdateProfilePhoto( e ) {
        e.preventDefault()
        setIsProfilePhotoUpdating( true )

        if ( selectedFile ) {
            const userDetails = {
                photo: selectedFile
            }

            const { status, error } =  await updateUser( userDetails, false )

            if ( status === "success" ) {
                showToast({
                    type: "success",
                    message: "Profile photo updated successfully"
                })
            } else {
                showToast({
                    type: "error",
                    message: `Error updating profile photo: ${ error.message }`
                })
            }
    
        } else {
            showToast({
                type: "error",
                message: "Error: No photo selected to update profile photo"
            })
        }
        
        closeUpdatePhotoDialog()
    }
    
    async function handleUpdateUserDetails( e ) {
        e.preventDefault()
        setIsUserDetailsUpdating( true )

        const { status, error } = await updateUser( newUserDetails, false )

        if ( status === "success" ) {
            showToast({
                type: "success",
                message: "User profile details updated successfully"
            })
        } else {
            showToast({
                type: "error",
                message: `Error updating user details: ${ error.message }`
            })
        }
        
        setIsUserDetailsUpdating( false )
        setNewUserDetails({
            username: "",
            email: "",
            password: ""
        })
    }

    function closeUpdatePhotoDialog() {
        setIsUpdatePhotoDialogOpen( false )
        setSelectedFile( null )
        setIsProfilePhotoUpdating( false )
    }

    async function handleGenerateAPIKey( e ) {
        e.preventDefault()
        setIsGeneratingAPIKey( true )

        const { status, error } = await generateAPIKey()

        if ( status === "success" ) {
            showToast({
                type: "success",
                message: "New API key generated successfully"
            })
        } else {
            showToast({
                type: "error",
                message: `Error generating API key: ${ error.message }`
            })
        }

        setIsGeneratingAPIKey( false )
    }

    const navigateTo = useNavigate() 
    
    return (
        <>
            <Helmet>
                <title>Settings - CodeBloks</title>
                <meta name="description" content="Manage your user settings and preferences" />
            </Helmet>

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
                                                <DropdownMenu.Item
                                                    onClick={ confirmProfilePhotoDeletion }
                                                >
                                                    <FaTrash/>

                                                    <span>Delete Photo</span>
                                                </DropdownMenu.Item>
                                                
                                                <DropdownMenu.Item
                                                    onClick={ () => setIsUpdatePhotoDialogOpen( true ) }
                                                >
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
                                        onSubmit={ handleUpdateUserDetails }
                                    >
                                        <TextField
                                            label="Username:"
                                            value={ newUserDetails.username || user.username }
                                            onChange={ (e) => setNewUserDetails({
                                                ...newUserDetails,
                                                username: e.target.value
                                            }) }
                                            emptyValidationMessage={""}
                                            required={ false }
                                        />

                                        <EmailField
                                            label="Email:"
                                            value={ newUserDetails.email || user.email }
                                            emptyValidationMessage={""}
                                            onChange={ (e) => setNewUserDetails({
                                                ...newUserDetails,
                                                email: e.target.value
                                            }) }
                                            required={ false }
                                        />

                                        <PasswordField
                                            label="Password:"
                                            value={ newUserDetails.password }
                                            emptyValidationMessage={""}
                                            onChange={ (e) => setNewUserDetails({
                                                ...newUserDetails,
                                                password: e.target.value
                                            }) }
                                            required={ false }
                                        />

                                        <FinishButton
                                            className="
                                                settings--options-ctn__settings-submit-btn
                                            "
                                            disabled={ isUserDetailsUpdating }
                                        >
                                            { isUserDetailsUpdating ? "Updating..." : "Update Profile" }
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
                                        onSubmit={ handleGenerateAPIKey }
                                    >
                                        <PasswordField
                                            label="API Key"
                                            value={ user.api_key }
                                            disabled={ true }
                                            emptyValidationMessage={""}
                                        />

                                        <a 
                                            href="https://github.com/drakejoshua/Express-Web-Code-Editor"
                                            className="settings--options-ctn__help-link underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Want to use this API key? Learn how to integrate it
                                        </a>

                                        <FinishButton
                                            className="
                                                settings--options-ctn__settings-submit-btn
                                            "
                                        >
                                            {
                                                ( user.api_key ?
                                                    isGeneratingAPIKey ? "Generating New API Key..." : "Generate New API Key" 
                                                    :
                                                    isGeneratingAPIKey ? "Generating API Key..." : "Generate API Key"
                                                )
                                            }
                                        </FinishButton>
                                    </Form.Root>
                                </div>
                            </ScrollSpy>
                        </div>
                    </div>
                </div>
            </WideLayout>

            <DialogComponent
                open={ isUpdatePhotoDialogOpen }
                onOpenChange={ closeUpdatePhotoDialog }
                title={"Update Profile Photo"}
                description={"Select a new photo to update your profile photo in the form below"}
                content={(
                    <Form.Root
                        className="
                            mt-6
                        "
                        onSubmit={ handleUpdateProfilePhoto }
                    >
                        {/* custom form field for file upload */}
                        <Form.Field
                            className={`
                                form__file-field
                                flex 
                                flex-col
                                gap-2
                            `}
                        >
                            {/* image upload field label */}
                            <Form.Label
                                className='
                                    form__file-label
                                    font-medium
                                    text-gray-900 dark:text-white
                                '
                            >
                                Upload Profile Picture ( max 2MB )
                            </Form.Label>

                            {/* file input */}
                            <Form.Control asChild>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className='
                                        form__file-input
                                        border-2
                                        border-gray-600 dark:border-gray-300
                                        rounded-sm
                                        py-2 px-3
                                        bg-gray-600 dark:bg-gray-300
                                        text-white dark:text-black
                                        font-medium
                                        outline-none
                                        w-full
                                    '
                                    // handle file selection and set selected file state to show preview
                                    onChange={ (e) => setSelectedFile( e.target.files[0] )}
                                />
                            </Form.Control>

                            { selectedFile === null && <Form.Message
                                className="
                                    text-red-500 dark:text-white
                                    flex
                                    items-center
                                    gap-2
                                    mt-1
                                    text-md
                                "
                            >
                                <FaTriangleExclamation/>

                                <span className="capitalize">
                                    you need to select an image
                                </span>
                            </Form.Message>}
                        </Form.Field>

                        {/* show image preview if selectedFile state is not null */}
                        { selectedFile && 
                            <img
                                className='
                                    h-48
                                    w-full
                                    mt-4
                                    rounded-lg
                                    object-cover
                                    object-center-left
                                    block
                                '
                                // display preview from url using URL.createObjectURL()
                                src={ URL.createObjectURL( selectedFile )}
                            />
                        }

                        <Button
                            className="
                                mt-8
                                w-full
                            "
                            disabled={ isProfilePhotoUpdating }
                        >
                            {isProfilePhotoUpdating ? "Updating Profile Photo..." : "Update Profile Photo"}
                        </Button>
                    </Form.Root>
                )}
            />
        </>
    )
}
