// Logo.jsx
// This component defines the brand logo used across
// the application, for instance, in the signin/signup forms.



// import component dependencies
import React from 'react'
import { AiOutlineCode } from 'react-icons/ai'


// define Logo component
const Logo = React.forwardRef( function( { className, ...props }, ref ) {
  return (
    <div 
        // apply default and custom classes
        className={`
            brand-logo 
            flex 
            items-center 
            gap-2
            ${ className || '' }
        `}

        // pass down the ref to the div element
        ref={ref}

        // spread any additional props to the div element
        { ...props }
    >
        <AiOutlineCode 
            className='
                brand-logo__icon 
                text-4xl
                text-blue-800
                dark:text-white
            '
        />

        <span 
            className='
                brand-logo__text 
                text-xl 
                font-medium 
                font-mono
                text-black dark:text-white
            '
        >
            CodeBloks
        </span>
    </div>
  )
})


// export Logo component for use in other parts
// of the application
export default Logo