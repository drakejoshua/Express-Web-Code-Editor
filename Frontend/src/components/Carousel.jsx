// import component dependencies
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js'
import "highlight.js/styles/vs2015.css"

// import carousel components from react-aria-carousel
import { 
    Carousel as CarouselRoot,
    CarouselItem,
    CarouselScroller,
    CarouselButton,
    CarouselTabs,
    CarouselTab
} from 'react-aria-carousel'


// define Carousel component
const Carousel = React.forwardRef(({
    className,
    ...props
}, ref) => {

    // ref and state to manage typing effect in code example
    const typedElement = useRef(null);
    const [typedText, setTypedText] = useState("");

    // ref for next button in the carousel to programmatically 
    // move to next slide
    const nextButtonRef = useRef(null);
    
    // code string to be "typed" in the carousel code example
    const codeString = `<body class="text-white">
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <h1 class="text-2xl font-medium mb-2">Welcome !!!</h1>
    <p class="text-gray-300 mb-8">
        Experience code-editing in the browser
    </p>

    <button class="bg-blue-500 text-white px-3 py-1.5 rounded">
        Only Available At Codebloks
    </button>
</body>`;

    // useEffect to create typing effect for code example
    // on component mount
    useEffect(() => {
        // create typing effect using text from codeString and
        // a setInterval to simulate typing by updating state 'typedText'

        // index to track current typing position in codeString
        let i = 0;

        // set interval to update typedText every 40ms
        const interval = setInterval(() => {

            // if i is less than or equal to codeString length,
            // update typedText with substring of codeString up to i
            if (i <= codeString.length) {
                setTypedText(codeString.slice(0, i));
                i++;
            } else {
                // clear interval when done typing
                clearInterval(interval);

                // after typing is done, wait for 1 seconds and
                // simulate click on next button to move carousel to next slide
                setTimeout(() => {
                    if (nextButtonRef.current) {
                        nextButtonRef.current.click();
                    }
                }, 1000);
            }
        }, 40);

        return () => clearInterval(interval);
    }, []);

    // useEffect to highlight the typed code using highlight.js
    // whenever typedText state updates
    useEffect(() => {
        // highlight the code using highlight.js

        if (typedElement.current) {
            // use 'html' to force right language with syntax highlighting
            const result = hljs.highlight(typedText, { language: "html" }).value;

            // update the innerHTML of the typedElement with the highlighted code
            typedElement.current.innerHTML = result
        }
    }, [typedText]);


  return (
    // carousel root component wrapping the entire carousel
    <CarouselRoot
        mouseDragging
        className={`
            carousel
            bg-neutral-100 dark:bg-neutral-950
            p-16 px-20
            ${className}
        `}
        {...props}
    >
        {/* hidden carousel button to move to next slide */}
        <CarouselButton dir='next' ref={nextButtonRef}/>

        {/* carousel scroller containing the slides */}
        <CarouselScroller
            className='
                carousel__scroller
                flex
                overflow-x-hidden
                snap-mandatory
                snap-x
                scroll-smooth
                w-2/3
                mx-auto
            '
        >
            {/* carousel item for code example */}
            <CarouselItem 
                index={0}
                className='
                    carousel__scroller--item
                    flex-[0_0_100%]
                    snap-start
                '
            >
                {/* slide heading */}
                <h1
                    className="
                        carousel__scroller--item-heading
                        font-bold
                        text-4xl
                        text-gray-900 dark:text-white
                        leading-12
                        w-3/4
                        text-center
                        mx-auto
                    "
                >
                    Run code in your browser, Share it with anyone.
                </h1>

                {/* slide code example */}
                <div 
                    className="
                        carousel__scroller--item-code-ctn 
                        mt-8
                        rounded-md
                        overflow-hidden
                    "
                >
                    <div 
                        className="
                            carousel__scroller--item-code-header
                            bg-gray-700
                            text-white
                            flex
                            gap-3
                            items-center
                            p-2.5 px-4
                        "
                    >
                        <div 
                            className="
                                carousel__scroller--item-header-buttons
                                flex
                                gap-2
                            "
                        >
                            <div 
                                className="
                                    carousel__scroller--header-red-button
                                    bg-red-500 hover:bg-red-400
                                    h-4
                                    w-4
                                    rounded-full
                                "
                            ></div>
                            <div 
                                className="
                                    carousel__scroller--header-yellow-button
                                    bg-yellow-500 hover:bg-yellow-400
                                    h-4
                                    w-4
                                    rounded-full
                                "
                            ></div>
                            <div 
                                className="
                                    carousel__scroller--header-green-button
                                    bg-green-500 hover:bg-green-400
                                    h-4
                                    w-4
                                    rounded-full
                                "
                            ></div>
                        </div>

                        <div className="carousel__scroller--item-header-filename">
                            index.html
                        </div>
                    </div>

                    
                    <div
                        className="
                            carousel__scroller--item-code-body
                            hljs
                            whitespace-pre-wrap
                            font-mono
                            p-6
                            min-h-28
                        "
                        ref={typedElement}
                    >
                        { typedText }
                    </div>
                </div>
            </CarouselItem>


            {/* carousel item for live preview */}
            <CarouselItem 
                index={1}
                className='
                    carousel__scroller--item
                    flex-[0_0_100%]
                    snap-start
                    self-stretch
                    flex flex-col
                '
            >
                {/* slide heading */}
                <h1
                    className="
                        carousel__scroller--item-heading
                        font-bold
                        text-4xl
                        text-gray-900 dark:text-white
                        leading-12
                        w-3/4
                        text-center
                        mx-auto
                    "
                >
                    See live code execution results as you type.
                </h1>

                {/* slide live preview */}
                <div 
                    className="
                        carousel__scroller--item-preview-ctn
                        mt-8
                        rounded-md
                        overflow-hidden
                        flex-grow
                        flex
                        flex-col
                    "
                >
                    <div 
                        className="
                            carousel__scroller--item-code-header
                            bg-gray-700
                            text-white
                            flex
                            gap-3
                            items-center
                            p-2.5 px-4
                        "
                    >
                        <div 
                            className="
                                carousel__scroller--item-header-buttons
                                flex
                                gap-2
                            "
                        >
                            <div 
                                className="
                                    carousel__scroller--header-red-button
                                    bg-red-500 hover:bg-red-400
                                    h-4
                                    w-4
                                    rounded-full
                                "
                            ></div>
                            <div 
                                className="
                                    carousel__scroller--header-yellow-button
                                    bg-yellow-500 hover:bg-yellow-400
                                    h-4
                                    w-4
                                    rounded-full
                                "
                            ></div>
                            <div 
                                className="
                                    carousel__scroller--header-green-button
                                    bg-green-500 hover:bg-green-400
                                    h-4
                                    w-4
                                    rounded-full
                                "
                            ></div>
                        </div>

                        <div className="carousel__scroller--item-header-filename">
                            code preview
                        </div>
                    </div>

                    <iframe
                        title="Live Preview"
                        className='
                            carousel__scroller--item-preview-iframe
                            w-full 
                            h-full
                            p-4
                            bg-gray-800
                            flex-grow
                        '
                        srcDoc={ codeString }
                    ></iframe>
                </div>
            </CarouselItem>
        </CarouselScroller>


        {/* carousel tabs for navigation */}
        <CarouselTabs
            className='
                carousel__tabs
                flex
                gap-2
                justify-center
                mt-4
            '
        >
            {/* carousel tab for each slide - created by mapping over the pages which */}
            {/* are provided by the carousel tabs component */}
            {(page) => <CarouselTab 
                    key={page.index} 
                    index={page.index} 
                    className={`
                        carousel__tabs--tab
                        h-3
                        w-3
                        rounded-full
                        bg-gray-700 ${page.isSelected ? 'bg-gray-950' : ''}
                        dark:bg-neutral-400 ${page.isSelected ? 'dark:bg-white' : ''}
                        cursor-pointer
                    `}
                />
            }
        </CarouselTabs>
    </CarouselRoot>
  )
})



export default Carousel
