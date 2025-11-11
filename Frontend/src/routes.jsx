import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./routes/Dashboard";
import Editor from "./routes/Editor";
import Preview from "./routes/Preview";
import Share from "./routes/Share";
import Verify from "./routes/Verify";
import Settings from "./routes/Settings";
import ResetPassword from "./routes/ResetPassword";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Google from "./routes/Google";
import Create from "./routes/Create";
import Home from "./routes/Home";
import Magiclink from './routes/Magiclink'
import NotFound from "./routes/NotFound";
import App from "./routes/App";
import ErrorElement from "./components/ErrorElement";
import ProtectedRoute from "./components/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/dashboard",
                element: <ProtectedRoute> <Dashboard /> </ProtectedRoute>
            },
            {
                path: "/editor/:id",
                element: <ProtectedRoute> <Editor /> </ProtectedRoute>
            },
            {
                path: "/preview",
                element: <ProtectedRoute> <Preview /> </ProtectedRoute>
            },
            {
                path: "/share",
                element: <ProtectedRoute> <Share /> </ProtectedRoute>
            },
            {
                path: "/auth/verify/:token",
                element: <Verify />
            },
            {
                path: "/auth/reset-password/:token",
                element: <ResetPassword />
            },
            {
                path: "/auth/signin",
                element: <Signin />
            },
            {
                path: "/auth/signup",
                element: <Signup />
            },
            {
                path: "/auth/google/:token",
                element: <Google />
            },
            {
                path: "/auth/magiclink/:token",
                element: <Magiclink />
            },
            {
                path: "/create",
                element: <ProtectedRoute> <Create /> </ProtectedRoute>
            },
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/settings",
                element: <ProtectedRoute> <Settings /> </ProtectedRoute>
            },
            {
                path: "*",
                element: <NotFound />
            },
        ],
        errorElement: <ErrorElement />
    }
]);