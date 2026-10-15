import React from 'react'
import Button from './ui/Button'

const Banner = () => {
  return (
     <section className="banner relative w-full lg:h-screen overflow-hidden">
      <div className="tl-b bubble bg-russian-red/70"></div>
      <div className="br-b bubble bg-russian-red/70"></div>
      <div className="tr-b bubble bg-russian-blue/70"></div>
      <div className="bl-b bubble bg-russian-blue/70"></div>
      <div className="inner-banner absolute size-full bg-white/50"></div>
      <div className="custom-container relative z-40 py-32 lg:py-16 h-full flex flex-wrap items-center">
        <div
          className="w-full md:w-[calc(100%-350px)] lg:w-1/2 flex flex-col gap-6 order-2 md:order-1 text-center md:text-left pt-10 md:pt-0 items-center md:items-start"
        >
          <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">
            Beginner-friendly
            Russian course</p>
          <h1 className="heading"><span className="text-russian-red">Russian</span>, start learning <br /> in hindi for free
          </h1>
          <p>Explore free Russian lessons designed for learners of all levels, from complete beginners to advanced
            students. Learn vocabulary and grammar, practice reading and listening with audio, improve your
            understanding through exercises and activities, and discover useful Russian words and expressions along the
            way.</p>
          <p>Before your start Russian journey, I want you to explore why do you need to learn Russian in below four
            cards. And if you find it useful, don’t forget to share it with your friends!</p>
          <div className="mt-4 flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto justify-center">
            <Button color="blue" label="Start Learning Free" href="#" />
            <Button color="red" label="See the Learning Path" href="#" />
          </div>
        </div>
        <div className="w-[350px] mx-auto lg:w-1/2 relative order-1 md:order-2">
          <div
            className="hero-text-box absolute w-[150px] lg:w-[200px] p-2.5 flex flex-wrap items-center justify-center right-0 xl:right-10"
          >
            <img
              src="./clouds.png"
              alt="quote"
              className=""
            />
            <div className="flex flex-col gap-2 absolute pt-3 lg:pt-5 text-white">
              <span className="text-lg lg:text-3xl font-semibold leading-none">Привет!</span>
            </div>
          </div>

          <figure>
            <img
              src="./teacher.png"
              alt="Teacher"
              className="w-1/2 mx-auto block"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default Banner
