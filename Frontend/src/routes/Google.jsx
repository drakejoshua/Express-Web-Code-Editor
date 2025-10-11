// Google OAuth Route
// This route handles Google OAuth authentication. 
// It serves as a callback route for Google to redirect users after they have authenticated.
// The actual OAuth logic is typically handled on the backend, so this page just simply informs
// the user that they are being redirected or display a loading indicator.

// import route dependencies
import React from 'react'
import { FaArrowLeft, FaCircleCheck, FaSpinner, FaTriangleExclamation, FaX } from 'react-icons/fa6';
import { AiOutlineCode } from "react-icons/ai";
import { Link, redirect } from 'react-router-dom';
import RouteContainer from '../components/RouteContainer';
import Logo from '../components/Logo';
import StatusCard from '../components/StatusCard';


// google oauth component
export default function Google() {
    return (
        <div 
            className='
                google 
                h-screen 
                w-full 
                bg-gray-900 
                text-white 
                overflow-auto
            '
        >
            
            <RouteContainer>
                <Logo/>

                <StatusCard
                    status={{
                        heading: 'Authenticating your Google account...',
                        text: `
                            Please hold on while we authenticate your account. 
                            You will be redirected shortly.
                        `,
                        type: "loading"
                    }}
                />
                
                {/* <StatusCard
                    status={{
                        heading: 'There was an issue authenticating your Google account.',
                        text: `
                            An error occurred while authenticating your Google account. 
                            Please try again.
                            If the issue persists, 
                            please check your internet connection or contact support.
                            Error: Invalid or expired token.
                        `,
                        type: "error",
                        redirect: "/signin",
                        redirect_content: <>
                            <FaArrowLeft/>
                            Go Back to Signin
                        </>
                    }}
                /> */}
                
                {/* <StatusCard
                    status={{
                        heading: 'Successfully authenticated with Google!',
                        text: `
                            You have successfully authenticated with your Google account.
                            You will be redirected to the dashboard shortly.
                            If you are not redirected, please click the button below.
                        `,
                        type: "success",
                        redirect: "/dashboard",
                        redirect_content: <>
                            Go to Dashboard
                        </>
                    }}
                /> */}
            </RouteContainer>
        </div>
    )
}
