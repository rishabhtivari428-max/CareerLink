import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <div className='bg-blue-700'>
            <nav className='flex justify-between p-6 text-white font-bold'>
                <Link to='/'>
                    CareerLink
                </Link>
                <div className='flex gap-6'>
                    <Link to='/'>Home</Link>
                    <Link>About</Link>
                    <Link>Services</Link>
                </div>
                <div className='flex gap-4'>
                    <Link to='/login'>Login</Link>
                    <Link to='/register' className='bg-white text-blue-600 font-semibold px-2 py-1 rounded-full'>Register</Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar