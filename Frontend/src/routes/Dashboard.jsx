// import route dependencies
import { FaArrowRightFromBracket, FaArrowsRotate, FaBars, FaEllipsisVertical, FaMagnifyingGlass, FaMoon, FaPencil, FaPlus, FaTrash, FaUser } from 'react-icons/fa6'
import Logo from '../components/Logo'
import { Avatar, Dialog, DropdownMenu } from 'radix-ui'
import Button from '../components/Button'


export default function Dashboard() {
  return (
    <div
        className='
            dashboard
        '
    >
        <div className="dashboard--header">
            <Dialog.Root>
                <Dialog.Trigger className='dashboard--header__menu-trigger'>
                    <FaBars className='dashboard--header__menu-trigger-icon' />
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Content>
                        <Logo className='dashboard--header__menu-logo' />

                        <div className="dashboard--header__menu-search-input-ctn">
                            <FaMagnifyingGlass className='dashboard--header__search-icon' />

                            <input 
                                type="text" 
                                className='dashboard--header__search-input'
                            />
                        </div>

                        <div className="dashboard--header__menu-blok-list">
                            <div className="dashboard--header__menu-blok">
                                <span className="dashboard--header__blok-name">
                                    blok_1
                                </span>

                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild>
                                        <button className="dashboard--header__blok-trigger">
                                            <FaEllipsisVertical className="dashboard--header__blok-trigger-icon"/>
                                        </button>
                                    </DropdownMenu.Trigger>

                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content className='dashboard--header__blok-options'>
                                            <DropdownMenu.Label className='dashboard--header__blok-options-label'>
                                                more options
                                            </DropdownMenu.Label>

                                            <DropdownMenu.Item>
                                                <FaPencil className='dashboard--header__blok-option-icon' />

                                                <span className="dashboard--header__blok-option-text">
                                                    rename blok
                                                </span>
                                            </DropdownMenu.Item>
                                            
                                            <DropdownMenu.Item>
                                                <FaTrash className='dashboard--header__blok-option-icon' />

                                                <span className="dashboard--header__blok-option-text">
                                                    delete blok
                                                </span>
                                            </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Root>
                            </div>
                        </div>

                        <button className="dashboard--header__load-more-btn">
                            load more
                        </button>

                        <Button>
                            <FaPlus/>

                            <span>
                                add new blok
                            </span>
                        </Button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <div className="dashboard--header__title-ctn">
                <Logo className='dashboard--header__logo' />

                <h1 className="dashboard--header__title">
                    Welcome, Joshua
                </h1>
            </div>

            <button className="dashboard--header__theme-toggle-btn">
                <FaMoon className='dashboard--header__theme-toggle-icon' />
            </button>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <Avatar.Root className='dashboard--header__avatar-ctn'>
                        <Avatar.Image 
                            src={'https://images.unsplash.com/photo-1598096969068-7f52cac10c83?ixlib=rb-4.1.0'
                            +'&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym95JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}
                            className='dashboard--header__avatar-photo'
                        />
                        
                        <Avatar.Fallback delayMs={3000}>
                            <FaUser className='dashboard--header__avatar-icon'/>
                        </Avatar.Fallback>
                    </Avatar.Root>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <div className="dashboard--header__profile-summary">
                            <Avatar.Root className='dashboard--header__avatar-ctn'>
                                <Avatar.Image 
                                    src={'https://images.unsplash.com/photo-1598096969068-7f52cac10c83?ixlib=rb-4.1.0'
                                    +'&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym95JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}
                                    className='dashboard--header__avatar-photo'
                                />
                                
                                <Avatar.Fallback delayMs={3000}>
                                    <FaUser className='dashboard--header__avatar-icon'/>
                                </Avatar.Fallback>
                            </Avatar.Root>

                            <div className='dashboard--header__profile-info'>
                                <span className="dashboard--header__profile-username">
                                    Joshua Mabawonku
                                </span>
                                
                                <span className="dashboard--header__profile-email">
                                    joshua@email.com
                                </span>
                            </div>
                        </div>

                        <div className="dashboard--header__profile-options-list">
                            <DropdownMenu.Item className='dashboard--header__profile-option'>
                                <FaArrowsRotate className="dashboard--header__option-icon" /> 

                                <span className="dashboard--header__option-text">
                                    Update Profile
                                </span>
                            </DropdownMenu.Item>
                            
                            <DropdownMenu.Item className='dashboard--header__profile-option'>
                                <FaArrowRightFromBracket className="dashboard--header__option-icon" /> 

                                <span className="dashboard--header__option-text">
                                    logout
                                </span>
                            </DropdownMenu.Item>
                        </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>

        <div className="dashboard--filter-bar">
            <div className="dashboard--filter-bar__search-input-ctn">
                <FaMagnifyingGlass className='dashboard--filter-bar__search-icon' />

                <input 
                    type="text" 
                    className='dashboard--filter-bar__search-input'
                />
            </div>

            <Button>
                <FaPlus className='dashboard--filter-bar__add-btn-icon' />

                <span className="dashboard--filter-bar__add-btn-text">
                    Create Blok
                </span>
            </Button>
        </div>

        <div className="dashboard--blok-list">
            <div className="dashboard--blok-list__blok">
                <iframe 
                    srcDoc={`<body class="text-white bg-black">
                        <!-- Tailwind CDN -->
                        <script src="https://cdn.tailwindcss.com"></script>

                        <h1 class="text-2xl font-medium mb-2">Welcome !!!</h1>
                        <p class="text-gray-300 mb-8">
                            Experience code-editing in the browser
                        </p>

                        <button class="bg-blue-500 text-white px-3 py-1.5 rounded">
                            Only Available At Codebloks
                        </button>
                    </body>`}
                    frameborder="0" 
                    className="dashboard--blok-list__blok-preview"
                ></iframe>

                <div className="dashboard--blok-list__blok-details">
                    <span className="dashboard--blok-list__blok-name">
                        blok_1
                    </span>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="dashboard--blok-list__blok-trigger">
                                <FaEllipsisVertical className="dashboard--blok-list__blok-trigger-icon"/>
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content className='dashboard--blok-list__blok-options'>
                                <DropdownMenu.Label className='dashboard--blok-list__blok-options-label'>
                                    more options
                                </DropdownMenu.Label>

                                <DropdownMenu.Item>
                                    <FaPencil className='dashboard--blok-list__blok-option-icon' />

                                    <span className="dashboard--blok-list__blok-option-text">
                                        rename blok
                                    </span>
                                </DropdownMenu.Item>
                                
                                <DropdownMenu.Item>
                                    <FaTrash className='dashboard--blok-list__blok-option-icon' />

                                    <span className="dashboard--blok-list__blok-option-text">
                                        delete blok
                                    </span>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            </div>
        </div>
    </div>
  )
}
