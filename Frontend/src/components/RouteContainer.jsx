// RouteContainer.jsx
// This component defines a container for centered-layout routes 
// such as the password reset, email verification routes, etc.
// It provides consistent layout and spacing for its children components.


// define and export RouteContainer component
export default function RouteContainer({ children, className }) {
  return (
    <div 
        // apply default and custom classes - centered layout
        // with max width of 500px and min width of 270px
        className={ `
            route-container 
            max-w-[500px] min-w-[270px] w-full 
            mx-auto 
            flex 
            flex-col 
            items-center 
            p-5 pt-16
            ${ className ? className : `` }
        `}
    >
      { children }
    </div>
  )
}
