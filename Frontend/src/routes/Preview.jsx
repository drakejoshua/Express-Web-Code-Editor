// Preview.jsx
// This component defines the Preview route for the web code editor application.
// It displays a live preview of the user's code blok output using an iframe.


// import route dependencies
import { useEffect, useRef, useState } from "react"
import { generateIframeContent } from "../utils/editor_utils"
import { FaSpinner, FaTriangleExclamation } from "react-icons/fa6"
import RouteContainer from "../components/RouteContainer"
import { Helmet } from "react-helmet-async"


// define Preview component to display live code blok preview
export default function Preview() {
    // state to manage loading state and timeout
    const [ loadingState, setLoadingState ] = useState("loading")
    const loadingTimeout = useRef( null )

    // state to store code blok content received from BroadcastChannel
    const [ channelData, setChannelData ] = useState({
        html: "",
        css: "",
        js: ""
    })


    // useEffect to set up BroadcastChannel for receiving code blok content
    // on component mount
    useEffect(() => {
        // create BroadcastChannel for tab preview communication
        const tabPreviewChannel = new BroadcastChannel("tab_preview_channel")

        // Listen for messages once
        tabPreviewChannel.onmessage = (event) => {
            switch (event.data.type) {
                case "Preview_Content":
                    setChannelData({ ...event.data.payload })
                break;

                case "Request_Editor_Content":
                    if ( loadingTimeout.current ) {
                        clearTimeout( loadingTimeout.current )
                    }

                    setLoadingState("loaded")
                    setChannelData({ ...event.data.payload })
                break;
            }
        }

        // Request content once when mounted
        tabPreviewChannel.postMessage({
            type: "Request_Editor_Content"
        })

        // set loading error timeout
        loadingTimeout.current = setTimeout( function() {
            setLoadingState("load-error")
        }, 4000 )

        // Clean up channel on unmount
        return () => {
            tabPreviewChannel.close()

            if ( loadingTimeout.current ) {
                clearTimeout( loadingTimeout.current )
            }
        }
    }, [])

    // render Preview component based on loading state
    switch ( loadingState ) {
        // loaded state - display iframe with code blok content
        case "loaded":
            return (
                <>
                    <Helmet>
                        <title>Preview - CodeBloks</title>
                        <meta name="description" content="Preview your code blok output" />
                    </Helmet>

                    <iframe
                        srcDoc={ generateIframeContent(
                            channelData.html,
                            channelData.css,
                            channelData.js
                        ) }
                        className="
                            h-screen
                            w-full
                        "
                    >
                    </iframe>
                </>
            )

        // load-error state - display error message
        case "load-error":
            return (
                <>
                    <Helmet>
                        <title>Preview - CodeBloks</title>
                        <meta name="description" content="Preview your code blok output" />
                    </Helmet>
                    
                    <div 
                        className="
                            h-screen
                            text-black dark:text-white
                            bg-white dark:bg-gray-800
                        "
                    >
                        <RouteContainer
                            className="
                                gap-4
                            "
                        >
                            <FaTriangleExclamation className="text-3xl"/>

                            <p className="text-center">
                                The preview failed to load. This is due to opening preview without
                                initializing preview mode in the codebloks editor. Make sure to enable
                                preview mode in the codebloks editor then reload this page to try again
                            </p>
                        </RouteContainer>
                    </div>
                </>
            )
        
        // loading state - display loading message
        case "loading":
            return (
                <>
                    <Helmet>
                        <title>Preview - CodeBloks</title>
                        <meta name="description" content="Preview your code blok output" />
                    </Helmet>
                    
                    <div 
                        className="
                            h-screen
                            text-black dark:text-white
                            bg-white dark:bg-gray-800
                        "
                    >
                        <RouteContainer
                            className="
                                gap-4
                            "
                        >
                            <FaSpinner className="text-3xl animate-spin"/>

                            <p className="text-center">
                                The preview is loading. Please wait...
                            </p>
                        </RouteContainer>
                    </div>
                </>
            )
    }
}
