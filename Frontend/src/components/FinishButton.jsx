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