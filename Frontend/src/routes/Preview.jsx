import { useEffect, useState } from "react"
import { generateIframeContent } from "../utils/editor_utils"

export default function Preview() {
    const [ channelData, setChannelData ] = useState({
        html: "",
        css: "",
        js: ""
    })

    useEffect(() => {
        const tabPreviewChannel = new BroadcastChannel("tab_preview_channel")

        // Listen for messages once
        tabPreviewChannel.onmessage = (event) => {
            if (event.data.type === "Preview_Content") {
                setChannelData({ ...event.data.payload })
            }
        }

        // Request content once when mounted
        tabPreviewChannel.postMessage({
            type: "Request_Editor_Content"
        })

        // Clean up channel on unmount
        return () => {
            tabPreviewChannel.close()
        }
    }, [])

    return (
        <iframe
            srcDoc={ generateIframeContent(
                channelData.html,
                channelData.css,
                channelData.js
            ) }
            className="
                h-screen
                w-full
                border-4
                border-gray-500
            "
        >
        </iframe>
    )
}
