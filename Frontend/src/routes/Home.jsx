import React from 'react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div
            className='
                home 
                h-screen 
                w-full
            '
        >
            <div className="home--navbar">
                <Logo />

                <div className="home--nav-links">
                    <a href="">
                        about
                    </a>

                    <a href="">
                        features
                    </a>

                    <Button>
                        sign up
                    </Button>

                    <Link>
                        sign in
                    </Link>
                </div>
            </div>

            <div className="home--hero">
                <h3>
                    the ultimate web code editor
                </h3>

                <h1>
                    Experience the future of web code editing
                </h1>

                <p>
                    CodeBloks is a powerful web code editor designed to streamline your development workflow.
                    With an intuitive interface, real-time collaboration, and seamless deployment options.
                </p>

                <img src="" alt="" />
            </div>

            <div className="home--clients-marquee">
                
            </div>
        </div>
    )
}
