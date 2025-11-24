// App.jsx
// Main application component that serves as the root for all routes.
// It uses the Outlet component from react-router-dom to render
// child routes defined in the routing configuration.

// import dependencies
import { Outlet } from "react-router-dom"

function App() {
  return (
    // Outlet to render child routes
    <>
      <Outlet />
    </>
  )
}

export default App
