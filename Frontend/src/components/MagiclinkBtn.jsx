import React from 'react'
import { FaEnvelope, FaGoogle } from 'react-icons/fa6'

const MagiclinkBtn = React.forwardRef(({ className, ...props}, ref) => {
  return (
    <button
        className={`
            magiclink-btn
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
        <FaEnvelope className='
            magiclink-btn__icon
            text-xl
        '/>

        Sign in using Email
    </button>
  )
})


export default MagiclinkBtn
