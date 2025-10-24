import { SimpleCarousel, useCarousel } from '../components/simpleCarousel'
import { Form, ToggleGroup } from 'radix-ui'
import MultiStepTabs from '../components/MultiStepTabs'
import TextField from '../components/TextField'
import StepActions from '../components/StepActions'
import PreviousButton from '../components/PreviousButton'
import NextButton from '../components/NextButton'
import Step from '../components/Step'
import FinishButton from '../components/FinishButton'

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
                        <ToggleGroup.Root>
                            <ToggleGroup.Item>
                                
                            </ToggleGroup.Item>
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
                        your preferences."
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