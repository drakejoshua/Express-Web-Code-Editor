import { SimpleCarousel } from '../components/simpleCarousel';

export default function Dashboard() {
  return (
    <div>
        <SimpleCarousel.Root className="relative">
            {/* --- Scroller --- */}
            <SimpleCarousel.Scroller
                className="
                    overflow-x-auto
                    scroll-smooth
                    snap-x 
                    snap-mandatory
                    h-[80vh]
                "
            >
                {/* --- Track --- */}
                <SimpleCarousel.Track
                    className="
                        flex
                        transition-transform
                        duration-500
                        ease-in-out
                    "
                >
                    <SimpleCarousel.Item
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.1.0&auto=format&fit=crop"
                            alt="Image 1"
                            className="block w-full h-full object-cover"
                        />
                    </SimpleCarousel.Item>

                    <SimpleCarousel.Item
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <img
                            src="https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?ixlib=rb-4.1.0&auto=format&fit=crop"
                            alt="Image 2"
                            className="block w-full h-full object-cover"
                        />
                    </SimpleCarousel.Item>

                    <SimpleCarousel.Item
                        className="
                            flex-[0_0_100%]
                            snap-start
                        "
                    >
                        <img
                            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.1.0&auto=format&fit=crop"
                            alt="Image 3"
                            className="block w-full h-full object-cover"
                        />
                    </SimpleCarousel.Item>
                </SimpleCarousel.Track>
            </SimpleCarousel.Scroller>

            {/* --- Navigation Buttons --- */}
            <SimpleCarousel.Button
                direction="prev"
                className="
                    absolute
                    top-1/2
                    -translate-y-1/2
                    left-4
                    bg-white
                    px-2
                    py-1
                    rounded
                "
            >
                prev
            </SimpleCarousel.Button>

            <SimpleCarousel.Button
                direction="next"
                className="
                    absolute
                    top-1/2
                    -translate-y-1/2
                    right-4
                    bg-white
                    px-2
                    py-1
                    rounded
                "
            >
                next
            </SimpleCarousel.Button>

            {/* --- Tabs (Indicators) --- */}
            <SimpleCarousel.Tabs
                className="
                    flex
                    justify-center
                    gap-2
                    mt-4
                "
            >
                {({ index, isSelected }) => (
                    <SimpleCarousel.Tab
                        key={index}
                        index={index}
                        className={`
                            w-4
                            h-4
                            rounded-full
                            ${isSelected ? 'bg-gray-600' : 'bg-gray-300'}
                        `}
                    />
                )}
            </SimpleCarousel.Tabs>
        </SimpleCarousel.Root>
    </div>
  )
}
