// simpleCarousel.jsx
// A simple and reusable carousel component built with React.
// It provides basic carousel functionality including navigation
// buttons, slide tracking, and tab indicators. The carousel
// components are designed to be flexible and customizable for
// various use cases within the application.
// To use the carousel, import the SimpleCarousel object and select
// the desired sub-components ( Root, Scroller, Track, Item, Button, Tabs, Tab )
// for your implementation.



// import component dependencies
import React, { 
    useContext, 
    useEffect,  
    useState,
    createContext,
    forwardRef,
} from 'react'

// create Carousel context for managing carousel state and actions
const CarouselContext = createContext();


// custom hook to access carousel context
export function useCarousel() {
    // retrieve carousel context
    const context = useContext(CarouselContext);

    // check if context is available, if not, throw an error stating
    // that the hook must be used within a CarouselRoot
    if (!context) {
        throw new Error('useCarousel must be used within a CarouselRoot');
    }

    // return the carousel context
    return context;
}


// define CarouselRoot component
// This component serves as the main container for the carousel and it's 
// functionality
const CarouselRoot = forwardRef(({ className, children, ...props }, ref) => {
    // state to the index of the currently active/visible slide
    const [ slideIndex, setSlideIndex ] = useState(0);

    // state to track the registered slides in the carousel, slides are
    // registered based on the number of CarouselItem components rendered
    const [ slides, setSlides ] = useState([]);

    // handleNext() - function to navigate to the next slide
    // by incrementing the slideIndex state, ensuring it doesn't exceed
    // the total number of slides
    function handleNext() {
        setSlideIndex((prevIndex) => 
            prevIndex === slides.length - 1 ? prevIndex : prevIndex + 1
        );
    }

    // handlePrev() - function to navigate to the previous slide
    // by decrementing the slideIndex state, ensuring it doesn't go below 0/last slide
    function handlePrev() {
        setSlideIndex((prevIndex) => 
            prevIndex === 0 ? prevIndex : prevIndex - 1
        );
    }

    // goToSlide() - function to navigate directly to a specific slide
    // based on the provided index. It updates the slideIndex state and
    // validates the index to ensure it's within bounds( 0 to slides.length - 1 )
    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            setSlideIndex(index);
        }
    }

    // registerSlides() - function to register the slides in the carousel
    // based on the number of CarouselItem components rendered. It updates
    // the slides state with an array of the specified count
    function registerSlides( count ) {
        setSlides( ( prevSlides ) => {
            // if the number of slides hasn't changed, return previous slides
            // to avoid unnecessary re-renders/infinite loops
            if ( prevSlides.length === count ) {
                return prevSlides;
            }

            // if the number of slides has changed, return a new array
            return Array.from({ length: count });
        });
    }

    return (
        // provide carousel context to child components with the slideIndex,
        // navigation functions, slide registration function, and slides array
        <CarouselContext.Provider value={{ 
            slideIndex, 
            goToSlide,
            handleNext,
            handlePrev,
            registerSlides,
            slides
        }}>
            <div 
                className={`
                    carousel 
                    ${className || ""}
                `}
                ref={ref}
                {...props}
            >
                { children }
            </div>
        </CarouselContext.Provider>
    )
})


// define CarouselScroller component
// This component serves as a wrapper for the carousel's scrolling area
const CarouselScroller = forwardRef(({ children, className, ...props }, ref) => {
    // render scroller div with forwarded ref and passed classname/props
    return <div className={`carousel__scroller ${className || ""}`} ref={ref} {...props}>{ children }</div>;
})


// define CarouselTrack component
// This component contains the carousel items, handles the slide
// translation based on the current slideIndex state and registers 
// the carousel items in the slides state
const CarouselTrack = forwardRef(({ children, className, style, ...props }, ref) => {
    // retrieve the slideIndex and registerSlides function from the carousel context
    const { slideIndex, registerSlides } = useCarousel();

    // count the number of CarouselItem children to register slides
    const itemCount = React.Children.count(children);

    // register slides on mount and whenever the itemCount changes
    // ( i.e. new items added/removed )
    useEffect(() => {
        registerSlides(itemCount);
    }, [itemCount]);

    return <div 
                // apply default and custom classes
                className={`
                    carousel__track 
                    ${className || ""}
                `} 
                ref={ref} 
                {...props}

                // apply dynamic inline styles for slide translation based on slideIndex state
                style={{
                    ...(style || {}),
                    transform: `translateX(-${slideIndex * 100}%)`
                }}
            >
                { children }
            </div>
})


// define CarouselItem component
// This component represents an individual item/slide within the carousel
// It is to be used as a child of CarouselTrack
const CarouselItem = forwardRef(({ children, className, ...props }, ref) => {
    return (
        <div
            className={`
                    carousel__track--item
                    ${className || ""}
                `}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
});


// define CarouselButton component
// This component represents a navigation button for the carousel
// It can be used to navigate to the next or previous slide based on
// the "direction" prop
const CarouselButton = forwardRef(({ direction, onClick, className, children, ...props }, ref) => {
    // retrieve navigation functions from the carousel context
    const { handleNext, handlePrev } = useCarousel();

    // handleClick() - function to handle button click events and
    // navigate to the appropriate slide based on the "direction" prop
    function handleClick(e) {
        // check direction prop and call corresponding navigation function
        if (direction === 'next') {
            handleNext();
        } else if (direction === 'prev') {
            handlePrev();
        }
        
        // call any additional onClick handler passed via props
        if (onClick) {
            onClick(e);
            return;
        }

    }

    return (
        <button
            ref={ref}
            className={`carousel__btn ${className || ''}`}
            onClick={handleClick}
            {...props}
        >
            { children}
        </button>
    );
});


// define CarouselTabs component
// This component serves as a container for carousel tab buttons
// It can render children directly or use a render prop function
// to dynamically generate tabs based on the registered slides
const CarouselTabs = forwardRef(({ children, className, ...props }, ref) => {
    // retrieve slides array and current slideIndex from carousel context
    const { slides, slideIndex } = useCarousel();

    return (
        <div 
            className={`
                carousel__tabs
                ${className || ''}
            `}
            ref={ref}
            {...props}
        >
            { 
                // check if children is a function (render prop) or normal children,
                // if function, call it with slide info for each registered slide/item
                // if normal children, simply render them as they are
                typeof children === 'function'
                ?   slides.map((slide, index) => {
                        const slideInfo = {
                            index,
                            isSelected: index === slideIndex,
                            activeIndex: slideIndex
                        }
                            
                        return (children(slideInfo));
                    }) 
                : children
            }
        </div>
    );
})


// define CarouselTab component
// This component represents an individual tab button for the carousel
// It allows direct navigation to a specific slide based on the "index" prop
const CarouselTab = forwardRef(({ index, onClick, className, children, ...props }, ref) => {
    // retrieve goToSlide function from carousel context
    const { goToSlide } = useCarousel();

    // handleClick() - function to handle tab button click events
    // and navigate to the specified slide index
    function handleClick(e) {
        // navigate to the specified slide index
        goToSlide(index);

        // call any additional onClick handler passed via props
        if (onClick) {
            onClick(e);
        }
    }

    return (
        <button 
            className={`
                carousel__tabs--tab 
                ${className || ''}
            `} 
            ref={ref} 
            {...props}

            // attach click handler to navigate to the specified slide
            onClick={ handleClick }
        >
            { children }
        </button>
    );
})


// export SimpleCarousel object containing all carousel components
// for specific import and usage in other parts of the application
export const SimpleCarousel = {
    Root: CarouselRoot,
    Scroller: CarouselScroller,
    Track: CarouselTrack,
    Item: CarouselItem,
    Button: CarouselButton,
    Tabs: CarouselTabs,
    Tab: CarouselTab,
}