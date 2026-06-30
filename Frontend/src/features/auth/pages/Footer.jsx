import React from 'react'
import { Link } from 'react-router-dom' // 💡 Make sure it's from 'react-router-dom'

const Footer = () => {
    return (
        <div className='text-center bg-blue-700 py-12 select-none'>
            <h1 className='font-bold text-3xl text-white'>Ready to take next step?</h1>
            <p className='text-white pt-1'>Join thousands of professionals who trust CareerLink</p>
            <Link to='/register' className='inline-block px-8 py-3 bg-white text-blue-700 font-bold mt-6 rounded-full hover:bg-blue-50 transition-all shadow-md text-center'>Create Free Account</Link>
        </div>
    )
}

export default Footer