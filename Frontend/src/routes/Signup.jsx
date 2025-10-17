import { Form } from 'radix-ui'
import PasswordField from '../components/PasswordField'
import Button from '../components/Button'
import Logo from '../components/Logo'
import EmailField from '../components/EmailField'
import Carousel from '../components/Carousel'
import RouteThemeToggle from '../components/RouteThemeToggle'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import GoogleBtn from '../components/GoogleBtn'
import MagiclinkBtn from '../components/MagiclinkBtn'
import {
    Carousel as CarouselRoot,
    CarouselButton,
    CarouselTabs,
    CarouselTab,
    CarouselScroller,
    CarouselItem,
    useCarousel
} from 'react-aria-carousel'


export default function Signup() {
    const [assignScrollerRef, carousel] = useCarousel()

    const { pages } = carousel


    return (
        <>
            <Helmet>
                <title> Sign Up - Codebloks </title>
                <meta name="description" content="Sign up for a Codebloks account 
                to access the coding playground and start coding!" />
            </Helmet>
        
            <div className='
                    signup
                    min-h-screen
                    overflow-auto
                    flex
                    justify-center
                    bg-white dark:bg-gray-900 
                    dark:text-white 
                '
            >
                {/* signup form */}
                <Form.Root 
                    className='
                        signup--form
                        w-2/3 lg:w-2/4 xl:w-1/3 min-w-[320px]
                        p-4 py-12 xl:p-10 xl:py-16
                    '
                >
                    {/* Form Logo */}
                    <Logo
                        className='
                            justify-center xl:justify-start
                        '
                    />

                    {/* heading */}
                    <h1 className='
                        signup--form__heading
                        font-medium
                        text-gray-900 dark:text-white
                        text-3xl
                        mt-9
                        text-center xl:text-left
                    '>
                        Sign up for an account
                    </h1>

                    {/* text */}
                    <p className='
                        signup--form__text
                        mt-4 mb-8
                        text-lg
                        leading-6
                        text-center xl:text-left
                    '>
                        Welcome back! 
                        Please enter your details to sign up for an account.

                        Already have an account? 
                        <Link 
                            to="/auth/signin" 
                            className='
                                text-blue-900 dark:text-blue-100
                                hover:underline
                            '
                        >
                            Sign in
                        </Link>
                    </p>

                    {/* email */}
                    {/* <EmailField
                        label="Email"
                        name="email"
                        emptyValidationMessage="Please enter your email"
                        invalidValidationMessage="Please enter a valid email"
                    /> */}
                    
                    {/* password */}
                    {/* <PasswordField
                        label="Password"
                        name="password"
                        emptyValidationMessage="Please enter your password"
                        shortValidationMessage="The password can't be lower than 6 characters"
                        className="
                            mt-3.5
                        "
                    /> */}

                    {/* multi step carousel fields */}
                    <CarouselRoot
                        mouseDragging
                    >
                        <CarouselTabs
                            className='
                                flex
                            '
                        >
                            {( page ) => (
                                <>
                                    <CarouselTab 
                                        key={page.index}
                                        className={`
                                            w-3 h-3
                                            rounded-full
                                            bg-gray-600 dark:bg-gray-300
                                            ${page.isSelected ? 'bg-blue-900 dark:bg-blue-100' : ''}
                                            transition-all
                                        `}
                                    />
                                
                                    <div 
                                        className="
                                            signup--form__carousel-indicator
                                            flex-grow
                                            h-0.5
                                            bg-gray-300 dark:bg-gray-600
                                        "
                                    ></div>
                                </>
                            )}
                        </CarouselTabs>

                        {/* hidden previous button */}
                        <CarouselButton dir="prev" />

                        {/* hidden next button */}
                        <CarouselButton dir="next" />

                        <CarouselScroller
                            className='
                                flex
                                overflow-x-auto
                                scroll-smooth
                                snap-mandatory
                                snap-x
                            '
                        >
                            <CarouselItem
                                className='
                                    flex-[0_0_100%]
                                    snap-start
                                '
                            >
                                <h1>
                                    Email Field Here
                                </h1>
                            </CarouselItem>

                            <CarouselItem
                                className='
                                    flex-[0_0_100%]
                                    snap-start
                                '
                            >
                                <h1>
                                    username Field Here
                                </h1>
                            </CarouselItem>
                            <CarouselItem
                                className='
                                    flex-[0_0_100%]
                                    snap-start
                                '
                            >
                                <h1>
                                    username Field Here
                                </h1>
                            </CarouselItem>
                            <CarouselItem
                                className='
                                    flex-[0_0_100%]
                                    snap-start
                                '
                            >
                                <h1>
                                    photo Field Here
                                </h1>
                            </CarouselItem>
                            <CarouselItem
                                className='
                                    flex-[0_0_100%]
                                    snap-start
                                '
                            >
                                <h1>
                                    password Field Here
                                </h1>
                            </CarouselItem>
                        </CarouselScroller>
                    </CarouselRoot>

                    {/* submit button */}
                    <Button 
                        type="submit"
                        className='
                            w-full
                            mt-8
                        '
                    >
                        Sign up
                    </Button>

                    {/* sign in with google */}
                    <GoogleBtn
                        className='
                            mt-8
                        '
                        text="Sign up with Google"
                    />

                    {/* sign in with email */}
                    <MagiclinkBtn
                        className='
                            mt-3
                        '
                        text="Sign up with email"
                    />
                </Form.Root>

                {/* signin carousel */}
                <Carousel
                    className='
                        hidden xl:block
                        w-2/3
                        self-stretch 
                        overflow-auto
                    '
                />

                {/* theme toggle */}
                <RouteThemeToggle />
            </div>
        </>
    )
}
