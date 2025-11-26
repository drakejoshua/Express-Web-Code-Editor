// editor_utils.js
// utility functions and constants for code editor


// import util depdendencies
import githubLight from "./editor_themes/GitHub_Light.json"
import solarizedLight from "./editor_themes/Solarized-light.json"
import sunburst from "./editor_themes/Sunburst.json"
import clouds from "./editor_themes/Clouds.json"
import githubDark from "./editor_themes/Github_Dark.json"
import monokai from "./editor_themes/Monokai.json"
import nightOwl from "./editor_themes/Night_Owl.json"
import solarizedDark from "./editor_themes/Solarized-dark.json"


export const editorThemes = [
    // light themes
    {
        type: "light",
        value: "vs",
        json: "",
        name: "VS Code Light"
    },
    {
        type: "light",
        value: "hc-light",
        json: "",
        name: "High Contrast Light"
    },
    {
        type: "light",
        value: "githubLight",
        json: githubLight,
        name: "Github Light"
    },
    {
        type: "light",
        value: "solarizedLight",
        json: solarizedLight,
        name: "Solarized Light"
    },
    {
        type: "light",
        value: "sunburst",
        json: sunburst,
        name: "Sunburst"
    },
    {
        type: "light",
        value: "clouds",
        json: clouds,
        name: "Clouds"
    },

    // dark themes
    {
        type: "dark",
        value: "vs-dark",
        json: "",
        name: "VS Code Dark"
    },
    {
        type: "dark",
        value: "hc-black",
        json: "",
        name: "High Contrast Dark"
    },
    {
        type: "dark",
        value: "githubDark",
        json: githubDark,
        name: "Github Dark"
    },
    {
        type: "dark",
        value: "monokai",
        json: monokai,
        name: "Monokai"
    },
    {
        type: "dark",
        value: "nightOwl",
        json: nightOwl,
        name: "Night Owl"
    },
    {
        type: "dark",
        value: "solarizedDark",
        json: solarizedDark,
        name: "Solarized Dark"
    },
]


// generateIframeContent() - generate complete HTML content for iframe preview or display message if no content
export function generateIframeContent( html, css, js, theme ) {
    if ( !html && !css && !js ) {
        if ( theme === "dark" ) {
            return `
                <body 
                    style="
                        all: unset
                    "
                >
                    <div 
                        style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #1a202c;
                            color: white;
                        "
                    >
                        <p 
                            style="
                                font-family: sans-serif;
                                font-size: 1.2rem;
                                text-align: center
                            "
                        >
                            There's Nothing to preview yet, Type Some Code to see something
                        </p>
                    </div>
                </body>
            `
        } else {
            return `
                <body 
                    style="
                        all: unset
                    "
                >
                    <div 
                        style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #f8f8f8;
                            color: #111;
                        "
                    >
                        <p 
                            style="
                                font-family: sans-serif;
                                font-size: 1.2rem;
                                text-align: center
                            "
                        >
                            There's Nothing to preview yet, Type Some Code to see something
                        </p>
                    </div>
                </body>
            `
        }
    }

    return `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Preview</title>
                    <style>
                        ${ css }
                    </style>
                </head>
                <body>
                    ${ html }

                    <script>
                        ${ js }
                    </script>
                </body>
            </html>
        `
}