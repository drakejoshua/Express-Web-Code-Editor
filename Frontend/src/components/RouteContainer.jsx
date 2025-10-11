export default function RouteContainer({ children, className }) {
  return (
    <div 
        className={ className ? className : `
            route-container 
            max-w-[500px] min-w-[270px] w-full 
            mx-auto 
            flex 
            flex-col 
            items-center 
            gap-10 
            p-5 pt-16
        `}
    >
      { children }
    </div>
  )
}
