import React from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role, setrole] = useState("")
    const { registerUser, loading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registerUser(username, email, password, role)
            navigate('/login')
            console.log("User registered successfully")
        } catch (error) {
            console.log("Error while registering user: ", error)
        }
        setusername("")
        setemail("")
        setpassword("")
        setrole("")
    }

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-50'>
                <div className='text-blue-700 font-semibold text-lg animate-pulse'>Creating your account...</div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-10'>
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-700 text-white text-2xl font-extrabold mb-4'>
                            C
                        </div>
                        <h1 className='text-2xl font-extrabold text-gray-800'>Create Your Account</h1>
                        <p className='text-gray-500 text-sm mt-1'>Join CareerLink and unlock your next opportunity</p>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1.5'>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                placeholder='e.g. john_doe'
                                required
                                className='px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 bg-gray-50 transition placeholder-gray-400'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1.5'>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder='you@example.com'
                                required
                                className='px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 bg-gray-50 transition placeholder-gray-400'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1.5'>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder='Create a strong password'
                                required
                                className='px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 bg-gray-50 transition placeholder-gray-400'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1.5'>I am a...</label>
                            <select
                                value={role}
                                onChange={(e) => setrole(e.target.value)}
                                required
                                className='px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 bg-gray-50 transition'>
                                <option value="">Select your role</option>
                                <option value="Applicant">Applicant — looking for a job</option>
                                <option value="Recruiter">Recruiter — hiring talent</option>
                            </select>
                        </div>
                        <button type='submit' className='w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer mt-1'>Create Account</button>
                    </form>
                    <div className='flex items-center gap-3 my-6'>
                        <div className='flex-1 h-px bg-gray-100'></div>
                        <span className='text-xs text-gray-400 font-medium'>OR</span>
                        <div className='flex-1 h-px bg-gray-100'></div>
                    </div>
                    <p className='text-center text-sm text-gray-500'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-blue-600 font-semibold hover:underline'>
                            Login here
                        </Link>
                    </p>
                </div>
                <p className='text-center text-xs text-gray-400 mt-6'>
                    By registering, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}

export default Register