// WideLayout.jsx
// A layout component that provides a wide screen layout for its children.
// it's mostly used in usjer-facing pages such as editor, dashboard, etc



// define and export WideLayout component
export default function WideLayout({ children}) {
    return (
        <div
            className="
                h-screen
                text-gray-900 dark:text-white
                bg-white dark:bg-gray-900
                overflow-auto
                px-3.5 lg:px-6 pb-12
            "
        >
            {children}
        </div>
    )
}
