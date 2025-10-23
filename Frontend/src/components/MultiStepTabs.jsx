import { SimpleCarousel, useCarousel } from './simpleCarousel'


export default function MultiStepTabs({ className }) {
    const { slides } = useCarousel()

    return (
        <SimpleCarousel.Tabs
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
