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
import { FaArrowDown, FaArrowUp, FaCaretUp, FaFileCode } from 'react-icons/fa6'

export default function Create() {
    return (
        <div 
            className='
                create
            '
        >
            <h1 className="create--heading">
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
        <Form.Root>
            <MultiStepTabs />

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
                        >
                            {/* blank template */}
                            <ToggleGroup.Item
                                value='blank'
                            >
                                <div className="template__blank-preview">
                                    <FaFileCode className='template__preview-icon' />

                                    <span className="template__preview-text">
                                        Blank Template
                                    </span>
                                </div>

                                <span className="template__name">
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
                        <div className="create--form__default-options">
                            <div className="select-option">
                                <span className="select-option__label">
                                    Default Theme:
                                </span>

                                <Select.Root className="select-option__select">
                                    <Select.Trigger className="select__trigger">
                                        <Select.Value placeholder="Select a theme" />
                                        <Select.Icon className="select__icon">
                                            <FaCaretUp />
                                        </Select.Icon>
                                    </Select.Trigger>

                                    <Select.Portal>
                                        <Select.Content>
                                            <Select.ScrollUpButton className="select__scroll-button">
                                                <FaArrowUp />
                                            </Select.ScrollUpButton>

                                            <Select.Viewport>
                                                <Select.Group>
                                                    <Select.Label>
                                                        Light Themes
                                                    </Select.Label>

                                                    <Select.Item value="light" className="select__item">
                                                        VS Code Light
                                                    </Select.Item>
                                                    
                                                    <Select.Item value="light" className="select__item">
                                                        Github Light
                                                    </Select.Item>

                                                    <Select.Item>
                                                        High Contrast Light
                                                    </Select.Item>
                                                </Select.Group>
                                                
                                                <Select.Group>
                                                    <Select.Label>
                                                        Dark Themes
                                                    </Select.Label>

                                                    <Select.Item value="dark" className="select__item">
                                                        VS Code Dark
                                                    </Select.Item>

                                                    <Select.Item value="dark" className="select__item">
                                                        Github Dark
                                                    </Select.Item>
                                                    
                                                    <Select.Item value="dark" className="select__item">
                                                        High Contrast Dark
                                                    </Select.Item>
                                                </Select.Group>
                                            </Select.Viewport>

                                            <Select.ScrollDownButton className="select__scroll-button">
                                                <FaArrowDown />
                                            </Select.ScrollDownButton>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            </div>

                            <div className="range-option">
                                <span className="range-option__label">
                                    Font Size:
                                </span>

                                <Slider.Root
                                    defaultValue={[16]}
                                    min={8}
                                    max={48}
                                    step={1}
                                >
                                    <Slider.Track className="slider__track">
                                        <Slider.Range className="slider__range" />
                                    </Slider.Track>
                                    
                                    <Slider.Thumb className="slider__thumb" />
                                </Slider.Root>
                            </div>

                            <div className="toggle-option">
                                <span className="toggle-option__label">
                                    Tab Size:
                                </span>

                                <ToggleGroup.Root type="single">
                                    <ToggleGroup.Item value='2'>
                                        2
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value='4'>
                                        4
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value='6'>
                                        6
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>

                            <div className="switch-option">
                                <span className="switch-option">
                                    Autocompletion
                                </span>

                                <Switch.Root>
                                    <Switch.Thumb className="switch__thumb" />
                                </Switch.Root>
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
                        <div className="create--form__blok-review-ctn">
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
                                        
                                        <span className="create--form__review-group-title">
                                            VS Code Dark
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Font Size
                                        </span>
                                        
                                        <span className="create--form__review-group-title">
                                            15px
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Tab Size
                                        </span>
                                        
                                        <span className="create--form__review-group-title">
                                            2 spaces
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Autocomplete
                                        </span>
                                        
                                        <span className="create--form__review-group-title">
                                            On
                                        </span>
                                    </div>
                                    
                                    <div className="create--form__review-value-group">
                                        <span className="create--form__review-group-title">
                                            Editor Layout
                                        </span>
                                        
                                        <span className="create--form__review-group-title">
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