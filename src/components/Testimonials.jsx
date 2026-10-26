import TestimonialSlider from './ui/TestimonialSlider';

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
  {
    img: '/student-1.jpg',
    name: 'Anna White',
    role: 'Beginner Student',
    text: 'I could read my first Russian sign after two days. The lessons never feel overwhelming, and the pace is perfect for a complete beginner.',
  },
  {
    img: '/student-2.jpg',
    name: 'Rahul Mehtaa',
    role: 'Software Engineer',
    text: 'The grammar finally makes sense. Examples first, rules after, exactly what I needed after years of giving up on other apps.',
  },
  {
    img: '/student-3.jpg',
    name: 'Maria Lopezs',
    role: 'Marketing Manager',
    text: 'Quizzes after every lesson keep me consistent. My streak is at 40 days and I actually look forward to practicing.',
  },
  {
    img: '/student-4.jpg',
    name: 'Daniel Oseia',
    role: 'Frequent Traveler',
    text: 'I started for travel and ended up loving the culture. The listening exercises helped me understand native speakers so much faster.',
  },
  {
    img: '/student-5.jpg',
    name: 'Sofia Novaka',
    role: 'University Student',
    text: 'Clear explanations, real conversations, and a structure that actually works. I went from zero to holding basic conversations in three months.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="custom-container relative z-40 py-12 lg:py-20 flex justify-center flex-col">
        {/* heading */}
        <div className="flex flex-col lg:w-1/2 mx-auto gap-6 items-center text-center mb-6">
          <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">
            Testimonials
          </p>
          <h1 className="heading">
            What <span className="text-russian-red">students</span> say?
          </h1>
          <p>
            Learning Russian opens more than a textbook. It opens songs you'll finally understand, films you'll watch
            without subtitles & conversations.
          </p>
        </div>


        <TestimonialSlider
          items={testimonials}
          slidesPerView={{ desktop: 7, tablet: 5, mobileLg: 2, mobile: 1 }}
          // expandContent={false}
          effect="slide"
          speed={450}
          navigation
          pagination
          paginationType="dots"
          autoplay={true}
          autoplayDelay={2000}
          className=""
          classNames={{ arrow: 'max-md:hidden flex flex-wrap items-center justify-center' }}
        />
{/* buttons */}
        <div className="flex flex-wrap flex-col sd:flex-row sd:items-center justify-center gap-2 sd:gap-4 w-full sd:w-auto mt-10">
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