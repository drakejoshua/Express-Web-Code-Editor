// Settings.jsx
// This component defines the Settings route for the web code editor application.
// It allows users to manage their account settings, including updating profile
// information and generating API keys.



// import route dependencies
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


// define Settings component to manage user settings
export default function Settings() {
    // 
    const parentRef = useRef(null)

    // get theme and toggleTheme from ThemeProvider
    const { theme, toggleTheme } = useThemeProvider()

    // get user and updateUser from AuthProvider
    const { user, updateUser, generateAPIKey } = useAuthProvider()

    // get showToast from ToastProvider and showDialog, hideDialog from DialogProvider
    const { showToast } = useToastProvider()
    const { showDialog, hideDialog } = useDialogProvider()

    // state for selected profile picture file ( used to show preview )
    // when updating profile picture
    const [ selectedFile, setSelectedFile ] = useState(null)
    const [ isUpdatePhotoDialogOpen, setIsUpdatePhotoDialogOpen ] = useState( false )
    const [ isProfilePhotoUpdating, setIsProfilePhotoUpdating ] = useState( false )

    // state for new user details when updating profile information
    const [ newUserDetails, setNewUserDetails ] = useState({
        username: "",
        email: "",
        password: ""
    })
    // state to track if user details are being updated
    const [ isUserDetailsUpdating, setIsUserDetailsUpdating ] = useState( false )

    // state to track if API key is being generated
    const [ isGeneratingAPIKey, setIsGeneratingAPIKey ] = useState( false )

    // confirmProfilePhotoDeletion() - show confirmation dialog before deleting profile photo
    function confirmProfilePhotoDeletion() {
        // show confirmation dialog to delete profile photo
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

        // handleProfilePhotoDeletion() - delete user profile photo after confirmation
        async function handleProfilePhotoDeletion() {
            // call updateUser with empty photo to delete profile photo
            const { status, error } = await updateUser( {}, true )

            if ( status === "success" ) {
                // show success toast for profile photo deletion
                showToast({
                    type: "success",
                    message: "User profile photo deleted"
                })
            } else {
                // show error toast if profile photo deletion fails
                showToast({
                    type: "error",
                    message: `Error deleting user profile photo: ${ error.message }`
                })
            }

            // hide the confirmation dialog after deletion attempt
            hideDialog( dialogId )
        }
    }

    // handleUpdateProfilePhoto() - handle profile photo update form submission
    async function handleUpdateProfilePhoto( e ) {
        // handle profile photo update form submission
        e.preventDefault()

        // set profile photo updating state to true
        setIsProfilePhotoUpdating( true )

        // update user profile photo if a file is selected
        if ( selectedFile ) {
            // create userDetails object with selected photo file
            const userDetails = {
                photo: selectedFile
            }

            // call updateUser to update profile photo
            const { status, error } =  await updateUser( userDetails, false )

            if ( status === "success" ) {
                // show success toast for profile photo update if successful
                showToast({
                    type: "success",
                    message: "Profile photo updated successfully"
                })
            } else {
                // show error toast if profile photo update fails
                showToast({
                    type: "error",
                    message: `Error updating profile photo: ${ error.message }`
                })
            }
    
        } else {
            // show error toast if no file is selected to update profile photo
            showToast({
                type: "error",
                message: "Error: No photo selected to update profile photo"
            })
        }
        
        // reset profile photo updating state and close dialog
        closeUpdatePhotoDialog()
    }
    
    // handleUpdateUserDetails() - handle user details update form submission
    async function handleUpdateUserDetails( e ) {
        // prevent default form submission behavior
        e.preventDefault()

        // set user details updating state to true
        setIsUserDetailsUpdating( true )

        // call updateUser with new user details
        const { status, error } = await updateUser( newUserDetails, false )

        if ( status === "success" ) {
            // show success toast for user details update if successful
            showToast({
                type: "success",
                message: "User profile details updated successfully"
            })
        } else {
            // show error toast if user details update fails
            showToast({
                type: "error",
                message: `Error updating user details: ${ error.message }`
            })
        }
        
        // reset user details updating state and clear new user details form
        setIsUserDetailsUpdating( false )
        setNewUserDetails({
            username: "",
            email: "",
            password: ""
        })
    }

    // closeUpdatePhotoDialog() - close update profile photo dialog and reset states
    function closeUpdatePhotoDialog() {
        // close update profile photo dialog and reset related states
        setIsUpdatePhotoDialogOpen( false )
        setSelectedFile( null )
        setIsProfilePhotoUpdating( false )
    }

    // handleGenerateAPIKey() - handle API key generation form submission
    async function handleGenerateAPIKey( e ) {
        // prevent default form submission behavior
        e.preventDefault()

        // set generating API key state to true
        setIsGeneratingAPIKey( true )

        // call generateAPIKey to generate a new API key
        const { status, error } = await generateAPIKey()

        if ( status === "success" ) {
            // show success toast for API key generation if successful
            showToast({
                type: "success",
                message: "New API key generated successfully"
            })
        } else {
            // show error toast if API key generation fails
            showToast({
                type: "error",
                message: `Error generating API key: ${ error.message }`
            })
        }

        // reset generating API key state
        setIsGeneratingAPIKey( false )
    }

    // get navigate function from react-router-dom
    // to navigate programmatically
    const navigateTo = useNavigate() 
    
    return (
        <>
            {/* Helmet for setting the page title and meta description */}
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
                    {/* Settings header section */}
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
                        {/* Close settings button */}
                        <FaXmark 
                            className="settings--header__icon" 
                            onClick={ () => navigateTo(-1) }
                        />

                        {/* Settings title */}
                        <h1 className="settings--header__text">
                            settings
                        </h1>

                        {/* Theme toggle button */}
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

                    {/* Settings options container */}
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
                        {/* Settings options navigation bar */}
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
                            {/* Settings options navigation buttons */}
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

                        {/* Settings options content area */}
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
                            {/* Settings options scroll spy */}
                            <ScrollSpy
                                parentScrollContainerRef={parentRef}
                            >
                                {/* Settings options account section */}
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

                                    {/* User avatar dropdown menu for profile photo */}
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

                                    {/* User details update form */}
                                    <Form.Root
                                        className="
                                            settings--options-ctn__settings-form
                                        "
                                        onSubmit={ handleUpdateUserDetails }
                                    >
                                        {/* User details update form fields */}
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

                                {/* Settings options API key section */}
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

                                    {/* API key generation form */}
                                    <Form.Root
                                        className="
                                            settings--options-ctn__settings-form
                                        "
                                        onSubmit={ handleGenerateAPIKey }
                                    >
                                        {/* API key input field */}
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
            
            {/* Update profile photo dialog */}
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
