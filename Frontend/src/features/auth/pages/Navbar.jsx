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
        <div className='bg-blue-700' >
            <nav className='flex flex-col md:flex-row justify-between p-6 text-white font-bold items-center'>
                <Link to='/'>
                    CareerLink
                </Link>
                <div className='flex gap-6 md: pt-4'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/jobs'>Jobs</Link>
                </div>
                <div className='flex gap-4 items-center'>
                    {!user && (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register' className='bg-white text-blue-600 p-1 rounded'>
                                Register
                            </Link>
                        </>
                    )}
                    {user?.role === 'Applicant' && (
                        <>
                            <Link to='/myapp' className='hover:underline md: pt-4'>My Applications</Link>
                            <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded-full cursor-pointer transition-colors md: mt-4'>Logout</button>
                        </>
                    )}
                    {user?.role === 'Recruiter' && (
                        <>
                            <Link to='/recruiter' className='hover:underline pt-4'>Recruiter Page</Link>
                            <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded-full cursor-pointer transition-colors'>Logout</button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar