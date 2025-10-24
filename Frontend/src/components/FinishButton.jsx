// FinishButton.jsx
// This component renders a finish button for submitting a multi-step form.
// It uses the Button component and applies specific styles to ensure
// it expands to fill available space within its container.



// import component dependencies
import { forwardRef } from "react"
import Button from "./Button"


// define FinishButton component
const FinishButton = forwardRef(({children, className, ...props }, ref) => {
    return <Button 
                type="submit"

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


// export FinishButton component for use in 
// other parts of the application
export default FinishButton