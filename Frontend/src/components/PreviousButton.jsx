// PreviousButton.jsx
// This component renders a previous button for navigating back in a multi-step form.
// It uses the Button component and applies specific styles to ensure
// it expands to fill available space within its container.



// import component dependencies
import { forwardRef } from "react"
import Button from "./Button"


// define PreviousButton component
const PreviousButton = forwardRef(({children, className, ...props }, ref) => {
    return <Button 
                type="button"
                // apply default and custom classes to the button
                className={`
                    flex-grow
                    bg-gray-600 hover:bg-gray-500
                    dark:bg-gray-600 hover:dark:bg-gray-500
                    ${ className || "" }
                `}
                {...props}
                ref={ref}
            >
                { children }
            </Button>
})


// export PreviousButton component for use in 
// other parts of the application
export default PreviousButton