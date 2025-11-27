// WideLayout.jsx
// A layout component that provides a wide screen layout for its children.
// it's mostly used in usjer-facing pages such as editor, dashboard, etc

import { forwardRef } from "react"



// define and export WideLayout component
const WideLayout = forwardRef(({ children }, ref) => {
    return (
        <div
            ref={ref}
            className="
                h-[100dvh]
                text-gray-900 dark:text-white
                bg-white dark:bg-gray-900
                overflow-auto
                px-3.5 lg:px-6
            "
        >
            {children}
        </div>
    )
})


export default WideLayout
