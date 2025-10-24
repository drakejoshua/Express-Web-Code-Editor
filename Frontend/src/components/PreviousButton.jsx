import { forwardRef } from "react"
import Button from "./Button"

const PreviousButton = forwardRef(({children, className, ...props }, ref) => {
    return <Button 
                type="button"
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


export default PreviousButton