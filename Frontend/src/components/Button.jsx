import React from 'react'

const Button = React.forwardRef( function( { children, className, ...props }, ref ) {
  return (
    <button 
        className={ `
            bg-blue-800 
            hover:bg-blue-700 
            transition-colors
            p-2 px-6 
            rounded-lg 
            font-medium 
            flex 
            items-center 
            gap-2
        ` + className }
        ref={ref}

        {...props}
    >
        { children }
    </button>
  )
})


export default Button