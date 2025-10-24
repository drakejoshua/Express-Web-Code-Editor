import { forwardRef } from "react"
import Button from "./Button"

const FinishButton = forwardRef(({children, className, ...props }, ref) => {
    return <Button 
                type="submit"
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


export default FinishButton