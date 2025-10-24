import { forwardRef } from "react"
import Button from "./Button"

const NextButton = forwardRef(({children, className, ...props }, ref) => {
    return <Button 
                type="button"
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


export default NextButton