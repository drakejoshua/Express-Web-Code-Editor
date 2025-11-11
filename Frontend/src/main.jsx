import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThemeProvider from './providers/ThemeProvider.jsx'
import { router } from './routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ToastProvider from './providers/ToastProvider.jsx'
import DialogProvider from './providers/DialogProvider.jsx'
import ErrorBoundary from './routes/ErrorBoundary.jsx'
import AuthProvider from './providers/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
        <ThemeProvider>
            <ToastProvider>
                <DialogProvider>
                    <HelmetProvider>
                        <AuthProvider>
                            <RouterProvider router={router} />
                        </AuthProvider>
                    </HelmetProvider>
                </DialogProvider>
            </ToastProvider>
        </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)
