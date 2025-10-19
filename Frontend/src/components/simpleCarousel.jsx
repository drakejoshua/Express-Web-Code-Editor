import React, { useState } from 'react'

export default function SimpleCarousel() {
    const [ slideIndex, setSlideIndex ] = useState(0);

    const [ slides, setSlides ] = useState([1,2,3]);

    function handleNext() {
        setSlideIndex((prevIndex) => 
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    }

    function handlePrev() {
        setSlideIndex((prevIndex) => 
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    }

    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            setSlideIndex(index);
        }
    }

    return (
        <div 
            className='
                carousel
            '
        >
            <div 
                className='
                    carousel__scroller
                    overflow-x-auto
                    scroll-smooth
                    snap-x 
                    snap-mandatory
                    h-[80vh]
                '
            >
                <div 
                    className={`
                        carousel__track 
                        flex
                        transition-transform
                        duration-500
                        ease-in-out
                    `}
                    style={{
                        transform: `translateX(-${slideIndex * 100}%)`
                    }}
                >
                    <div 
                        className="
                            carousel__track--item
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop" alt="Image 1" 
                        className='block'/>
                    </div>
                    <div 
                        className="
                            carousel__track--item
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <img src="https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nfGVufDB8fDB8fHww&auto=format&fit=crop" alt="Image 1" 
                        className='block'/>
                    </div>
                    <div 
                        className="
                            carousel__track--item
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJ1aWxkaW5nfGVufDB8fDB8fHww&auto=format&fit=crop" alt="Image 1" 
                        className='block'/>
                    </div>
                </div>
            </div>

            <button 
                className="
                    carousel__btn--prev
                    absolute
                    top-1/2
                    translate-y-1/2
                    left-4
                    bg-white
                    px-2
                    py-1
                    rounded
                "
                onClick={ handlePrev }
            >
                prev
            </button>

            <button 
                className="
                    carousel__btn--next
                    absolute
                    top-1/2
                    translate-y-1/2
                    right-4
                    bg-white
                    px-2
                    py-1
                    rounded
                "
                onClick={ handleNext }
            >
                next
            </button>

            <div 
                className="
                    carousel__tabs
                    flex
                    justify-center
                    gap-2
                    mt-4
                "
            >
                {
                    slides.map((slide, index) => {
                        return (
                            <button 
                                className={`
                                    carousel__tabs--tab
                                    w-4
                                    h-4
                                    rounded-full
                                    ${slideIndex === index ? 'bg-gray-600' : 'bg-gray-300'}
                                `}
                                onClick={ () => goToSlide( index ) }
                            ></button>
                        )
                    })
                }
                
            </div>
        </div>
    )
}
