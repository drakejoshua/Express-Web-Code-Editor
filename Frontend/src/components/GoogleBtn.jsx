import React from 'react'
import { FaGoogle } from 'react-icons/fa6'

const GoogleBtn = React.forwardRef(({ className, text, ...props}, ref) => {
  return (
    <button
        className={`
            google-btn
            w-full
            flex
            items-center
            justify-center
            gap-3.5
            p-2.5
            rounded-md
            text-white
            bg-gray-800 hover:bg-gray-700 
            dark:bg-gray-600 hover:dark:bg-gray-500
            ${className}
        `}
        ref={ref}
        {...props}
    >
        <FaGoogle className='
            google-btn__icon
            text-xl
        '/>

        { text }
    </button>
  )
})


export default GoogleBtn
