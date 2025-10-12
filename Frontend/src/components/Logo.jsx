import React from 'react'
import { AiOutlineCode } from 'react-icons/ai'

const Logo = React.forwardRef( function( { className, ...props }, ref ) {
  return (
    <div 
        className={`
            brand-logo 
            flex 
            items-center 
            gap-2
            ${ className || '' }
        `}
        ref={ref}

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


export default Logo