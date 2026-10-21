import React from 'react'

const Footer = () => {
    return (
        <footer
            id="site-footer"
            className="z-40 relative border-t-4 border-russian-red text-center sm:text-start bg-gray-50"
        >
            <div className="custom-container relative z-40 pt-16 pb-8">
                {/* <img
        src="./assets/img/cathedral-of-vasily-blessed.png"
        alt="cathedral of vasily blessed"
        className="grayscale absolute bottom-0 w-56 rotate-270"
      /> */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="flex flex-col gap-4 items-center sm:items-start">
                        <a href="#">
                            <img
                                className="w-16 h-auto"
                                src="./logos.png"
                                alt="Logo"
                            />
                        </a>
                        <p className="">Learn Russian in Hindi, step by step. Simple lessons, friendly teaching and daily practice to
                            help
                            you read, understand and speak Russian with confidence.</p>
                        <div className="flex gap-3 justify-center sm:justify-start">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-gray-600 hover:text-russian-red"
                            ><i className="fa-brands fa-facebook"></i></a>
                            <a
                                href="#"
                                aria-label="YouTube"
                                className="text-gray-600 hover:text-russian-red"
                            ><i className="fa-brands fa-twitter"></i></a>
                            <a
                                href="#"
                                aria-label="YouTube"
                                className="text-gray-600 hover:text-russian-red"
                            ><i className="fa-brands fa-youtube"></i></a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-gray-600 hover:text-russian-red"
                            ><i className="fa-brands fa-instagram"></i></a>
                            <a
                                href="#"
                                aria-label="YouTube"
                                className="text-gray-600 hover:text-russian-red"
                            ><i className="fa-brands fa-pinterest-p"></i></a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-base font-bold text-russian-dark-blue">Quick links</p>
                        <ul className="flex flex-col gap-2">
                            <li><a
                                href="#discover"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Discover</a></li>
                            <li><a
                                href="#learning-path"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Learning Path</a></li>
                            <li><a
                                href="#featured-lessons"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Lessons</a></li>
                            <li><a
                                href="#testimonials"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Testimonials</a></li>
                            <li><a
                                href="#about"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >About me</a></li>
                            <li><a
                                href="#contact"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Contact me</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-base font-bold text-russian-dark-blue">Start learning</p>
                        <ul className="flex flex-col gap-2">
                            <li><a
                                href="#"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Cyrillic alphabet</a></li>
                            <li><a
                                href="#"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Pronunciation</a></li>
                            <li><a
                                href="#"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Vocabulary</a></li>
                            <li><a
                                href="#"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Grammar</a></li>
                            <li><a
                                href="#"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Practice quizzes</a></li>
                            <li><a
                                href="#"
                                className="text-gray-600 hover:text-russian-red transition-all"
                            >Free material</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-base font-bold text-russian-dark-blue">Get in touch</p>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap flex-col gap-2 items-center sm:items-start">
                                <a
                                    href="mailto:hello@example.com"
                                    className="flex gap-2 group"
                                >
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 group-hover:bg-russian-red group-hover:text-white text-xs transition-all"
                                    ><i className="fa-solid fa-envelope"></i></span>
                                    <p className="text-gray-600 group-hover:text-russian-red transition-all">hello@example.com</p>
                                </a>

                                <a
                                    href="https://wa.me/910000000000"
                                    className="flex gap-2 group"
                                >
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 group-hover:bg-russian-red group-hover:text-white text-xs transition-all"
                                    ><i className="fa-brands fa-whatsapp"></i></span>
                                    <p className="text-gray-600 group-hover:text-russian-red transition-all">+91 xxxx xxx xxx</p>
                                </a>
                                <div className="flex gap-2">
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 text-xs"><i
                                            className="fa-solid fa-clock"
                                        ></i></span>
                                    <p className="text-gray-600">Online classes <span class="block">Mon–Fri<br />10 AM – 7 PM IST</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 border-t border-gray-300 text-center">
                <div className="custom-container flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-gray-600">© 2026 Russian in Hindi. All rights reserved.</p>
                    <ul className="flex flex-wrap justify-center gap-6 text-sm">
                        <li><a
                            href="#"
                            className="text-gray-600 hover:text-russian-red transition-all"
                        >Privacy Policy</a></li>
                        <li><a
                            href="#"
                            className="text-gray-600 hover:text-russian-red transition-all"
                        >Terms of Use</a></li>
                    </ul>
                    <a
                        href="#"
                        className="fixed md:relative right-4 md:right-auto bottom-4 md:bottom-auto size-8 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 text-xs hover:bg-russian-red hover:text-white transition-all"
                    ><i className="fa-solid fa-arrow-up"></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
