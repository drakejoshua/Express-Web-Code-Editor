import { createContext, useContext } from 'react'
import useTheme from '../hooks/useTheme.js'

const ThemeContext = createContext()

export function useThemeProvider() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children }) {
    const [ theme, toggleTheme ] = useTheme("codebloks-app-theme")

    return (
        <ThemeContext.Provider value={ { theme, toggleTheme } }>
            <div className={ ( theme == "dark" ) ? "dark" : "" }>
                { children }
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
