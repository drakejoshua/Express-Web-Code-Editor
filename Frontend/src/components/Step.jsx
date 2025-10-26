// Step.jsx
// This component represents a single step in a multi-step form or process in the app
// It uses the SimpleCarousel component to structure the step content,
// including an optional heading, descriptive text, and additional children content.



// import component dependencies
import { SimpleCarousel } from "./simpleCarousel";


// define Step component
export default function Step({ heading, text, children }) {
    return (
        <SimpleCarousel.Item
            // apply default and custom classes to the step item
            className="
                flex-[0_0_100%]
                snap-start
                step
                overflow-hidden
                p-1
            "
        >
            {/* heading for the step if provided */}
            { heading && <h2 
                className="
                    step__heading
                    text-2xl
                    text-center
                    text-gray-800 dark:text-gray-100
                    mb-2.5
                "
            >
                { heading }
            </h2> }

            {/* descriptive text for the step if provided */}
            { text && <p 
                className="
                    step__text
                    text-center
                    mx-auto
                    mb-6
                    w-full lg:w-2/4
                    text-gray-600 dark:text-gray-300
                "
            >
                { text }
            </p> }

            {/* additional content for the step if provided */}
            { children }
        </SimpleCarousel.Item>
    )
}