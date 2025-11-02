// Create route
// handles blok creation with a multi-step form using a carousel for navigation
// The form collects blok name, template to be used and default/initial settings in steps
// Each step validates its inputs before allowing navigation to the next step
// The final step submits the collected data to create a new blok for the authenticated account.



// import route dependencies
import { SimpleCarousel, useCarousel } from '../components/simpleCarousel'
import { Form, ToggleGroup } from 'radix-ui'
import MultiStepTabs from '../components/MultiStepTabs'
import TextField from '../components/TextField'
import StepActions from '../components/StepActions'
import PreviousButton from '../components/PreviousButton'
import NextButton from '../components/NextButton'
import Step from '../components/Step'
import FinishButton from '../components/FinishButton'
import { blokTemplates } from '../utils/blok_templates'
import SelectOption from '../components/SelectOption'
import RangeOption from '../components/RangeOption'
import ToggleOption from '../components/ToggleOption'
import SwitchOption from '../components/SwitchOption'
import { 
    TbLayoutSidebar, 
    TbLayoutSidebarRight, 
    TbLayoutNavbar 
} from 'react-icons/tb'
import { useRef, useState } from 'react'
import BlankTemplatePreview from '../components/BlankTemplatePreview'
import { editorThemes } from '../utils/editor_utils'
import { FaMoon, FaRegSun, FaXmark } from 'react-icons/fa6'
import { useThemeProvider } from '../providers/ThemeProvider'
import WideLayout from '../components/WideLayout'



// define and export Create route component
export default function Create() {
    // retrieve theme and toggleTheme function for the theme context
    const { theme, toggleTheme } = useThemeProvider()

    return (
        // wrap route content in a wideLayout
        <WideLayout>
            <div 
                className='
                    create
                '
            >
                {/* route heading */}
                <h1 
                    className="
                        create--heading
                        text-gray-900 dark:text-white
                        text-3xl
                        font-semibold
                        text-center
                        capitalize
                        mt-20 lg:mt-15
                        mb-12
                    "
                >
                    create a new blok
                </h1>

                {/* 
                    route multi-step form wrapped in a SimpleCarousel for multi-
                    step functionality
                */}
                <SimpleCarousel.Root>
                    <MultiStepForm />
                </SimpleCarousel.Root>

                {/* route action buttons container */}
                <div 
                    className="
                        create--actions
                        fixed
                        top-6
                        right-8
                        flex
                        gap-4

                        **:text-2xl
                    "
                >
                    {/* theme toggle container */}
                    <button 
                        className="
                            create--actions__theme-toggle
                        "
                        onClick={ toggleTheme }
                    >
                        {theme === 'dark' ? <FaMoon/> : <FaRegSun/>}
                    </button>

                    {/* cancel button */}
                    <button className="create--actions__cancel-btn">
                        <FaXmark/>
                    </button>
                </div>
            </div>
        </WideLayout>
    )
}


function MultiStepForm() {
    // retrieve carousel handling functions from carousel context
    const { handleNext, handlePrev } = useCarousel()

    // intialize create form state
    const [ blokName, setBlokName ] = useState("")
    const [ selectedTemplate, setSelectedTemplate ] = useState("blank")
    const [ defaultEditorSettings, setDefaultEditorSettings ] = useState({
        layout: "editor-top",
        theme: "vsc_dark",
        font_size: 16,
        tab_size: "4",
        autocomplete: true
    })

    // ref for blok name input - used for validating the blok name
    const blokNameInputRef = useRef(null)

    // moveToTemplateSection() - validates the blok name input and
    // moves to the template selection if input is valid
    function moveToTemplateSection() {
        if ( blokNameInputRef.current?.reportValidity() ) {
            handleNext()
        }
    }

    // handleTemplateSelect() - used by the template selection togglegroup
    // to guard against null values and update state when the value changes 
    // in the togglegroup
    function handleTemplateSelect(value) {
        if ( value != "" ) {
            setSelectedTemplate(value)
        }
    }

    // handleDefaultSettingsChange() - used for updating state when changing the
    // editor default settings in the form, it's used to guard against null/incorrect
    // values received from the form input and normalize them if needed
    function handleDefaultSettingsChange(setting, value) {
        switch( setting ) {
            case "layout":
                value = value != "" ? value : "editor-top"
            break;

            case "tab_size":
                value = value != "" ? value : "4"
            break;

            default:
                break;
        }

        setDefaultEditorSettings( prevSettings => ({
            ...prevSettings,
            [setting]: value
        }))
    }

    return (
        // form root
        <Form.Root
            className="
                create--form
                w-full md:w-3/4 xl:w-3/5
                flex
                flex-col
                items-center
                mx-auto
            "
        >
            {/* form progress indicator/tabs */}
            <MultiStepTabs 
                className="
                    w-full max-w-[700px]
                    mb-10
                "
            />

            {/* carousel scroller */}
            <SimpleCarousel.Scroller
                className="
                    overflow-x-hidden
                    scroll-smooth
                    snap-x 
                    snap-mandatory
                    w-full
                "
            >
                {/* carousel track */}
                <SimpleCarousel.Track
                    className="
                        flex
                        transition-transform
                        duration-500
                        ease-in-out
                    "
                >
                    {/* blok name step */}
                    <Step
                        heading="Enter your blok name"
                        text="Enter a name for the new blok to be created. 
                        Make sure it's something short and memorable"
                    >
                        {/* TextField for collecting blok name */}
                        <TextField
                            label="Enter a blok name"
                            name='blok_name'
                            emptyValidationMessage="Please enter a blok name"
                            value={ blokName }
                            onChange={ (e) => setBlokName(e.target.value) }
                            ref={ blokNameInputRef }
                        />

                        <StepActions
                            className="
                                mt-4
                            "
                        >
                            <NextButton
                                onClick={ moveToTemplateSection }
                            >
                                Next
                            </NextButton>
                        </StepActions>
                    </Step>

                    {/* select starter template step */}
                    <Step
                        heading="Choose a Starter Template"
                        text="Select a template for your blok to get started quickly.
                         Choose from a variety of pre-built templates designed for different use cases."
                    >
                        {/* template selection toggle group */}
                        <ToggleGroup.Root
                            type='single'
                            defaultValue='blank'
                            value={ selectedTemplate }
                            onValueChange={ handleTemplateSelect }
                            className='
                                create--form__template-options
                                grid
                                grid-cols-1 sm:grid-cols-2 xl:grid-cols-3
                                gap-6
                                justify-center
                                h-[60vh] max-h-[500px]
                                overflow-y-auto
                                
                                [&_.template]:border-2
                                [&_.template]:border-gray-300 [&_.template]:dark:border-gray-700
                                [&_.template]:p-4
                                [&_.template]:py-6
                                [&_.template]:rounded-lg
                                [&_.template]:data-[state=on]:border-gray-500 dark:[&_.template]:data-[state=on]:border-gray-400

                                [&_.template\_\_name]:font-medium
                                [&_.template\_\_name]:text-center
                                [&_.template\_\_name]:inline-block
                                [&_.template\_\_name]:text-lg
                                [&_.template\_\_name]:mb-2
                                
                                [&_.template\_\_preview]:h-52
                                [&_.template\_\_preview]:object-cover
                                [&_.template\_\_preview]:mb-4
                                [&_.template\_\_preview]:rounded-md
                                [&_.template\_\_preview]:block
                            '
                        >
                            {/* blank template */}
                            <ToggleGroup.Item
                                value='blank'
                                className='
                                    template
                                '
                            >
                                <BlankTemplatePreview
                                    className="
                                        mb-4
                                    "
                                />

                                <span 
                                    className="
                                        template__name
                                    "
                                >
                                    Blank Template
                                </span>

                                <p className='template__description'>
                                    Start from scratch with a blank template, giving you full control over your blok's design and functionality.
                                </p>
                            </ToggleGroup.Item>

                            {/* load other templates from the blok templates array */}
                            {
                                blokTemplates.map((template) => (
                                    <ToggleGroup.Item
                                        key={ template.value }
                                        value={ template.value }
                                        className='template'
                                    >
                                        <img 
                                            src={ template.image } 
                                            alt={ template.description}
                                            className="template__preview" 
                                        />

                                        <span className="template__name">
                                            { template.name }
                                        </span>

                                        <p className='template__description'>
                                            { template.description }
                                        </p>
                                    </ToggleGroup.Item>
                                ))
                            }
                        </ToggleGroup.Root>

                        <StepActions
                            className="
                                mt-4
                            "
                        >
                            <PreviousButton
                                onClick={ handlePrev }
                            >
                                Previous
                            </PreviousButton>

                            <NextButton
                                onClick={ handleNext }
                            >
                                Next
                            </NextButton>
                        </StepActions>
                    </Step>
                    
                    {/* default editor settings step */}
                    <Step
                        heading="Choose Default Editor Settings"
                        text="Customize your blok's editor settings to suit your workflow.
                         Set preferences for themes, auto-completion, and other options."
                    >
                        <div 
                            className="
                                create--form__default-options
                                flex
                                flex-col
                                gap-6 xl:gap-10
                                w-full xl:max-w-2/3
                                mx-auto
                                my-10 xl:my-15
                            "
                        >
                            {/* Default Editor Layout option */}
                            <ToggleOption
                                label="Editor Layout:"
                                options={[
                                    {
                                        value: "editor-top",
                                        content: <div className="flex items-center py-2">
                                            <TbLayoutNavbar className='text-2xl'/>
                                            <span className="ml-2">Editor on top</span>
                                        </div>
                                    },
                                    {
                                        value: "editor-left",
                                        content: <div className="flex items-center py-2">
                                            <TbLayoutSidebar className='text-2xl'/>
                                            <span className="ml-2">Editor on left</span>
                                        </div>
                                    },
                                    {
                                        value: "editor-right",
                                        content: <div className="flex items-center py-2">
                                            <TbLayoutSidebarRight className='text-2xl'/>
                                            <span className="ml-2">Editor on right</span>
                                        </div>
                                    },
                                ]}
                                value={ defaultEditorSettings.layout }
                                onValueChange={ (value) => handleDefaultSettingsChange("layout", value) }
                            />

                            {/* Default Theme option */}
                            <SelectOption
                                label="Default Theme:"
                                value={ defaultEditorSettings.theme }
                                onValueChange={ (value) => handleDefaultSettingsChange("theme", value) }
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

                            {/* Default Font Size option */}
                            <RangeOption
                                label="Font Size: "
                                onValueChange={ (value) => handleDefaultSettingsChange("font_size", value)}
                                defaultValue={ defaultEditorSettings.font_size }
                                min={8}
                                max={48}
                                step={1}
                                unit="px"
                            />

                            {/* Default Tab Size option */}
                            <ToggleOption
                                label="Tab Size:"
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
                                value={ defaultEditorSettings.tab_size }
                                onValueChange={ (value) => handleDefaultSettingsChange("tab_size", value) }
                            />

                            {/* Default Autocomplete option */}
                            <SwitchOption
                                label="Autocomplete"
                                checked={ defaultEditorSettings.autocomplete }
                                className="
                                    flex-row
                                    justify-between
                                "
                                onCheckedChange={ (value) => handleDefaultSettingsChange("autocomplete", value)}
                            />
                        </div>

                        <StepActions
                            className="
                                mt-4
                            "
                        >
                            <PreviousButton
                                onClick={ handlePrev }
                            >
                                Previous
                            </PreviousButton>

                            <NextButton
                                onClick={ handleNext }
                            >
                                Next
                            </NextButton>
                        </StepActions>
                    </Step>
                    
                    {/* review blok details step */}
                    <Step
                        heading="Review Blok Details"
                        text="Please review the details of your blok before creating it. 
                        Check the name, template, and settings to ensure everything is inline with 
                        your preferences, else, go back to edit details"
                    >
                        {/* editor review container */}
                        <div 
                            className="
                                create--form__blok-review-ctn
                                flex
                                flex-col
                                gap-6

                                [&>.create--form\_\_name-review]:flex
                                [&>.create--form\_\_name-review]:flex-col
                                [&>.create--form\_\_name-review]:gap-2.5
                                
                                [&_.create--form\_\_review-title]:font-medium
                                
                                [&_.create--form\_\_review-value]:p-4
                                [&_.create--form\_\_review-value]:px-5
                                [&_.create--form\_\_review-value]:bg-gray-600
                                [&_.create--form\_\_review-value]:rounded-md
                                [&_.create--form\_\_review-value]:font-medium
                                [&_.create--form\_\_review-value]:flex
                                [&_.create--form\_\_review-value]:flex-col
                                [&_.create--form\_\_review-value]:gap-2.5
                                [&_.create--form\_\_review-value]:text-white
                                
                                [&_.create--form\_\_review-value-image]:rounded-md
                                [&_.create--form\_\_review-value-image]:h-54
                                [&_.create--form\_\_review-value-image]:object-cover

                                [&_.create--form\_\_review-value-group]:flex
                                [&_.create--form\_\_review-value-group]:gap-2
                                
                                [&_.create--form\_\_review-group-value]:text-gray-200
                            "
                        >
                            {/* name review */}
                            <div className="create--form__name-review">
                                <span className="create--form__review-title">
                                    Blok name:
                                </span>

                                <div className="create--form__review-value">
                                    { blokName }
                                </div>
                            </div>
                            
                            {/* template review */}
                            <div className="create--form__name-review">
                                <span className="create--form__review-title">
                                    Blok template:
                                </span>

                                <div className="create--form__review-value">
                                    <span className="create--form__review-value-text">
                                        {
                                            selectedTemplate != "blank" ? blokTemplates.find(
                                                ( template ) => template.value == selectedTemplate
                                            ).name : "Blank Template"
                                        }
                                    </span>

                                    { selectedTemplate == "blank" && <BlankTemplatePreview
                                        className="
                                            mb-4
                                        "
                                    /> }

                                    { selectedTemplate != "blank" && <img 
                                        src={ blokTemplates.find(
                                                ( template ) => template.value == selectedTemplate
                                            ).image }
                                        className="create--form__review-value-image" 
                                    />}
                                </div>
                            </div>
                            
                            {/* blok default settings review */}
                            <div className="create--form__name-review">
                                <span className="create--form__review-title">
                                    Blok Default Settings:
                                </span>

                                <div className="create--form__review-value">
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Theme
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            { editorThemes.find(
                                                (theme) => theme.value === defaultEditorSettings.theme
                                                ).name 
                                            }
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Font Size
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            { defaultEditorSettings.font_size }px
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Tab Size
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            { defaultEditorSettings.tab_size } spaces
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Autocomplete
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            { defaultEditorSettings.autocomplete ? "On" : "Off" }
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Editor Layout
                                        </span>
                                        
                                        <div className="create--form__review-group-value">
                                            { 
                                                {
                                                    "editor-top": <div className="flex items-center">
                                                                    <TbLayoutNavbar className='text-2xl'/>
                                                                    <span className="ml-2">Editor on top</span>
                                                                </div>,
                                                    "editor-left": <div className="flex items-center">
                                                                    <TbLayoutSidebar className='text-2xl'/>
                                                                    <span className="ml-2">Editor on left</span>
                                                                </div>,
                                                    "editor-right": <div className="flex items-center">
                                                                    <TbLayoutSidebarRight className='text-2xl'/>
                                                                    <span className="ml-2">Editor on right</span>
                                                                </div>,
                                                }[ defaultEditorSettings.layout ] 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <StepActions
                            className="
                                mt-4
                            "
                        >
                            <PreviousButton
                                onClick={ handlePrev }
                            >
                                Previous
                            </PreviousButton>

                            <FinishButton>
                                Create Blok
                            </FinishButton>
                        </StepActions>
                    </Step>
                </SimpleCarousel.Track>
            </SimpleCarousel.Scroller>
        </Form.Root>
    )
}