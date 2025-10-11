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


export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/editor",
        element: <Editor />
    },
    {
        path: "/preview",
        element: <Preview />
    },
    {
        path: "/share",
        element: <Share />
    },
    {
        path: "/auth/verify",
        element: <Verify />
    },
    {
        path: "/auth/reset-password",
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
        path: "/auth/google",
        element: <Google />
    },
    {
        path: "/auth/magiclink",
        element: <Magiclink />
    },
    {
        path: "/create",
        element: <Create />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/settings",
        element: <Settings />
    },
]);