import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(""); // id of the section that is at the top, e.g. "about"
  const clickLock = useRef(null); // while a clicked link is smooth-scrolling, the scroll spy waits

  const menuItems = [
    { name: "Why", href: "#why" },
    { name: "Discover", href: "#discover" },
    { name: "Learning Path", href: "#learning-path" },
    { name: "Lessons", href: "#featured-lessons" },
    // { name: "Achievements", href: "#progress_achievements" },
    { name: "Testimonials", href: "#testimonials" },
    // { name: "Faq", href: "#faq" },
    { name: "Enquiry", href: "#enquiry" },
    { name: "About", href: "#about" },
    // { name: "Instagram", href: "#instagram" },
  ];

  // Handle header scroll effect
  useEffect(() => {
    const SCROLL_THRESHOLD = 50;

    const toggleHeaderClass = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    toggleHeaderClass();

    window.addEventListener("scroll", toggleHeaderClass, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", toggleHeaderClass);
    };
  }, []);

   // Active menu item: the section that has reached the top (just below the fixed header)
  useEffect(() => {
    const ids = menuItems.map((item) => item.href.slice(1));
    let frame = 0;

    const update = () => {
      frame = 0;
      if (clickLock.current) return; // a menu link was just clicked, it already set the active item

      const header = document.getElementById("site-header");
      const line = (header ? header.offsetHeight : 0) + 2; // line just below the header

      // the last section whose top has passed the line, and which is still on screen
      let current = "";
      let currentTop = -Infinity;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line && rect.top > currentTop) {
          current = id;
          currentTop = rect.top;
        }
      });

      // bottom of the page: a short last section (Contact) may never reach the top
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Escape key and desktop breakpoint
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleLayoutChange = (event) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleLayoutChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleLayoutChange);
    };
  }, []);

  const handleMenuClick = (href) => {
    setIsOpen(false);
    setActiveId(href.slice(1)); // active straight away on click

    // keep it active while the page scrolls there (the scroll spy would pass other sections)
    clearTimeout(clickLock.current);
    clickLock.current = setTimeout(() => {
      clickLock.current = null;
      window.dispatchEvent(new Event("scroll")); // let the scroll spy check once more
    }, 900);
  };

  return (
    <header
      id="site-header"
      data-open={isOpen}
      className={`group fixed z-50 w-full py-3 lg:py-0 transition-all duration-300 ${isScrolled ? "header-scrolled" : ""
        } data-[open=true]:bg-white data-[open=true]:shadow-lg`}
    >
      <div
        className={`fixed inset-x-0 h-[calc(100vh-64px)] z-10 bg-russian-dark-blue/60 top-16 transition-opacity duration-300 lg:hidden ${isOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <nav className="custom-container relative z-20 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between inner-header lg:py-3 relative z-50">
          <a
            className="flex-none focus:outline-hidden focus:opacity-80 inline-block"
            href="#"
            aria-label="Brand"
          >
            <img
              className="w-16 h-auto"
              src="./logos.png"
              alt="Logo"
            />
          </a>

          <button
            type="button"
            id="nav-toggle"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden size-9 flex justify-center items-center rounded-lg bg-russian-dark-blue border border-russian-dark-blue text-white shadow-2xs hover:bg-gray-50 focus:outline-hidden"
            aria-expanded={isOpen}
            aria-controls="primary-nav"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>

            <span className="sr-only">
              {isOpen ? "Close navigation" : "Toggle navigation"}
            </span>
          </button>
        </div>

        <div
          id="primary-nav"
          className="grid grid-rows-[0fr] group-data-[open=true]:grid-rows-[1fr] transition-all duration-300 basis-full grow lg:flex lg:justify-between"
        >
          <div className="fixed z-30 left-0 top-15.5 lg:top-0
  h-screen w-56 lg:w-auto lg:h-auto
  bg-white lg:bg-transparent px-4 lg:px-0
  min-h-0 overflow-hidden
  max-lg:-translate-x-full
  max-lg:group-data-[open=true]:translate-x-0
  max-lg:transition-transform max-lg:duration-300
  lg:relative lg:overflow-visible
  lg:flex lg:grow lg:justify-between lg:items-center">
            <div className="flex flex-col gap-8 xl:gap-10 pt-5 pb-4 lg:flex-row lg:items-center lg:py-0 lg:ps-10">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  className="menu-item active:text-russian-red data-[active=true]:text-russian-red!"
                  data-active={activeId === item.href.slice(1)}
                  aria-current={activeId === item.href.slice(1) ? "location" : undefined}
                  href={item.href}
                  onClick={() => handleMenuClick(item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <Button
              color="blue"
              label="Get free material"
              href="#"
              classes="w-full lg:w-auto"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
