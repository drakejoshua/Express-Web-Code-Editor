// import util depdendencies
import githubLight from "monaco-themes/themes/GitHub Light.json"
import solarizedLight from "monaco-themes/themes/Solarized-light.json"
import sunburst from "monaco-themes/themes/Sunburst.json"
import clouds from "monaco-themes/themes/Clouds.json"
import githubDark from "monaco-themes/themes/Github Dark.json"
import monokai from "monaco-themes/themes/Monokai.json"
import nightOwl from "monaco-themes/themes/Night Owl.json"
import solarizedDark from "monaco-themes/themes/Solarized-dark.json"



export const editorThemes = [
    // light themes
    {
        type: "light",
        value: "vsc_light",
        json: "",
        name: "VS Code Light"
    },
    {
        type: "light",
        value: "github_light",
        json: githubLight,
        name: "Github Light"
    },
    {
        type: "light",
        value: "solarized_light",
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
        value: "vsc_dark",
        json: "",
        name: "VS Code Dark"
    },
    {
        type: "dark",
        value: "github_dark",
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
        value: "night_owl",
        json: nightOwl,
        name: "Night Owl"
    },
    {
        type: "dark",
        value: "solarized_dark",
        json: solarizedDark,
        name: "Solarized Dark"
    },
]