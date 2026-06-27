import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className='h-screen bg-blue-700'>
        <h1 className='text-center pt-30 text-white font-bold text-8xl'>CareerLink</h1>
        <p className='text-center text-lg text-white font-medium mt-2'>Find your dream job or hire the best talent</p>
        <div className='pt-4 flex gap-6 mt-3 justify-center'>
        <Link to='/register' className='bg-white text-blue-600 font-semibold px-6 py-2 rounded-full'>Get Started</Link>
        <Link to='/login' className='border-2 border-white text-white font-semibold px-6 py-2 rounded-full bg-transparent'>Login</Link>
        </div>
    </div>
  )
}

export default Home