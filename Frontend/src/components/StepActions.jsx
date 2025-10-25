// StepActions.jsx
// This component renders a container for action buttons
// related to steps in a multi-step process. It accepts
// optional class names and child elements to customize
// its appearance and functionality.



// define and export StepActions component
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
