import { SimpleCarousel } from "./simpleCarousel";

export default function Step({ heading, text, children }) {
    return (
        <SimpleCarousel.Item
            className="
                flex-[0_0_100%]
                snap-start
                step
            "
        >
            { heading && <h2 className="step__heading">
                { heading }
            </h2> }

            { text && <p className="step__text">
                { text }
            </p> }

            { children }
        </SimpleCarousel.Item>
    )
}