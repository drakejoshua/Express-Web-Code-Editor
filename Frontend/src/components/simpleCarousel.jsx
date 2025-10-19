import React, { 
    useContext, 
    useEffect,  
    useState,
    createContext,
    forwardRef,
} from 'react'

    
const CarouselContext = createContext();

export function useCarousel() {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error('useCarousel must be used within a CarouselRoot');
    }

    return context;
}


const CarouselRoot = forwardRef(({ className, children, ...props }, ref) => {
    const [ slideIndex, setSlideIndex ] = useState(0);

    const [ slides, setSlides ] = useState([]);

    function handleNext() {
        setSlideIndex((prevIndex) => 
            prevIndex === slides.length - 1 ? prevIndex : prevIndex + 1
        );
    }

    function handlePrev() {
        setSlideIndex((prevIndex) => 
            prevIndex === 0 ? prevIndex : prevIndex - 1
        );
    }

    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            setSlideIndex(index);
        }
    }

    function registerSlides( count ) {
        setSlides( ( prevSlides ) => {
            if ( prevSlides.length === count ) {
                return prevSlides;
            }

            return Array.from({ length: count });
        });
    }

    return (
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

const CarouselScroller = forwardRef(({ children, className, ...props }, ref) => {
    return <div className={`carousel__scroller ${className || ""}`} ref={ref} {...props}>{ children }</div>;
})

const CarouselTrack = forwardRef(({ children, className, style, ...props }, ref) => {
    const { slideIndex, registerSlides } = useCarousel();
    const itemCount = React.Children.count(children);

    useEffect(() => {
        registerSlides(itemCount);
    }, [itemCount]);

    return <div 
                className={`
                    carousel__track 
                    ${className || ""}
                `} 
                ref={ref} 
                {...props}
                style={{
                    ...(style || {}),
                    transform: `translateX(-${slideIndex * 100}%)`
                }}
            >
                { children }
            </div>
})

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

const CarouselButton = forwardRef(({ direction, onClick, className, children, ...props }, ref) => {
    const { handleNext, handlePrev } = useCarousel();

    function handleClick(e) {
        if (direction === 'next') {
            handleNext();
        } else if (direction === 'prev') {
            handlePrev();
        }
        
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

const CarouselTabs = forwardRef(({ children, className, ...props }, ref) => {
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
                typeof children === 'function'
                ? slides.map((slide, index) => {
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

const CarouselTab = forwardRef(({ index, onClick, className, children, ...props }, ref) => {
    const { goToSlide } = useCarousel();

    function handleClick(e) {
        goToSlide(index);

        if (onClick) {
            onClick( e);
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
            onClick={ handleClick }
        >
            { children }
        </button>
    );
})


export const SimpleCarousel = {
    Root: CarouselRoot,
    Scroller: CarouselScroller,
    Track: CarouselTrack,
    Item: CarouselItem,
    Button: CarouselButton,
    Tabs: CarouselTabs,
    Tab: CarouselTab,
}