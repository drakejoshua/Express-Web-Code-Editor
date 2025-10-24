// MultiStepTabs.jsx
// This component renders a multi-step tab indicator for a form using a carousel context.
// Each step is represented by a dot, and lines between dots indicate progress.
// The component uses the SimpleCarousel and useCarousel from simpleCarousel.jsx.



// import component dependencies
import { SimpleCarousel, useCarousel } from './simpleCarousel'


// define MultiStepTabs component
export default function MultiStepTabs({ className }) {
    // retrieve slides from carousel context
    const { slides } = useCarousel()

    return (
        <SimpleCarousel.Tabs
            // apply default and custom classes to the tabs container
            className={`
                flex
                justify-center
                items-center
                ${className || ""}
            `}
        >
            {({ index, isSelected, activeIndex }) => {
                return (
                    <>
                        {/* form step indicator using <SimpleCarousel.Tab> */}
                        <SimpleCarousel.Tab
                            index={index}
                            disabled
                            className={`
                                w-4
                                h-4
                                rounded-full
                                ${ index <= activeIndex ? 
                                    'bg-blue-600 dark:bg-blue-500' : 
                                    'bg-gray-300'}
                            `}
                        />

                        {/* form step connector lines, show progress between steps */}
                        { index < slides.length - 1 && <div 
                            className={`
                                h-1
                                flex-grow
                                ${index < activeIndex ? 
                                    'bg-blue-600 dark:bg-blue-500' : 
                                    'bg-gray-300'}
                            `}
                            key={index}
                        ></div>}
                    </>
                )
            }}
        </SimpleCarousel.Tabs>
    )
}
