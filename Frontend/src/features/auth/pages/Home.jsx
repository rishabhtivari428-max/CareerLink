import React from 'react'

const Home = () => {
  return (
    <>
      <section className="bg-blue-700 min-h-[500px] pt-24 pb-20 select-none">
        <div className="text-center bg-transparent text-white font-medium text-sm tracking-wide">
          🚀 Your Career Starts Here
        </div>
        <h1 className="text-center text-3xl md:text-5xl pt-4 font-bold text-white font-['Inter'] leading-tight">
          Find Your Dream Job <br /> with CareerLink
        </h1>
        <p className="text-center mt-4 text-blue-100 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-4">
          Connecting top talent with leading companies. Browse thousands of jobs <br className="hidden md:inline" />
          or post your next opportunity today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center pt-6 gap-4 px-4">
          <button className="bg-white text-blue-700 font-bold py-3 w-44 rounded-full shadow-sm hover:bg-blue-50 transition-all cursor-pointer text-center">
            Get Started Free
          </button>
          <button className="bg-transparent border border-white text-white font-bold py-3 w-44 rounded-full hover:bg-white/10 transition-all cursor-pointer text-center">
            Login
          </button>
        </div>
      </section>
      <section className='max-w-6xl mx-auto px-6 relative z-10 -mt-16 flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='bg-white border text-center pt-8 border-gray-100 h-44 w-full md:max-w-[280px] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'>
          <p className='text-3xl'>💼</p>
          <h1 className='text-3xl pt-2 font-extrabold text-blue-600'>10,000+</h1>
          <p className='font-bold text-gray-700 mt-1'>Jobs Listed</p>
        </div>
        <div className='bg-white border text-center pt-8 border-gray-100 h-44 w-full md:max-w-[280px] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'>
          <p className='text-3xl'>🎉</p>
          <h1 className='text-3xl pt-2 font-extrabold text-blue-600'>5,000+</h1>
          <p className='font-bold text-gray-700 mt-1'>Companies Hiring</p>
        </div>
        <div className='bg-white border text-center pt-8 border-gray-100 h-44 w-full md:max-w-[280px] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'>
          <p className='text-3xl'>🏢</p>
          <h1 className='font-extrabold text-3xl text-blue-600'>50,000+</h1>
          <p className='font-bold text-gray-700 mt-1'>Happy Candidates</p>
        </div>
      </section>
    </>
  )
}

export default Home