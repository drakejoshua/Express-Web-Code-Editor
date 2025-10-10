import { useThemeProvider } from "./providers/ThemeProvider.jsx"

function App() {
    const { theme, toggleTheme } = useThemeProvider()

  return (
    <div className="dark:bg-gray-200 bg-gray-800">
      <h1 className="text-blue-300">hello world</h1>

      <button onClick={ () => toggleTheme() }>
        Toggle Theme (current: { theme })
      </button>
    </div>
  )
}

export default App
