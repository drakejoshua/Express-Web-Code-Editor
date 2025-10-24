// NextButton.jsx
// This component renders a next button for navigating forward in a multi-step form.
// It uses the Button component and applies specific styles to ensure
// it expands to fill available space within its container.



// import component dependencies
import { forwardRef } from "react"
import Button from "./Button"


// define NextButton component
const NextButton = forwardRef(({children, className, ...props }, ref) => {
    return <Button 
                type="button"

                // apply default and custom classes to the button
                className={`
                    flex-grow
                    ${ className || "" }
                `}
                ref={ ref }
                { ...props }
            >
                { children }
            </Button>
})


// export NextButton component for use in 
// other parts of the application
export default NextButton