import { useEffect, useState } from 'react';
import Button from '../ui/Button';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const SCROLL_THRESHOLD = 50;

        const toggleHeaderClass = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };

        // Check the initial scroll position
        toggleHeaderClass();

        // Listen for scrolling
        window.addEventListener("scroll", toggleHeaderClass, {
            passive: true,
        });

        // Remove the listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", toggleHeaderClass);
        };
    }, []);

    const menuItems = [
        { name: "Discover", href: "#discover" },
        { name: "Learning Path", href: "#learning-path" },
        { name: "Lessons", href: "#featured-lessons" },
        { name: "Achievements", href: "#progress_achievements" },
        { name: "About", href: "#about" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
    ];
    return (
        <header
            id="site-header"
            data-open="false"
            className={`group fixed z-50 w-full py-3 transition-all duration-300 ${isScrolled ? "header-scrolled" : ""
                } data-[open=true]:bg-white data-[open=true]:shadow-lg`}
        >
            <nav className="custom-container lg:flex lg:items-center lg:justify-between">

                <div className="flex items-center justify-between">
                    <a
                        className="flex-none focus:outline-hidden focus:opacity-80 inline-block"
                        href="#"
                        aria-label="Brand"
                    >
                        <img className="w-16 h-auto" src="./logos.png" alt="Logo" />
                    </a>

                    <button
                        type="button"
                        id="nav-toggle"
                        className="lg:hidden size-9 flex justify-center items-center rounded-lg bg-white border border-gray-200 text-russian-dark-blue shadow-2xs hover:bg-gray-50 focus:outline-hidden"
                        aria-expanded="false"
                        aria-controls="primary-nav"
                        aria-label="Toggle navigation"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <span className="sr-only">Toggle navigation</span>
                    </button>
                </div>

                <div
                    id="primary-nav"
                    className="grid grid-rows-[0fr] group-data-[open=true]:grid-rows-[1fr] transition-all duration-300 basis-full grow lg:flex lg:justify-between"
                >
                    <div
                        className="min-h-0 overflow-hidden max-lg:invisible max-lg:group-data-[open=true]:visible max-lg:transition-[visibility] max-lg:duration-300 lg:overflow-visible lg:flex lg:grow lg:justify-between lg:items-center"
                    >

                        <div className="flex flex-col gap-6 pt-5 pb-4 lg:flex-row lg:items-center lg:py-0 lg:ps-10">
                            {menuItems.map((item) => (
                                <a
                                    key={item.href}
                                    className="menu-item"
                                    href={item.href}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <Button color={'blue'} label={'Get free material'} href="#" />
                    </div>
                </div>

            </nav>
        </header>
    )
}

export default Header
