
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";

const menuItems = [
  { name: "Discover", href: "#discover" },
  { name: "Learning Path", href: "#learning-path" },
  { name: "Lessons", href: "#featured-lessons" },
  { name: "Achievements", href: "#progress_achievements" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [activeHash, setActiveHash] = useState(
    window.location.hash || "#discover"
  );

  // Detect the active section while scrolling
  useEffect(() => {
    let animationFrameId;

    const updateActiveSection = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const header = document.querySelector("#site-header .inner-header");
        // console.log(header?.offsetHeight, 'ji')
        const headerHeight = header?.offsetHeight ?? 0;
        console.log(headerHeight, 'hi')
        
        // Adjust this value if you want the active item to change earlier.
        const scrollPosition = window.scrollY + headerHeight;
        console.log(scrollPosition, 'bi', window.scrollY, headerHeight)

        let currentHash = "#discover";

        menuItems.forEach(({ href }) => {
          const section = document.querySelector(href);

          if (section && section.offsetTop <= scrollPosition) {
            currentHash = href;
          }
        });

        // At the bottom of the page, activate the last section.
        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;

        if (isAtBottom) {
          const lastExistingItem = [...menuItems]
            .reverse()
            .find(({ href }) => document.querySelector(href));

          if (lastExistingItem) {
            currentHash = lastExistingItem.href;
          }
        }

        setActiveHash(currentHash);
      });
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

 
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

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      id="site-header"
      data-open={isOpen}
      className={`group fixed z-50 w-full py-0 transition-all duration-300 ${isScrolled ? "header-scrolled" : ""
        } data-[open=true]:bg-white data-[open=true]:shadow-lg`}
    >
      <nav className="custom-container lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between inner-header lg:py-3">
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
          <div className="min-h-0 overflow-hidden max-lg:invisible max-lg:group-data-[open=true]:visible max-lg:transition-[visibility] max-lg:duration-300 lg:overflow-visible lg:flex lg:grow lg:justify-between lg:items-center">
            <div className="flex flex-col gap-6 pt-5 pb-4 lg:flex-row lg:items-center lg:py-0 lg:ps-10">
             {menuItems.map((item) => (
  <a
    key={item.href}
    href={item.href}
    className={`menu-item ${
      activeHash === item.href ? "active" : ""
    }`}
    aria-current={activeHash === item.href ? "location" : undefined}
    onClick={() => {
      setActiveHash(item.href);
      setIsOpen(false);
    }}
  >
    {item.name}
  </a>
))}
            </div>
            <Button
              color="blue"
              label="Get free material"
              href="#"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
