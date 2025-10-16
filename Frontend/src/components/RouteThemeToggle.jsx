// import component dependencies
import { FaRegSun, FaMoon } from 'react-icons/fa6'
import { useThemeProvider } from '../providers/ThemeProvider';


// define RouteThemeToggle component
export default function RouteThemeToggle() {
    const { theme, toggleTheme } = useThemeProvider();

    return (
        <button 
            className='
                theme-toggle
                fixed
                top-4
                right-4
                flex
                gap-2
                items-center
                bg-gray-300 dark:bg-gray-700
                p-3 px-4.5
                rounded-lg
            '
            onClick={ () => toggleTheme() }
        >
            { theme == 'dark' && <FaRegSun 
                className="
                    theme-toggle__icon
                "
            /> }
            
            { theme == 'light' && <FaMoon 
                className="
                    theme-toggle__icon
                "
            /> }

            <span 
                className="
                    theme-toggle__text
                ">
                Toggle Theme
            </span>
        </button>
    )
}
