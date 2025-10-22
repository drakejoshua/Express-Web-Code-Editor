// import provider dependencies
import { createContext, useContext } from 'react'
import useTheme from '../hooks/useTheme.js'

// create context for sharing theme state and toggle function
// across the application
const ThemeContext = createContext()

// custom hook to access theme context from ThemeProvider
export function useThemeProvider() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children }) {
    // use custom useTheme hook to initialize current theme and toggle function
    // from local storage
    const [ theme, toggleTheme ] = useTheme("codebloks-app-theme")

    return (
        // provide theme state and toggle function to children components
        <ThemeContext.Provider value={ { theme, toggleTheme } }>
            {/* add tailwind "dark" class to root div for toggling dark mode */}
            <div className={ ( theme == "dark" ) ? "dark" : "" }>
                { children }
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
