import { Form } from 'radix-ui'
import { FaGoogle, FaTriangleExclamation } from 'react-icons/fa6'
import PasswordField from '../components/PasswordField'
import Button from '../components/Button'
import Logo from '../components/Logo'
import { 
    Carousel,
    CarouselItem,
    CarouselScroller,
    CarouselButton,
    CarouselTabs,
    CarouselTab
} from 'react-aria-carousel'
import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js'
import "highlight.js/styles/vs2015.css"




export default function Signin() {

    const typedElement = useRef(null);
    const [typedText, setTypedText] = useState("");

    const nextButtonRef = useRef(null);
    
    const codeString = `<body class="text-white">
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <h1 class="text-2xl font-medium mb-2">Welcome !!!</h1>
    <p class="text-gray-300 mb-8">
        Experience code-editing in the browser
    </p>

    <button class="bg-blue-500 text-white px-3 py-1.5 rounded">
        Only Available At Codebloks
    </button>
</body>`;

    useEffect(() => {
        // create typing effect using text from codeString and
        // a setInterval to simulate typing by updating state 'typedText'

        // index to track current typing position in codeString
        let i = 0;

        // set interval to update typedText every 40ms
        const interval = setInterval(() => {

            // if i is less than or equal to codeString length,
            // update typedText with substring of codeString up to i
            if (i <= codeString.length) {
                setTypedText(codeString.slice(0, i));
                i++;
            } else {
                // clear interval when done typing
                clearInterval(interval);

                // after typing is done, wait for 1 seconds and
                // simulate click on next button to move carousel to next slide
                setTimeout(() => {
                    if (nextButtonRef.current) {
                        nextButtonRef.current.click();
                    }
                }, 1000);
            }
        }, 40);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // highlight the code using highlight.js

        if (typedElement.current) {
            // use 'html' to force right language with syntax highlighting
            const result = hljs.highlight(typedText, { language: "html" }).value;

            // update the innerHTML of the typedElement with the highlighted code
            typedElement.current.innerHTML = result
        }
    }, [typedText]);

    return (
        <div className='
                signin
                min-h-screen
                flex
                bg-white dark:bg-gray-900 
                dark:text-white 
            '
        >
            {/* signin form */}
            <Form.Root 
                className='
                    signin--form
                    w-1/3
                    p-10 py-16
                '
            >
                {/* Form Logo */}
                <Logo/>

                {/* heading */}
                <h1 className='
                    signin--form__heading
                    font-medium
                    text-gray-900
                    text-3xl
                    mt-9
                '>
                    Sign in to your account
                </h1>

                {/* text */}
                <p className='
                    signin--form__text
                    mt-4 mb-8
                    text-lg
                    leading-6
                '>
                    Welcome back! Please enter your details to sign in to your account.
                </p>

                {/* email */}
                <Form.Field 
                    name='email'
                    className='
                        signin--form__email-field
                        flex 
                        flex-col
                        gap-2
                    '
                >
                    <Form.Label 
                        className='
                            signin--form__email-field--label
                            font-medium
                        '
                    >
                        Email
                    </Form.Label>

                    <Form.Control asChild>
                        <input 
                            type="email" 
                            className='
                                signin--form__email-field--input
                                border-2
                                border-gray-600 dark:border-gray-300
                                rounded-sm
                                py-2 px-3
                                bg-gray-600 dark:bg-gray-300
                                text-white dark:text-black
                                font-medium
                                outline-none
                            ' 
                            required
                        />
                    </Form.Control>

                    <Form.Message 
                        className='
                            signin--form__email-field--message
                            flex
                            gap-2
                            items-center
                        ' 
                        match="typeMismatch"
                    >
                        <FaTriangleExclamation className='signin--form__email-field--icon' />
                        Please enter your email
                    </Form.Message>

                </Form.Field>
                
                {/* password */}
                <PasswordField
                    label="Password"
                    name="password"
                    emptyValidationMessage="Please enter your password"
                    shortValidationMessage="The password can't be lower than 6 characters"
                    className="
                        mt-3.5
                    "
                />

                {/* forgot password link */}
                <a href="#" className='
                    signin--form__forgot-password
                    mt-4
                    font-medium
                    text-blue-900
                    hover:underline
                    block
                    text-right
                '>
                    Forgot password?
                </a>

                {/* submit button */}
                <Button 
                    type="submit"
                    className='
                        w-full
                        mt-6
                    '
                >
                    Sign in
                </Button>

                {/* sign in with google */}
                <button
                    className='
                        signin--form__google-btn
                        mt-4
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-3.5
                        p-2.5
                        rounded-md
                        text-white
                        bg-gray-800 hover:bg-gray-700
                    '
                >
                    <FaGoogle className='
                        signin--form__google-btn--icon
                        text-xl
                    '/>

                    Sign in with Google
                </button>
            </Form.Root>

            {/* signin carousel */}
            <Carousel
                mouseDragging
                className='
                    signin--carousel
                    w-2/3
                    h-screen
                    bg-neutral-100
                    p-16 px-20
                '
            >
                <CarouselButton dir='next' ref={nextButtonRef}/>

                <CarouselScroller
                    className='
                        signin--carousel__scroller
                        flex
                        overflow-x-hidden
                        snap-mandatory
                        snap-x
                        scroll-smooth
                        w-2/3
                        mx-auto
                    '
                >
                    <CarouselItem 
                        index={0}
                        className='
                            signin--carousel__scroller--item
                            flex-[0_0_100%]
                            snap-start
                        '
                    >
                        {/* slide heading */}
                        <h1
                            className="
                                signin--carousel__scroller--item-heading
                                font-bold
                                text-4xl
                                text-gray-900
                                leading-12
                                w-3/4
                                text-center
                                mx-auto
                            "
                        >
                            Run code in your browser, Share it with anyone.
                        </h1>

                        {/* slide code example */}
                        <div 
                            className="
                                signin--carousel__scroller--item-code-ctn 
                                mt-8
                                rounded-md
                                overflow-hidden
                            "
                        >
                            <div 
                                className="
                                    signin--carousel__scroller--item-code-header
                                    bg-gray-700
                                    text-white
                                    flex
                                    gap-3
                                    items-center
                                    p-2.5 px-4
                                "
                            >
                                <div 
                                    className="
                                        signin--carousel__scroller--item-header-buttons
                                        flex
                                        gap-2
                                    "
                                >
                                    <div 
                                        className="
                                            signin--carousel__scroller--header-red-button
                                            bg-red-500 hover:bg-red-400
                                            h-4
                                            w-4
                                            rounded-full
                                        "
                                    ></div>
                                    <div 
                                        className="
                                            signin--carousel__scroller--header-yellow-button
                                            bg-yellow-500 hover:bg-yellow-400
                                            h-4
                                            w-4
                                            rounded-full
                                        "
                                    ></div>
                                    <div 
                                        className="
                                            signin--carousel__scroller--header-green-button
                                            bg-green-500 hover:bg-green-400
                                            h-4
                                            w-4
                                            rounded-full
                                        "
                                    ></div>
                                </div>

                                <div className="signin--carousel__scroller--item-header-filename">
                                    index.html
                                </div>
                            </div>

                            
                            <div
                                className="
                                    signin--carousel__scroller--item-code-body
                                    hljs
                                    whitespace-pre-wrap
                                    font-mono
                                    p-6
                                    min-h-28
                                "
                                ref={typedElement}
                            >
                                { typedText }
                            </div>
                        </div>
                    </CarouselItem>


                    <CarouselItem 
                        index={1}
                        className='
                            signin--carousel__scroller--item
                            flex-[0_0_100%]
                            snap-start
                            self-stretch
                            flex flex-col
                        '
                    >
                        <h1
                            className="
                                signin--carousel__scroller--item-heading
                                font-bold
                                text-4xl
                                text-gray-900
                                leading-12
                                w-3/4
                                text-center
                                mx-auto
                            "
                        >
                            See live code execution results as you type.
                        </h1>

                        <div 
                            className="
                                signin--carousel__scroller--item-preview-ctn
                                mt-8
                                rounded-md
                                overflow-hidden
                                flex-grow
                                flex
                                flex-col
                            "
                        >
                            <div 
                                className="
                                    signin--carousel__scroller--item-code-header
                                    bg-gray-700
                                    text-white
                                    flex
                                    gap-3
                                    items-center
                                    p-2.5 px-4
                                "
                            >
                                <div 
                                    className="
                                        signin--carousel__scroller--item-header-buttons
                                        flex
                                        gap-2
                                    "
                                >
                                    <div 
                                        className="
                                            signin--carousel__scroller--header-red-button
                                            bg-red-500 hover:bg-red-400
                                            h-4
                                            w-4
                                            rounded-full
                                        "
                                    ></div>
                                    <div 
                                        className="
                                            signin--carousel__scroller--header-yellow-button
                                            bg-yellow-500 hover:bg-yellow-400
                                            h-4
                                            w-4
                                            rounded-full
                                        "
                                    ></div>
                                    <div 
                                        className="
                                            signin--carousel__scroller--header-green-button
                                            bg-green-500 hover:bg-green-400
                                            h-4
                                            w-4
                                            rounded-full
                                        "
                                    ></div>
                                </div>

                                <div className="signin--carousel__scroller--item-header-filename">
                                    code preview
                                </div>
                            </div>

                            <iframe
                                title="Live Preview"
                                className='
                                    signin--carousel__scroller--item-preview-iframe
                                    w-full 
                                    h-full
                                    p-4
                                    bg-gray-800
                                    flex-grow
                                '
                                srcDoc={ codeString }
                            ></iframe>
                        </div>
                    </CarouselItem>
                </CarouselScroller>

                <CarouselTabs
                    className='
                        flex
                        gap-2
                        justify-center
                        mt-4
                    '
                >
                    {(page) => <CarouselTab 
                            key={page.index} 
                            index={page.index} 
                            className={`
                                h-3
                                w-3
                                rounded-full
                                bg-gray-700 ${page.isSelected ? 'bg-gray-950' : ''}
                                cursor-pointer
                            `}
                        />
                    }
                </CarouselTabs>
            </Carousel>
        </div>
    )
}
