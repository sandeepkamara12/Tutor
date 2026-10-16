import { useCallback, useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

// Put the images in  public/assets/img/  (or import them and use the imported value as `img`)
const testimonials = [
  {
    img: '/student-1.jpg',
    name: 'Anna Whitfield',
    role: 'Beginner Student',
    text: 'I could read my first Russian sign after two days. The lessons never feel overwhelming, and the pace is perfect for a complete beginner.',
  },
  {
    img: '/student-2.jpg',
    name: 'Rahul Mehta',
    role: 'Software Engineer',
    text: 'The grammar finally makes sense. Examples first, rules after, exactly what I needed after years of giving up on other apps.',
  },
  {
    img: '/student-3.jpg',
    name: 'Maria Lopez',
    role: 'Marketing Manager',
    text: 'Quizzes after every lesson keep me consistent. My streak is at 40 days and I actually look forward to practicing.',
  },
  {
    img: '/student-4.jpg',
    name: 'Daniel Osei',
    role: 'Frequent Traveler',
    text: 'I started for travel and ended up loving the culture. The listening exercises helped me understand native speakers so much faster.',
  },
  {
    img: '/student-5.jpg',
    name: 'Sofia Novak',
    role: 'University Student',
    text: 'Clear explanations, real conversations, and a structure that actually works. I went from zero to holding basic conversations in three months.',
  },
];

const COUNT = testimonials.length;
const SLIDES_COVERED = Math.floor((COUNT - 1) / 2); // neighbour cards the text spreads over
const TRANSITION_MS = 450; // wait for the grid to finish expanding before showing the text

export default function Testimonials() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [active, setActive] = useState(Math.floor(COUNT / 2)); // middle card open first
  const [contentWidth, setContentWidth] = useState(0);
  const [ready, setReady] = useState(false);
  const cardRefs = useRef([]);

  // text pops to the right for the first half of the cards, to the left for the rest
  const popsRight = (index) => index < Math.ceil(COUNT / 2);

  // width of the text box = the neighbour cards it spreads over (gaps included)
  const measure = useCallback(() => {
    const cards = cardRefs.current;
    const right = popsRight(active);
    const first = right
      ? cards[Math.min(active + 1, COUNT - 1)]
      : cards[Math.max(active - SLIDES_COVERED, 0)];
    const last = right
      ? cards[Math.min(active + SLIDES_COVERED, COUNT - 1)]
      : cards[Math.max(active - 1, 0)];
    if (!first || !last) return;
    setContentWidth(last.getBoundingClientRect().right - first.getBoundingClientRect().left);
  }, [active]);

  // hide text, wait for the grid animation, then measure and fade in
  useEffect(() => {
    if (!isDesktop) return;
    setReady(false);
    const timer = setTimeout(() => {
      measure();
      setReady(true);
    }, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [active, isDesktop, measure]);

  // keep the width right when the window is resized
  useEffect(() => {
    if (!isDesktop) return;
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isDesktop, measure]);

  const gridStyle = isDesktop
    ? { gridTemplateColumns: testimonials.map((_, i) => (i === active ? '2fr' : '1fr')).join(' ') }
    : undefined;

  return (
    <section id="testimonials">
      <div className="custom-container relative z-40 py-16 lg:py-24 flex justify-center flex-col overflow-x-clip">
        {/* heading */}
        <div className="flex flex-col lg:w-1/2 mx-auto gap-6 items-center text-center mb-10">
          <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">
            Testimonials
          </p>
          <h1 className="heading">
            What <span className="text-russian-red">students</span> say?
          </h1>
          <p>
            Learning Russian opens more than a textbook. It opens songs you'll finally understand, films you'll watch
            without subtitles, and conversations you never thought you'd have. This is where that journey begins.
          </p>
        </div>

        {/* cards */}
        <div className="mb-10 md:my-10 md:mt-0">
          <div
            className="testimonial-wrapper grid gap-2 gap-y-6 grid-cols-1 sm:grid-cols-2 md:items-end transition-[grid-template-columns] duration-500 ease-in-out"
            style={gridStyle}
          >
            {testimonials.map((t, i) => {
              const isActive = i === active;
              const right = popsRight(i);

              // desktop only: card is clickable, text fades/slides in on the active card
              const cardProps = isDesktop
                ? {
                    role: 'button',
                    tabIndex: 0,
                    'aria-pressed': isActive,
                    onClick: () => setActive(i),
                    onKeyDown: (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActive(i);
                      }
                    },
                  }
                : {};

              const contentStyle = isDesktop
                ? {
                    width: contentWidth ? `${contentWidth}px` : undefined,
                    opacity: isActive && ready ? 1 : 0,
                    transform: isActive && ready ? 'translateX(0)' : `translateX(${right ? '-20px' : '20px'})`,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }
                : undefined;

              return (
                <div
                  key={t.name}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={`relative md:cursor-pointer focus:outline-hidden ${
                    isDesktop && !isActive ? 'overflow-hidden' : ''
                  }`}
                  {...cardProps}
                >
                  <div className="bg-gray-400 rounded relative overflow-hidden z-50">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </div>

                  <div
                    className={`z-40 transition-[opacity,transform] duration-500 md:absolute md:top-0 ${
                      right ? 'md:left-full' : 'md:right-full'
                    }`}
                    style={contentStyle}
                  >
                    <div className={`pt-2 ${right ? 'md:pl-2' : 'md:pr-2 md:text-right'}`}>
                      <p
                        className={`mb-2 ${
                          right
                            ? 'md:border-l-2 md:border-red-400 md:pl-2'
                            : 'md:border-r-2 md:border-red-400 md:pr-2'
                        }`}
                      >
                        {t.text}
                      </p>
                      <p className={`font-bold text-base text-russian-dark-blue ${right ? 'md:pl-3' : 'md:pr-3'}`}>
                        {t.name}
                      </p>
                      <p className={`text-sm font-medium ${right ? 'md:pl-3' : 'md:pr-3'}`}>{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* buttons */}
        <div className="flex flex-wrap flex-col sd:flex-row sd:items-center justify-center gap-2 sd:gap-4 w-full sd:w-auto">
          <button className="button button-russian-blue">
            <span>Start Learning Free</span>
          </button>
          <button className="button button-russian-red">
            <span>See the Learning Path</span>
          </button>
        </div>
      </div>
    </section>
  );
}
