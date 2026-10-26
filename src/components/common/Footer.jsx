import { useEffect, useRef, useState } from "react";

const SHOW_TOP_AFTER = 300; // px scrolled before the "back to top" arrow appears
const getHeaderHeight = () => document.getElementById("site-header")?.offsetHeight ?? 0;

// every block the "down" arrow can jump to, in page order
const getTargets = () => [...document.querySelectorAll("section[id], footer[id]")];

// the first section that starts below the fixed header
const getNextTarget = () => {
    const line = getHeaderHeight() + 8;
    return getTargets().find((el) => el.getBoundingClientRect().top > line);
};

const smooth = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

const Footer = () => {
    const [showTop, setShowTop] = useState(false);
    const [atEnd, setAtEnd] = useState(false); // nothing left to scroll to
    const [scrolling, setScrolling] = useState(false); // page is moving right now
    const stopTimer = useRef(null);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            setShowTop(window.scrollY > SHOW_TOP_AFTER);

            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            setAtEnd(atBottom || !getNextTarget());
        };

        const onScroll = () => {
            // disabled while the page is scrolling (by the mouse, touch or by our own click)
            setScrolling(true);
            clearTimeout(stopTimer.current);
            stopTimer.current = setTimeout(() => setScrolling(false), 150);

            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            clearTimeout(stopTimer.current);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    // show the scroll-to-top button only after scrolling down a bit
    // useEffect(() => {
    //     const SHOW_AFTER = 300; // px
    //     const onScroll = () => setShowTop(window.scrollY > SHOW_AFTER);
    //     onScroll();
    //     window.addEventListener("scroll", onScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", onScroll);
    // }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToNext = () => {
        if (scrolling) return;
        const next = getNextTarget();
        if (!next) return;
        const top = next.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
        window.scrollTo({ top: Math.max(top, 0), behavior: smooth() });
    };

    const base =
        "fixed right-4 z-50 size-8 bg-russian-dark-blue flex items-center justify-center rounded-full text-white text-xs hover:bg-russian-red hover:text-white transition-all duration-300";


    return (
        <footer
            id="site-footer"
            className="z-40 relative border-t-4 border-russian-red"
        >
            <div className="custom-container relative z-40 py-10">
                <div className="grid sd:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                    <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-4">
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

                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
                        <p className="text-base font-bold text-russian-dark-blue">Get in touch</p>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap flex-col gap-2 text-start">
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
                                    <p className="text-gray-600">Online classes <span className="block text-sm font-medium">Mon–Fri, 10AM – 7PM IST</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 border-t border-gray-300 text-center">
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
                    <button
                        type="button"
                        onClick={scrollToNext}
                        disabled={atEnd || scrolling}
                        aria-label="Scroll to next section"
                        tabIndex={atEnd ? -1 : 0}
                        className={`${base} ${showTop ? "top-20" : ""} ${atEnd
                                ? "opacity-0 translate-y-4 pointer-events-none"
                                : scrolling
                                    ? "opacity-50 cursor-not-allowed"
                                    : "opacity-100 translate-y-0 cursor-pointer"
                            }`}
                    >
                        <i className="fa-solid fa-arrow-down"></i>
                    </button>
                    <a
                        href="#"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        tabIndex={showTop ? 0 : -1}
                        className={`fixed right-4 bottom-4 z-50 size-8 bg-russian-dark-blue flex items-center justify-center rounded-full text-white text-xs hover:bg-russian-red hover:text-white transition-all duration-300 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                            }`}
                    ><i className="fa-solid fa-arrow-up"></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
