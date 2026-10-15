import React from 'react'

const Contact = () => {
    return (
        <section
            id="contact"
            className="z-40 relative py-16 lg:py-24 flex items-center flex-wrap"
        >
            <div className="custom-container relative z-40">

                <div className="grid gap-6 lg:w-4/5 mx-auto">
                    <div className="flex flex-wrap flex-col justify-between gap-6">
                        <div className="flex flex-col items-center lg:w-1/2 mx-auto gap-6 text-center">
                            <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Contact
                                me
                            </p>
                            <h1 className="heading">We’d love to <span className="text-russian-red">hear from you</span></h1>
                            <p>Have a question about a course, or not sure where to start? Send me a message and I will reply within
                                24
                                hours.</p>

                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap gap-6 items-center justify-center">
                                <a
                                    href="mailto:hello@example.com"
                                    className="flex items-center gap-2 group"
                                >
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 group-hover:bg-russian-red group-hover:text-white text-xs transition-all"
                                    ><i className="fa-solid fa-envelope"></i></span>
                                    <p className="group-hover:text-russian-red transition-all">hello@example.com</p>
                                </a>

                                <a
                                    href="https://wa.me/910000000000"
                                    className="flex items-center gap-2 group"
                                >
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 group-hover:bg-russian-red group-hover:text-white text-xs transition-all"
                                    ><i className="fa-brands fa-whatsapp"></i></span>
                                    <p className="group-hover:text-russian-red transition-all">+91 xxxx xxx xxx</p>
                                </a>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="size-6 bg-gray-300 flex items-center justify-center rounded-full text-gray-600 text-xs"><i
                                            className="fa-solid fa-location-dot"
                                        ></i></span>
                                    <p>123 Tech Avenue, San Francisco, USA</p>
                                </div>

                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <p className="font-bold text-russian-dark-blue leading-none">Follow me <span
                                    className="text-gray-600 font-normal"
                                >to get daily words &amp; video lessons</span></p>
                                <div className="flex gap-3">
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

                        </div>
                    </div>

                    <form
                        className="card bg-white p-6 md:p-8 rounded flex flex-col gap-3 border-t-4 border-russian-dark-blue shadow-lg w-full max-w-2xl mx-auto"
                    >
                        <div className="grid md:grid-cols-2 gap-5">
                            <label className="flex flex-col gap-1 text-sm font-semibold text-russian-dark-blue">Fullname
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="border border-gray-200 rounded py-2 px-4 font-medium text-15 text-gray-600 focus:outline-hidden focus:border-russian-dark-blue"
                                />
                            </label>
                            <label className="flex flex-col gap-1 text-sm font-semibold text-russian-dark-blue">Email
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="border border-gray-200 rounded py-2 px-4 font-medium text-15 text-gray-600 focus:outline-hidden focus:border-russian-dark-blue"
                                />
                            </label>
                        </div>
                        <label className="flex flex-col gap-1 text-sm font-semibold text-russian-dark-blue">Phone
                            <input
                                type="tel"
                                placeholder="+xx-xxxx-xxx-xxx"
                                className="border border-gray-200 rounded py-2 px-4 font-medium text-15 text-gray-600 focus:outline-hidden focus:border-russian-dark-blue"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm font-semibold text-russian-dark-blue">Subject
                            <input
                                type="text"
                                placeholder="Want to learn grammar"
                                className="border border-gray-200 rounded py-2 px-4 font-medium text-15 text-gray-600 focus:outline-hidden focus:border-russian-dark-blue"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm font-semibold text-russian-dark-blue">Message
                            <textarea
                                rows="5"
                                placeholder="Tell me about your goals..."
                                className="border border-gray-200 rounded py-2 px-4 font-medium text-15 text-gray-600 focus:outline-hidden focus:border-russian-dark-blue resize-none"
                            ></textarea>
                        </label>
                        <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto">
                            <button
                                type="submit"
                                className="button button-russian-blue"
                            >
                                <span>Send message</span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Contact
