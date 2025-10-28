// NavMenu.jsx
// This component represents the navigation sidebar for the application
// It uses radix-ui dialog and displays actions for adding, deleting, 
// renaming bloks, etc



// import component depedencies
import { FaBars, FaPlus, FaXmark } from "react-icons/fa6";
import Logo from "./Logo";
import NavMenuBlok from "./NavMenuBlok";
import SearchInput from "./SearchInput";
import { Dialog } from "radix-ui";
import Button from "./Button";


// define and export NavMenu component
export default function NavMenu() {
  return (
    <Dialog.Root>
        <Dialog.Trigger className='dashboard--header__menu-trigger'>
            <FaBars 
                className='
                    dashboard--header__menu-trigger-icon
                    text-2xl
                    outline-none
                ' 
            />
        </Dialog.Trigger>

        <Dialog.Portal>
            <Dialog.Overlay 
                className='
                    dashboard--header__menu-overlay 
                    fixed 
                    inset-0 
                    bg-black/50
                ' 
            />
            
            <Dialog.Content 
                className='
                    dashboard--header__menu-content
                    h-screen
                    fixed
                    top-0
                    bg-white dark:bg-gray-900
                    p-6
                    flex
                    flex-col
                    gap-6
                    w-1/5 min-w-[300px] max-w-[350px]
                '
            >
                <Logo className='dashboard--header__menu-logo' />

                <SearchInput />

                <div 
                    className="
                        dashboard--header__menu-blok-list
                        flex-grow
                        overflow-auto
                    "
                >
                    <NavMenuBlok name={"blok_1"} />
                    
                    <NavMenuBlok name="simple_one" />

                    <NavMenuBlok name="color riot example" />

                    <NavMenuBlok name="animation" />
                    
                    <NavMenuBlok name="image_example" />
                </div>

                <button 
                    className="
                        dashboard--header__load-more-btn
                        text-blue-600 dark:text-blue-400
                        underline
                        mb-8
                    "
                >
                    load more
                </button>

                <Dialog.Close 
                    className="
                        dashboard--header__menu-close-btn
                        absolute
                        right-5 
                        text-gray-900 dark:text-white
                        text-2xl
                    "
                >
                    <FaXmark/>
                </Dialog.Close>

                <Button
                    className="
                        mt-auto
                    "
                >
                    <FaPlus/>

                    <span>
                        add new blok
                    </span>
                </Button>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}
