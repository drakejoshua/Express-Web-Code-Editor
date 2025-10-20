// Button.jsx
// This component defines the blue button that is used
// as the major CTA for actions across the application.


// import component dependencies
import React from 'react'


// define Button component using React.forwardRef
// to pass refs to the button element
const Button = React.forwardRef( function( { children, className, ...props }, ref ) {
  return (
    <button 
        // apply default and custom classes
        className={ `
            bg-blue-600 hover:bg-blue-500 dark:bg-blue-800 hover:dark:bg-blue-700 
            transition-colors
            p-2 px-6 
            rounded-lg 
            font-medium 
            flex 
            items-center 
            justify-center
            gap-2
            text-white 
            ${ className ? className : `` }
        ` }
        // pass down the ref to the button element
        ref={ref}

        // spread any additional props to the button element
        {...props}
    >
        { children }
    </button>
  )
})

// export Button component for use in other parts 
// of the application
export default Button