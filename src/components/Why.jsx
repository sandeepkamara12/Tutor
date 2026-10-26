import React from 'react'
import Button from './ui/Button';

const Why = () => {
  const reasons = [
    {
      id: 1,
      title: "Hindi-first teaching",
      description:
        "Every rule is explained in Hindi, so you learn Russian without translating from English.",
      color: "russian-red",
    },
    {
      id: 2,
      title: "Clear step-by-step path",
      description:
        "From the alphabet to real conversations, in an order that tells you what to learn next.",
      color: "russian-red",
    },
    {
      id: 3,
      title: "Real pronunciation",
      description:
        "Audio and sound guides for the Russian sounds that Hindi does not have.",
      color: "russian-red",
    },
    // {
    //   id: 4,
    //   title: "Ten minutes a day",
    //   description:
    //     "Short quizzes and flashcards that fit into your day, so learning becomes a habit.",
    //   color: "russian-red",
    // },
    {
      id: 4,
      title: "Friendly support",
      description:
        "Ask your doubts any time and get a personal reply, not an automatic one.",
      color: "russian-red",
    },
    // {
    //   id: 5,
    //   title: "Free to start",
    //   description:
    //     "The alphabet lessons and study material cost nothing, so you can try before you decide.",
    //   color: "russian-red",
    // },
    // {
    //   id: 7,
    //   title: "Made for Hindi speakers",
    //   description:
    //     "Examples and comparisons use Hindi sounds and words you already know.",
    //   color: "russian-dark-blue",
    // },
    // {
    //   id: 6,
    //   title: "Career and travel",
    //   description:
    //     "Russian helps you stand out in business, science, tourism and travel, where few speak it.",
    //   color: "russian-red",
    // },
    // {
    //   id: 7,
    //   title: "Widely Spoken",
    //   description:
    //     "One of the most spoken languages in Eastern Europe & Aisa.",
    //   color: "russian-dark-blue",
    // },
    // {
    //   id: 8,
    //   title: "Real-life Russian",
    //   description:
    //     "Everyday phrases for travel, study and work, so you can use what you learn from first week.",
    //   color: "russian-dark-blue",
    // },
  ];
  return (
    <>
      {/* // <!-- WHY CHOOSE ME --> */}
      <section id="why" className="z-40 relative py-12 lg:py-20 flex xl:justify-center flex-col bg-gray-50">
        <div className="custom-container relative z-40">

          <div className="flex flex-col items-center xl:w-1/2 mx-auto gap-6 text-center">
            <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Why me</p>
            <h1 className="heading">Why <span className="text-russian-red">choose me?</span></h1>
            <p>Learning Russian opens more than a textbook. It opens songs you'll finally understand, films you'll watch without subtitles & conversations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:w-3/4 mx-auto gap-x-4 gap-y-10 text-center my-10">
            {reasons.map((item) => (
              <div className="group flex flex-col items-center gap-3" key={item.id}>
                <span className="block h-12 overflow-hidden text-7xl leading-none font-black text-gray-300 select-none" aria-hidden="true">0{item.id}</span>
                <p className="font-bold text-russian-dark-blue">{item.title}</p>
                <p className="">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto justify-center">
            <Button color="blue" label="What you will discover?" href="#discover" />
            <Button color="red" label="Start Learning now" href="#featured-lessons" />
          </div>
        </div>
      </section>


      {/* <section
        className="z-40 relative"
        id="why"
      >
        <div className="custom-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 lg:grid-cols-4 gap-4 -mt-10 lg:-mt-16">
            {reasons.map((item) => (
              <div
                key={item.id}
                className={`card bg-white p-6 rounded flex flex-col relative items-center md:items-start text-center md:text-start gap-1 border-t-4 border-${item.color} shadow-lg`}
              >
                <span
                  className={`bg-${item.color} size-8 absolute -top-4 rounded-full text-15 leading-[18px] font-medium text-white flex items-center justify-center shadow-2xl`}
                >
                  {item.id}
                </span>

                <p className="font-bold text-15 uppercase text-russian-dark-blue">
                  {item.title}
                </p>

                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  )
}

export default Why
