import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='text-center bg-blue-700 py-16 px-4 select-none mt-20'>
            <h1 className='font-bold text-2xl md:text-4xl text-white'>
                Ready to take the next step?
            </h1>
            <p className='text-blue-100 pt-2 text-sm md:text-base'>
                Join thousands of professionals who trust CareerLink
            </p>
            <Link to='/register' className='inline-block px-8 py-3 bg-white text-blue-700 font-bold mt-6 rounded-full hover:bg-blue-50 transition-all shadow-md text-center text-sm md:text-base'>Create Free Account</Link>
        </div>
    )
}

export default Footer