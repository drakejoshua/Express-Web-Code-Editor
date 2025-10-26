import { SimpleCarousel, useCarousel } from '../components/simpleCarousel'
import { Form, Select, Slider, Switch, ToggleGroup } from 'radix-ui'
import MultiStepTabs from '../components/MultiStepTabs'
import TextField from '../components/TextField'
import StepActions from '../components/StepActions'
import PreviousButton from '../components/PreviousButton'
import NextButton from '../components/NextButton'
import Step from '../components/Step'
import FinishButton from '../components/FinishButton'
import { blokTemplates } from '../utils/blok_templates'
import { FaArrowDown, FaArrowUp, FaCaretDown, FaCaretUp, FaChevronDown, FaFileCode } from 'react-icons/fa6'
import SelectOption from '../components/SelectOption'
import RangeOption from '../components/RangeOption'
import ToggleOption from '../components/ToggleOption'
import SwitchOption from '../components/SwitchOption'

export default function Create() {
    return (
        <div 
            className='
                create
                h-screen
                text-gray-900 dark:text-white
                bg-white dark:bg-gray-900
                overflow-auto
                px-2.5 lg:px-6 pb-12
            '
        >
            <h1 
                className="
                    create--heading
                    text-gray-900 dark:text-white
                    text-3xl
                    font-semibold
                    text-center
                    capitalize
                    mt-15
                    mb-12
                "
            >
                create a new blok
            </h1>

            <SimpleCarousel.Root>
                <MultiStepForm />
            </SimpleCarousel.Root>
        </div>
    )
}


function MultiStepForm() {
    const { handleNext, handlePrev } = useCarousel()
    return (
        <Form.Root
            className="
                create--form
                w-3/5
                flex
                flex-col
                items-center
                mx-auto
            "
        >
            <MultiStepTabs 
                className="
                    w-full max-w-[700px]
                    mb-10
                "
            />

            <SimpleCarousel.Scroller
                className="
                    overflow-x-hidden
                    scroll-smooth
                    snap-x 
                    snap-mandatory
                "
            >
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
                        <TextField
                            label="Enter a blok name"
                            name='blok_name'
                            emptyValidationMessage="Please enter a blok name"
                        />

                        <StepActions
                            className="
                                mt-4
                            "
                        >
                            <NextButton
                                onClick={ handleNext}
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
                        <ToggleGroup.Root
                            type='single'
                            className='
                                create--form__template-options
                                grid
                                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                                gap-6
                                justify-center
                                
                                [&_.template]:border-2
                                [&_.template]:border-gray-300 [&_.template]:dark:border-gray-700
                                [&_.template]:p-4
                                [&_.template]:py-6
                                [&_.template]:rounded-lg
                                [&_.template]:data-[state=on]:border-gray-400

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
                                <div 
                                    className="
                                        template__blank-preview
                                        h-52
                                        flex
                                        flex-col
                                        justify-center
                                        items-center
                                        gap-2
                                        bg-gray-100 dark:bg-gray-800
                                        mb-4
                                        rounded-md
                                    "
                                >
                                    <FaFileCode 
                                        className='
                                            template__preview-icon
                                            text-2xl
                                            text-gray-500 dark:text-gray-400
                                        ' 
                                    />

                                    <span className="template__preview-text">
                                        Blank Template
                                    </span>
                                </div>

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
                                gap-10
                                w-full
                                max-w-1/3
                            "
                        >
                            <SelectOption
                                label="Default Theme:"
                                type="grouped"
                                placeholder="Select a theme"
                                options={
                                    {
                                        "light themes": [
                                            {
                                                text: "VS Code Light",
                                                value: "vsc_light"
                                            },
                                            {
                                                text: "Github Light",
                                                value: "github_light"
                                            },
                                            {
                                                text: "High Contrast Light",
                                                value: "hc_light"
                                            },
                                        ],

                                        "dark themes": [
                                            {
                                                text: "VS Code Dark",
                                                value: "vsc_dark"
                                            },
                                            {
                                                text: "Github Dark",
                                                value: "github_dark"
                                            },
                                            {
                                                text: "High Contrast Dark",
                                                value: "hc_dark"
                                            },
                                        ]
                                    }
                                }
                            />

                            <RangeOption
                                label="Font Size: "
                                defaultValue={[16]}
                                min={8}
                                max={48}
                                step={1}
                            />

                            <ToggleOption
                                label="Tab Size:"
                                options={[
                                    {
                                        value: "2",
                                        content: "2"
                                    },
                                    {
                                        value: "4",
                                        content: "4"
                                    },
                                    {
                                        value: "6",
                                        content: "6"
                                    },
                                ]}
                            />

                            <SwitchOption
                                label="Autocomplete"
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
                                
                                [&_.create--form\_\_review-value-image]:rounded-md
                                [&_.create--form\_\_review-value-image]:h-54
                                [&_.create--form\_\_review-value-image]:object-cover

                                [&_.create--form\_\_review-value-group]:flex
                                [&_.create--form\_\_review-value-group]:gap-2
                                
                                [&_.create--form\_\_review-group-value]:text-gray-300
                            "
                        >
                            <div className="create--form__name-review">
                                <span className="create--form__review-title">
                                    Blok name:
                                </span>

                                <div className="create--form__review-value">
                                    new_blok
                                </div>
                            </div>
                            
                            <div className="create--form__name-review">
                                <span className="create--form__review-title">
                                    Blok template:
                                </span>

                                <div className="create--form__review-value">
                                    <span className="create--form__review-value-text">
                                        Blank Template
                                    </span>

                                    <div 
                                        className="
                                            template__blank-preview
                                            h-52
                                            flex
                                            flex-col
                                            justify-center
                                            items-center
                                            gap-2
                                            bg-gray-100 dark:bg-gray-800
                                            mb-4
                                            rounded-md
                                        "
                                    >
                                        <FaFileCode 
                                            className='
                                                template__preview-icon
                                                text-2xl
                                                text-gray-500 dark:text-gray-400
                                            ' 
                                        />

                                        <span className="template__preview-text">
                                            Blank Template
                                        </span>
                                    </div>

                                    <img 
                                        src={ blokTemplates[0].image }
                                        className="create--form__review-value-image" 
                                    />
                                </div>
                            </div>
                            
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
                                            VS Code Dark
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Font Size
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            15px
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Tab Size
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            2 spaces
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Autocomplete
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            On
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Editor Layout
                                        </span>
                                        
                                        <span className="create--form__review-group-value">
                                            editor_top
                                        </span>
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