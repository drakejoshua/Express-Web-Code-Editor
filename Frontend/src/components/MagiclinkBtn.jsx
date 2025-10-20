// import component dependencies
import React from 'react'
import { FaEnvelope } from 'react-icons/fa6'


// define MagiclinkBtn component
const MagiclinkBtn = React.forwardRef(({ className, text, ...props}, ref) => {
  return (
    <button
        // apply default and custom classes
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

        // pass down the ref to the button element
        ref={ref}

        // spread any additional props to the button element
        {...props}
    >
        <FaEnvelope className='
            magiclink-btn__icon
            text-xl
        '/>

        { text }
    </button>
  )
})


// export MagiclinkBtn component for use in other parts
// of the application
export default MagiclinkBtn