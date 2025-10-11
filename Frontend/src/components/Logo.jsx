import React from 'react'
import { AiOutlineCode } from 'react-icons/ai'

const Logo = React.forwardRef( function( { className, ...props }, ref ) {
  return (
    <div 
        className={ className ? className : `
            brand-logo 
            flex 
            items-center 
            gap-2
        `}
        ref={ref}

        { ...props }
    >
        <AiOutlineCode className='brand-logo__icon text-4xl'/>

        <span className='brand-logo__text text-xl font-medium font-mono'>
            CodeBloks
        </span>
    </div>
  )
})


export default Logo