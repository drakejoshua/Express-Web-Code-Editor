import React from 'react'
import { SimpleCarousel } from '../components/simpleCarousel'
import { Form } from 'radix-ui'
import MultiStepTabs from '../components/MultiStepTabs'
import TextField from '../components/TextField'
import StepActions from '../components/StepActions'
import PreviousButton from '../components/PreviousButton'
import NextButton from '../components/NextButton'

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

function Step({ heading, text, children }) {
    <SimpleCarousel.Item>
        { heading && <h2 className="create--form__heading">
            { heading }
        </h2> }

        { text && <p className="create--form__text">
            { text }
        </p> }

        { children }
    </SimpleCarousel.Item>
}


function MultiStepForm() {
    return (
        <Form.Root>
            <MultiStepTabs />

            <SimpleCarousel.Scroller>
                <SimpleCarousel.Track>
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
                            <NextButton>
                                Next
                            </NextButton>
                        </StepActions>
                    </Step>
                </SimpleCarousel.Track>
            </SimpleCarousel.Scroller>
        </Form.Root>
    )
}