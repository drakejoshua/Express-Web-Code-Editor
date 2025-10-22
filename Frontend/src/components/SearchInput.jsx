import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

export default function SearchInput({ className, ...props }) {
  return (
    <div 
        className={`
            search-input-ctn
            bg-neutral-200
            rounded-lg
            flex
            p-2 px-4
            items-center
            gap-3
            *:text-gray-800
            ${ className || "" }
        `}
    >
        <FaMagnifyingGlass className='search-input-ctn__search-icon' />

        <input 
            type="text" 
            className='
                search-input-ctn__search-input
                placeholder-shown:capitalize
                outline-none
                font-medium
                flex-1
                min-w-0
            '
            placeholder='search your bloks...'
            { ...props }
        />
    </div>
  )
}
