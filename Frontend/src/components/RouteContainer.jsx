export default function RouteContainer({ children, className }) {
  return (
    <div 
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
