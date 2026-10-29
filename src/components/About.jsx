import React from 'react'
import Button from './ui/Button'
import { motion } from "motion/react";
import { animationTop } from '../constants';

const About = () => {
  return (
    <section
      id="about"
      className="z-40 relative py-12 lg:py-20 flex items-center bg-gray-50"
    >
      <div className="custom-container relative z-40">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center lg:w-4/5 lg:mx-auto">

          <div className="lg:col-span-2">
            <div className="relative w-80 mx-auto">
              <img
                src="./owner.png"
                alt="Your Russian teacher"
                className="block mx-auto h-125 lg:h-150"
              />

              <div className="absolute bottom-50 xxs:bottom-[52%] left-0 xxs:left-6 bg-white shadow py-2 px-3 border-s-2 border-russian-red">
                <p className="text-sm text-russian-dark-blue leading-tight font-medium"><span
                  className="text-russian-red font-bold"
                >Free</span> First Lesson</p>
              </div>

              <div
                className="absolute bottom-40 xxs:bottom-24 left-0 xxs:-left-6 bg-white shadow py-2 px-3 border-s-2 border-russian-red">
                <p className="text-sm text-russian-dark-blue leading-tight font-medium"><span
                  className="text-russian-red font-bold"
                >Hindi</span> to Russian</p>
              </div>

              <div
                className="absolute bottom-30 xxs:bottom-auto xxs:top-[20%] left-0 xxs:-left-28 bg-white shadow py-2 px-3 border-s-2 border-russian-red"
              >
                <p className="text-sm text-russian-dark-blue leading-tight font-medium"><span
                  className="text-russian-red font-bold"
                >1.2k+</span> Happy Learners</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-start lg:col-span-3">
            <motion.p
              {...animationTop}
              className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">About me
            </motion.p>
            <motion.h1
              {...animationTop}
              transition={{
                ...animationTop.transition,
                delay: 0.05,
              }}
              className="heading"><span className="text-russian-red font-bold">Привет!</span> I'm your Russian teacher.</motion.h1>
            <motion.p
              {...animationTop}
              transition={{
                ...animationTop.transition,
                delay: 0.1,
              }}
            >I help Hindi speakers learn Russian in a simple, friendly way. I know how confusing a new alphabet and
              new
              grammar can feel, so every lesson starts from what you already know and builds step by step.</motion.p>
            <motion.p
              {...animationTop}
              transition={{
                ...animationTop.transition,
                delay: 0.1,
              }}
            >My goal is simple: help you read, understand and speak Russian with confidence, whether it is for travel,
              study, work or just for fun.</motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-4 text-start w-full">
              <motion.div
                {...animationTop}
                transition={{
                  ...animationTop.transition,
                  delay: 0.15,
                }}
                className="flex flex-col border-b sm:border-r sm:border-b-0 border-dashed border-gray-300 pb-6 sm:pb-0 sm:pr-4 max-sm:[&:nth-child(2n)]:border-r-0 text-center sm:text-start"
              >
                <p className="font-bold lg:text-15 text-russian-dark-blue">Experience</p>
                <p className="lg:text-sm leading-5">5+ years teaching Russian <span
                  className="font-bold lg:text-xs text-russian-red block">TORFL
                  Certified</span></p>
              </motion.div>

              <motion.div
                {...animationTop}
                transition={{
                  ...animationTop.transition,
                  delay: 0.2,
                }}
                className="flex flex-col border-b sm:border-r sm:border-b-0 border-dashed border-gray-300 pb-6 sm:pb-0 sm:pr-4 max-sm:[&:nth-child(2n)]:border-r-0 text-center sm:text-start"
              >
                <p className="font-bold lg:text-15 text-russian-dark-blue">Availability</p>
                <p className="lg:text-sm leading-5">Online classes <br /> <span className="font-bold lg:text-xs text-russian-red block">Mon–Fri,
                  10 AM-7
                  PM</span>
                </p>
              </motion.div>

              <motion.div
                {...animationTop}
                transition={{
                  ...animationTop.transition,
                  delay: 0.25,
                }}
                className="flex flex-col border-b sm:border-none border-dashed border-gray-300 pb-6 sm:pb-0 sm:pr-4 text-center sm:text-start"
              >
                <p className="font-bold lg:text-15 text-russian-dark-blue mb-1">Rating</p>
                <div className="flex gap-3 justify-center sm:justify-start">
                  <p className="text-15 font-bold text-russian-red leading-4.5">4.9</p>
                  <div>
                    <div className="flex gap-0.5 text-yellow-400 text-[10px] mb-0.5">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-sm lg:text-xs leading-4! text-gray-600">Based on 320 reviews</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto mt-4">
              <Button color="blue" label="Visit youtube channel" href="#video" {...animationTop}
                transition={{
                  ...animationTop.transition,
                  delay: 0.3,
                }} />
              <Button color="red" label="Contact me" href="#enquiry" {...animationTop}
                transition={{
                  ...animationTop.transition,
                  delay: 0.35,
                }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
