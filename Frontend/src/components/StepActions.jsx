export default function StepActions({ className, children }) {
    return (
        <div 
            className={`
                step-actions
                flex
                gap-2
                ${ className || "" }
            `}
        >
            { children }
        </div>
    )
}
