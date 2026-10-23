import { useEffect, useRef, useState } from 'react';

// Put the images in  public/  (or import them and use the imported value as `img`).
// `ratio` is optional: it only sets the height of the tile, which is what makes the masonry look.
const posts = [
  { img: './student-1.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 1' },
  { img: './student-2.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 2' },
  { img: './student-3.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 3' },
  { img: './student-4.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 4' },
  { img: './student-5.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 5' },
  { img: './student-1.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 6' },
  // { img: './student-2.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 7' },
  // { img: './student-3.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 8' },
  // { img: './student-4.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 9' },
  // { img: './student-5.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 10' },
  // { img: './student-1.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 11' },
  // { img: './student-2.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 12' },
  // { img: './student-3.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 13' },
  // { img: './student-4.jpg', href: 'https://www.instagram.com/', label: 'Instagram post 14' },
];

// tile shapes (full class names, so Tailwind can see them)
const RATIOS = ['aspect-square'];
// the tile colours behind the image while it loads
const TINTS = ['bg-russian-blue/20', 'bg-russian-red/20', 'bg-russian-dark-blue/20'];

// how many masonry columns there are at a given width (the same breakpoints as the classes below)
const columnsFor = (width) => (width >= 768 ? 6 : 3);

// Fisher-Yates shuffle (returns a new array)
const shuffled = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function Instagram({ items = posts, shuffle = true, limit, stagger = 70 }) {
  // chosen once when the section appears, so it does not change on every re-render.
  // Each tile also gets a random shape (unless the post has its own `ratio`).
  const [tiles] = useState(() => {
    const list = shuffle ? shuffled(items) : items;
    return (limit ? list.slice(0, limit) : list).map((post, i) => ({
      ...post,
      ratio: post.ratio || (shuffle ? RATIOS[Math.floor(Math.random() * RATIOS.length)] : RATIOS[i % RATIOS.length]),
      tint: TINTS[i % TINTS.length],
    }));
  });

  const gridRef = useRef(null);
  const tileRefs = useRef([]);
  const revealed = useRef(false); // has the grid been shown at least once?
  const columnCount = useRef(typeof window !== 'undefined' ? columnsFor(window.innerWidth) : 5);
  const snapshot = useRef([]); // where every tile was the last time we looked: { left, top, width, height }
  const [show, setShow] = useState(false); // tiles are in (true) or still waiting to fade in (false)
  const [delays, setDelays] = useState([]); // fade-in delay of every tile (ms)

  // The browser decides which column a tile lands in, so the delays are worked out from where each tile
  // really is: the fade-in sweeps from the left to the right, and a little from top to bottom.
  const measureDelays = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const span = Math.min(tiles.length, 10) * stagger;
    setDelays(
      tileRefs.current.map((el) => {
        if (!el) return 0;
        const x = el.offsetLeft / Math.max(grid.offsetWidth, 1);
        const y = el.offsetTop / Math.max(grid.offsetHeight, 1);
        return Math.round((x * 0.7 + y * 0.3) * span);
      })
    );
  };

  // 1) on load: fade the tiles in when the grid scrolls into view
  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      revealed.current = true;
      measureDelays();
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed.current = true;
          measureDelays();
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) on resize: when the number of columns changes, every tile glides from its old place to its new one
  //    (like a masonry library re-laying out), one after another from the top to the bottom.
  useEffect(() => {
    const readPositions = () =>
      tileRefs.current.map((el) =>
        el ? { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight } : null
      );

    const glide = (before, after) => {
      const grid = gridRef.current;
      const gridHeight = Math.max(grid ? grid.offsetHeight : 1, 1);
      tileRefs.current.forEach((el, i) => {
        const from = before[i];
        const to = after[i];
        if (!el || !from || !to) return;
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const scale = from.width / to.width;
        if (!dx && !dy && scale === 1) return;
        el.animate(
          [
            { transformOrigin: '0 0', transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
            { transformOrigin: '0 0', transform: 'translate(0px, 0px) scale(1)' },
          ],
          {
            duration: 700,
            delay: Math.round((to.top / gridHeight) * 350), // top tiles first, bottom tiles last
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards',
          }
        );
      });
    };

    snapshot.current = readPositions();
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const columns = columnsFor(window.innerWidth);
        const now = readPositions();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Between two breakpoints the tiles just scale with the width. Only when the columns change
        // do the tiles jump to new places, and that is what we animate (once the grid is visible).
        if (columns !== columnCount.current && revealed.current && !reduce) glide(snapshot.current, now);
        columnCount.current = columns;
        snapshot.current = now;
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section id="instagram" className="z-40 relative py-12 lg:py-20 overflow-hidden bg-gray-50">
      <div className="custom-container relative z-40">
        <div className="flex flex-col items-center lg:w-1/2 mx-auto gap-6 text-center mb-10">
          <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">
            Instagram
          </p>
          <h1 className="heading">
            Learn with us on <span className="text-russian-red">Instagram</span>
          </h1>
          <p>
            New words, phrases and little grammar tips every day. Follow{' '}
            <span className="font-bold text-russian-dark-blue">@russianinhindi</span> and learn Russian in just a few
            minutes of scrolling.
          </p>
          <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener"
              className="button button-russian-red"
            >
              <span>
                Follow on Instagram <i className="fa-brands fa-instagram ms-1"></i>
              </span>
            </a>
          </div>
        </div>

        {/* masonry: the browser fills the columns, every image is shown on every screen size */}
        <div ref={gridRef} className="relative columns-3 md:columns-6 gap-2 lg:gap-4">
          {tiles.map((post, i) => (
            <a
              key={`${post.label}-${i}`}
              ref={(el) => (tileRefs.current[i] = el)}
              href={post.href}
              target="_blank"
              rel="noopener"
              aria-label={post.label}
              style={{ transitionDelay: show ? `${delays[i] ?? 0}ms` : '0ms' }}
              className={`group relative block w-full ${post.ratio} ${post.tint} mb-2 md:mb-3 lg:mb-4 break-inside-avoid overflow-hidden rounded transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              <i className="fa-brands fa-instagram absolute inset-0 flex items-center justify-center text-2xl text-russian-dark-blue/30"></i>
              <img
                src={post.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-russian-dark-blue/60 opacity-0 group-hover:opacity-100 transition-all">
                <i className="fa-brands fa-instagram text-white text-2xl"></i>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}