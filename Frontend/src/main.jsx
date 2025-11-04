import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThemeProvider from './providers/ThemeProvider.jsx'
import { router } from './routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ToastProvider from './providers/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
        <ToastProvider>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
