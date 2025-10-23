// SearchInput.jsx
// This component renders a search input field with a search icon.
// It accepts additional class names and props to customize its behavior and appearance.

// import component dependencies
import { FaMagnifyingGlass } from 'react-icons/fa6'


// define SearchInput component
export default function SearchInput({ className, ...props }) {
    return (
        <div 
            // apply default and custom classes
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

            {/* text input for collecting search queries */}
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
