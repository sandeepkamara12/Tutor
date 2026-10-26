import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * TestimonialSlider - a responsive testimonial carousel.
 * Needs only React and Tailwind classes (it brings its own breakpoint hook).
 *
 * See README.md for the full props list.
 */

export const MAX_SLIDES_PER_VIEW = 7;
const DEFAULT_SLIDES = { desktop: 7, tablet: 5, mobileLg: 2, mobile: 1 };
const DEFAULT_BREAKPOINTS = { mobileLg: 575, tablet: 768, desktop: 1024 }; // min-width in px
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

/* ---------- which screen size are we on? ---------- */
function useScreen({ mobileLg, tablet, desktop }) {
  const read = useCallback(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.matchMedia(`(min-width: ${desktop}px)`).matches) return 'desktop';
    if (window.matchMedia(`(min-width: ${tablet}px)`).matches) return 'tablet';
    if (window.matchMedia(`(min-width: ${mobileLg}px)`).matches) return 'mobileLg';
    return 'mobile';
  }, [mobileLg, tablet, desktop]);

  const [screen, setScreen] = useState(read);

  useEffect(() => {
    const queries = [desktop, tablet, mobileLg].map((w) => window.matchMedia(`(min-width: ${w}px)`));
    const update = () => setScreen(read());
    queries.forEach((q) => q.addEventListener('change', update));
    update();
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, [mobileLg, tablet, desktop, read]);

  return screen;
}

const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function TestimonialSlider({
  items = [], // [{ img, name, role, text }]
  slidesPerView = DEFAULT_SLIDES, // { desktop, tablet, mobileLg, mobile } - maximum 7 each
  breakpoints = DEFAULT_BREAKPOINTS, // { mobileLg, tablet, desktop } min-widths in px
  effect = 'slide', // 'slide' | 'fade'
  expandContent = true, // true: text opens beside the active card (tablet and up). false: text sits under every card
  slidesToScroll = 1, // how many cards one arrow click moves
  initialSlide = 0, // first visible card
  speed = 450, // animation time in ms
  gap = '0.5rem', // space between cards (any CSS length)
  loop = true, // endless: after the last card the first one follows (and the other way round)
  navigation = true, // show prev / next arrows
  pagination = true, // show the dots / counter
  paginationType = 'dots', // 'dots' | 'fraction'
  autoplay = false,
  autoplayDelay = 5000,
  pauseOnHover = true,
  dimOnHover = true, // while the mouse is over the slider, every card except the open one gets dimmed
  dimOpacity = 0.5, // opacity of the dimmed cards (0 - 1)
  swipe = true,
  prevIcon = <i className="fa-solid fa-chevron-left" />,
  nextIcon = <i className="fa-solid fa-chevron-right" />,
  prevLabel = 'Previous testimonials',
  nextLabel = 'Next testimonials',
  onSlideChange, // (startIndex) => void
  className = '',
  classNames = {}, // { cards, card, image, text, name, role, controls, arrow, dot, dotActive, counter }
}) {
  const count = items.length;
  const screen = useScreen({ ...DEFAULT_BREAKPOINTS, ...breakpoints });
  const slides = { ...DEFAULT_SLIDES, ...slidesPerView };

  const perView = Math.max(1, Math.min(slides[screen], MAX_SLIDES_PER_VIEW, count || 1));
  // text spreads over the neighbour cards: needs the option on, 3+ cards and a tablet / desktop screen.
  // On smaller screens the text is always shown under the card.
  const expandable = expandContent && perView >= 3 && (screen === 'tablet' || screen === 'desktop');
  const slidesCovered = Math.floor((perView - 1) / 2);
  const looping = loop && count > perView; // endless carousel (the cards are repeated before and after)
  const offset = looping ? count : 0; // index of the first real card inside the repeated track
  const maxStart = looping ? count - 1 : Math.max(count - perView, 0);
  const middle = Math.floor(perView / 2);
  const step = looping ? Math.max(1, Math.min(slidesToScroll, count - perView + 1)) : Math.max(1, slidesToScroll);
  const mod = (n) => ((n % count) + count) % count;

  // every "page" the slider can rest on (as a position inside the real cards)
  const positions = useMemo(() => {
    const list = [];
    const last = looping ? count : maxStart;
    for (let p = 0; p < last; p += step) list.push(p);
    if (!looping) list.push(maxStart);
    return list;
  }, [looping, count, maxStart, step]);

  // in loop mode the track holds the cards three times, so we can always keep moving in one direction
  const track = useMemo(() => (looping ? [...items, ...items, ...items] : items), [looping, items]);

  const [start, setStart] = useState(() => offset + Math.min(Math.max(initialSlide, 0), maxStart));
  const [active, setActive] = useState(middle); // open card, relative to the first visible one
  const [contentWidth, setContentWidth] = useState(0);
  const [readyKey, setReadyKey] = useState(''); // text of the open card is shown once it matches the current key
  const [fade, setFade] = useState(1);
  const [instant, setInstant] = useState(false); // no transitions while cards are swapped under the fade / wrap
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false); // real mouse over the slider (not touch)

  const cardRefs = useRef([]);
  const touchX = useRef(null);
  const busy = useRef(false);
  const timers = useRef([]);
  const prevOffset = useRef(offset);

  const safeStart = looping ? start : Math.min(start, maxStart);
  const logicalStart = count ? mod(safeStart - offset) : 0; // position among the real cards
  const absActive = safeStart + active;
  const currentKey = `${logicalStart}-${active}-${perView}-${expandable}`;
  const pageIndex = positions.reduce(
    (best, p, i) => (Math.abs(p - logicalStart) < Math.abs(positions[best] - logicalStart) ? i : best),
    0
  );

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // screen size changed -> keep the same card first, stay inside the list, open the middle card again
  useEffect(() => {
    setStart((s) => offset + Math.min(count ? mod(s - prevOffset.current) : 0, maxStart));
    prevOffset.current = offset;
    setActive(middle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView, looping, offset, maxStart, middle]);

  /* ---------- changing page ---------- */
  const normalize = (v) => (looping ? offset + mod(v - offset) : v);

  const changeStart = (target) => {
    if (target === safeStart || busy.current) return;
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const swap = (v) => {
      setStart(v);
      setActive(middle);
      onSlideChange?.(mod(v - offset));
    };

    if (reduce || speed <= 0) {
      swap(normalize(target));
      return;
    }

    busy.current = true;
    if (effect === 'fade') {
      setFade(0); // fade out
      later(() => {
        setInstant(true);
        swap(normalize(target)); // swap the cards while invisible
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setInstant(false);
            setFade(1); // fade in
          })
        );
      }, speed / 2);
      later(() => {
        busy.current = false;
      }, speed);
    } else {
      swap(target); // the track slides to the new position (CSS transition)
      later(() => {
        // endless mode: after sliding into a repeated copy, jump back to the real cards (looks identical)
        if (looping && (target < offset || target >= offset + count)) {
          setInstant(true);
          setStart(normalize(target));
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              setInstant(false);
              busy.current = false;
            })
          );
        } else {
          busy.current = false;
        }
      }, speed);
    }
  };

  const nextTarget = looping
    ? safeStart + step
    : positions.find((p) => p > safeStart) ?? (loop ? positions[0] : null);
  const prevTarget = looping
    ? safeStart - step
    : [...positions].reverse().find((p) => p < safeStart) ?? (loop ? positions[positions.length - 1] : null);
  const goNext = () => nextTarget !== null && changeStart(nextTarget);
  const goPrev = () => prevTarget !== null && changeStart(prevTarget);

  // autoplay
  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;
  useEffect(() => {
    if (!autoplay || (!looping && maxStart <= 0) || (pauseOnHover && paused)) return;
    const id = setInterval(() => goNextRef.current(), autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, looping, maxStart, pauseOnHover, paused]);

  /* ---------- text-spreading layout ---------- */
  const popsRight = useCallback((rel) => rel < Math.ceil(perView / 2), [perView]);

  const measure = useCallback(() => {
    const cards = cardRefs.current;
    const lo = safeStart;
    const hi = safeStart + perView - 1;
    const right = popsRight(active);
    const first = right ? cards[Math.min(absActive + 1, hi)] : cards[Math.max(absActive - slidesCovered, lo)];
    const last = right ? cards[Math.min(absActive + slidesCovered, hi)] : cards[Math.max(absActive - 1, lo)];
    if (!first || !last) return;
    setContentWidth(last.getBoundingClientRect().right - first.getBoundingClientRect().left);
  }, [active, absActive, safeStart, perView, slidesCovered, popsRight]);

  // wait for the cards to finish moving / resizing, then measure and show the text
  useEffect(() => {
    if (!expandable) return;
    const id = setTimeout(() => {
      measure();
      setReadyKey(currentKey);
    }, Math.max(speed, 0) + 50);
    return () => clearTimeout(id);
  }, [currentKey, expandable, measure, speed]);

  useEffect(() => {
    if (!expandable) return;
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [expandable, measure]);

  /* ---------- touch swipe ---------- */
  const touchProps = swipe
    ? {
        onTouchStart: (e) => {
          touchX.current = e.touches[0].clientX;
        },
        onTouchEnd: (e) => {
          if (touchX.current === null) return;
          const diff = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(diff) < 50) return;
          diff < 0 ? goNext() : goPrev();
        },
      }
    : {};

  if (!count) return null;

  /* ---------- sizes ---------- */
  // one card = (track width - gaps) / n. With an open card that card counts double.
  const slots = expandable ? perView + 1 : perView;
  const unit = `((100% - ${perView - 1} * var(--ts-gap)) / ${slots})`;
  const trackStyle = {
    '--ts-gap': gap,
    gap: 'var(--ts-gap)',
    transform: `translateX(calc(${-safeStart} * (${unit} + var(--ts-gap))))`,
    transition: instant || effect === 'fade' || speed <= 0 ? 'none' : `transform ${speed}ms ${EASE}`,
  };
  const cardTransition = `${instant || speed <= 0 ? 'width 0ms' : `width ${speed}ms ${EASE}`}, opacity 300ms ease`;
  const dimOthers = dimOnHover && hovered && expandable; // only the open card stays fully visible

  const showControls = (looping || maxStart > 0) && (navigation || pagination);
  const arrowClass = cx(
    'size-8 rounded-full bg-russian-dark-blue text-white hover:bg-russian-red transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-russian-dark-blue',
    classNames.arrow
  );

  return (
    <div
      className={className}
      onMouseEnter={() => {
        setPaused(true);
        setHovered(window.matchMedia('(hover: hover)').matches);
      }}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* cards */}
      <div
        className={cx('mb-6 overflow-x-clip', classNames.cards)}
        style={{
          opacity: fade,
          transition: effect === 'fade' && !instant && speed > 0 ? `opacity ${speed / 2}ms ease` : undefined,
        }}
        {...touchProps}
      >
        <div className={cx('testimonial-wrapper flex', expandable ? 'items-end' : 'items-start')} style={trackStyle}>
          {track.map((t, i) => {
            const rel = i - safeStart;
            const inView = rel >= 0 && rel < perView;
            const isActive = expandable && i === absActive;
            const right = popsRight(rel);
            const showText = isActive && readyKey === currentKey;

            const cardProps = expandable
              ? {
                  role: 'button',
                  tabIndex: inView ? 0 : -1,
                  'aria-pressed': isActive,
                  onClick: () => inView && setActive(rel),
                  onKeyDown: (e) => {
                    if (inView && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setActive(rel);
                    }
                  },
                }
              : {};

            const contentStyle = expandable
              ? {
                  width: contentWidth ? `${contentWidth}px` : undefined,
                  opacity: showText ? 1 : 0,
                  transform: showText ? 'translateX(0)' : `translateX(${right ? '-20px' : '20px'})`,
                  pointerEvents: showText ? 'auto' : 'none',
                }
              : undefined;

            return (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                aria-hidden={!inView}
                className={cx(
                  'relative flex-none focus:outline-hidden',
                  expandable && 'cursor-pointer',
                  expandable && !isActive && 'overflow-hidden',
                  classNames.card
                )}
                style={{
                  width: isActive ? `calc(2 * ${unit})` : `calc(${unit})`,
                  opacity: dimOthers && !isActive ? dimOpacity : 1,
                  transition: cardTransition,
                }}
                {...cardProps}
              >
                <div className={cx('h-64 aspect-square mx-auto md:mx-0 md:aspect-auto md:h-auto rounded relative overflow-hidden z-50', classNames.image)}>
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover object-center" />
                </div>

                <div
                  className={
                    expandable
                      ? cx('z-40 transition-[opacity,transform] duration-500 absolute top-0', right ? 'left-full' : 'right-full')
                      : 'z-40'
                  }
                  style={contentStyle}
                >
                  <div className={cx('pt-2', expandable ? (right ? 'pl-2' : 'pr-2 text-right') : 'text-center', classNames.text)}>
                    <p
                      className={cx(
                        'mb-2',
                        expandable && (right ? 'border-l-2 border-red-400 pl-2' : 'border-r-2 border-red-400 pr-2')
                      )}
                    >
                      {t.text}
                    </p>
                    <p
                      className={cx(
                        'font-bold text-base text-russian-dark-blue',
                        expandable && (right ? 'pl-3' : 'pr-3'),
                        classNames.name
                      )}
                    >
                      {t.name}
                    </p>
                    <p className={cx('text-sm font-medium', expandable && (right ? 'pl-3' : 'pr-3'), classNames.role)}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* arrows + dots */}
      {showControls && (
        <div className={cx('flex items-center justify-center md:justify-between gap-4', classNames.controls)}>
<div>
          {pagination && paginationType === 'dots' && (
            <div className="flex items-center gap-2">
              {positions.map((p, i) => (
                <button
                key={p}
                  type="button"
                  onClick={() => changeStart(offset + p)}
                  aria-label={`Go to page ${i + 1}`}
                  aria-current={i === pageIndex}
                  className={cx(
                    'size-2.5 rounded-full cursor-pointer transition-all',
                    i === pageIndex ? cx('bg-russian-red', classNames.dotActive) : cx('bg-gray-300', classNames.dot)
                  )}
                />
              ))}
            </div>
          )}

          {pagination && paginationType === 'fraction' && (
            <p className={cx('font-bold text-russian-dark-blue min-w-12 text-center', classNames.counter)}>
              {pageIndex + 1} / {positions.length}
            </p>
          )}
</div>
<div className="flex items-center gap-2">
          {navigation && (
            <button type="button" onClick={goPrev} disabled={prevTarget === null} aria-label={prevLabel} className={arrowClass}>
              {prevIcon}
            </button>
          )}

          {navigation && (
            <button type="button" onClick={goNext} disabled={nextTarget === null} aria-label={nextLabel} className={arrowClass}>
              {nextIcon}
            </button>
          )}
        </div>
        </div>
      )}
    </div>
  );
}