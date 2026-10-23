import React from 'react'

const Newsletter = () => {
  return (
     <section
      id="newsletter"
      className="z-40 relative py-12 lg:py-20 overflow-hidden bg-gray-50"
    >
      <div className="custom-container">
        <div className="relative flex flex-col lg:w-1/2 mx-auto gap-6 text-center items-center">
          <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Newsletter
          </p>
          <h1 className="heading">Stay connected, <span className="text-russian-red">keep learning</span></h1>
          <p>Get one new word, one grammar tip and one free practice quiz in your inbox every
            week. No spam, unsubscribe anytime.</p>
          <form
            className="flex flex-wrap flex-col sd:flex-row gap-3 max-w-xl w-full mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className='flex-1 rounded border border-gray-200 bg-white px-4 py-2 placeholder:text-gray-400 text-gray-600 focus:ring-2 focus:ring-russian-red focus:outline-hidden focus:border-russian-blue resize-none'
            />
            <button
              type="submit"
              className="button button-russian-red"
            ><span>Subscribe</span></button>
          </form>
          <p className="text-sm">Join 1.2k+ learners already reading.</p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
