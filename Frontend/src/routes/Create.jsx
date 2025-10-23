import React from 'react'
import { SimpleCarousel } from '../components/simpleCarousel'
import { Form } from 'radix-ui'
import MultiStepTabs from '../components/MultiStepTabs'

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
    return (
        <Form.Root>
            <MultiStepTabs />
        </Form.Root>
    )
}