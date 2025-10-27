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
