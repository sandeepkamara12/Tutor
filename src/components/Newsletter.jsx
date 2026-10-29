import React from 'react'
import { motion } from "motion/react";
import { animationTop } from '../constants';

const Newsletter = () => {
  return (
    <section
      id="newsletter"
      className="z-40 relative py-12 lg:py-20 overflow-hidden"
    >
      <div className="custom-container">
        <div className="relative flex flex-col lg:w-1/2 mx-auto gap-6 text-center items-center">
          <motion.p
            {...animationTop}
            className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Newsletter
          </motion.p>
          <motion.h1
            {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.05,
            }}
            className="heading">Stay connected, <span className="text-russian-red">keep learning</span></motion.h1>
          <motion.p
            {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.1,
            }}
          >Get one new word, one grammar tip and one free practice quiz in your inbox every
            week. No spam, unsubscribe anytime.</motion.p>
          <form
            className="flex flex-wrap flex-col sd:flex-row gap-3 max-w-xl w-full mx-auto"
          >
            <motion.input
             {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.15,
            }}
              type="email"
              required
              placeholder="Enter your email"
              className='flex-1 rounded border border-gray-200 bg-white px-4 py-2 placeholder:text-gray-400 text-gray-600 focus:ring-2 focus:ring-russian-red focus:outline-hidden focus:border-russian-blue resize-none'
            />
            <motion.button
             {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.2,
            }}
              type="submit"
              className="button button-russian-red"
            ><span>Subscribe</span></motion.button>
          </form>
          <motion.p
           {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.15,
            }}
           className="text-sm">Join 1.2k+ learners already reading.</motion.p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
