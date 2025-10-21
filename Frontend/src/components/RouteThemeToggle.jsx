// RouteThemeToggle.jsx
// This component defines a theme toggle button used in non-user-facing
// routes such as password reset, email verification, etc. to switch between
// light and dark themes.



// import component dependencies
import { FaRegSun, FaMoon } from 'react-icons/fa6'
import { useThemeProvider } from '../providers/ThemeProvider';


// define RouteThemeToggle component
export default function RouteThemeToggle() {
    // access theme and toggle function from the ThemeProvider 
    // context
    const { theme, toggleTheme } = useThemeProvider();

    return (
        <button 
            // apply default classes for the theme toggle button
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
            // toggle theme on button click using onclick handler
            onClick={ () => toggleTheme() }
        >
            {/* show sun icon when theme is dark */}
            { theme == 'dark' && <FaRegSun 
                className="
                    theme-toggle__icon
                "
            /> }

            {/* show moon icon when theme is light */}
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
