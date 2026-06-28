import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
    const { user, logoutUser } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutUser()
        navigate('/')
    }

    return (
        <div className='bg-blue-700'>
            <nav className='flex justify-between p-6 text-white font-bold'>
                <Link to='/'>
                    CareerLink
                </Link>
                <div className='flex gap-6'>
                    <Link to='/'>Home</Link>
                    <Link>About</Link>
                    <Link to='/jobs'>Jobs</Link>
                </div>
                <div className='flex gap-4 items-center'>
                    {user ? (
                        <>
                            <Link to='/myapp'>My Applications</Link>
                            <button
                                onClick={handleLogout}
                                className='bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-full cursor-pointer transition-colors'
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register' className='bg-white text-blue-600 font-semibold px-2 py-1 rounded-full'>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar