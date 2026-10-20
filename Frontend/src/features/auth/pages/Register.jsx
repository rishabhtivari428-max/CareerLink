import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Briefcase, User, Mail, Lock, UserCheck, ArrowRight, Loader2 } from 'lucide-react'

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
            <div className="min-h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
                <p className="text-slate-600 font-medium text-sm">Creating your CareerLink profile...</p>
            </div>
        )
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xs border border-slate-200/90 p-8 sm:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white mb-4 shadow-2xs">
                            <Briefcase className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create your account</h1>
                        <p className="text-slate-500 text-sm mt-1.5">Join CareerLink and explore opportunities</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Full Name or Username
                            </label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    placeholder="e.g. Alex Johnson"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                I am registering as
                            </label>
                            <div className="relative">
                                <UserCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <select
                                    value={role}
                                    onChange={(e) => setrole(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 cursor-pointer"
                                >
                                    <option value="" disabled>Select your account type</option>
                                    <option value="Applicant">Job Seeker / Applicant</option>
                                    <option value="Recruiter">Hiring Manager / Recruiter</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all text-sm cursor-pointer active:scale-[0.99]"
                        >
                            <span>Create Account</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-100"></div>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-slate-100"></div>
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    By registering, you agree to our Terms of Service & Privacy Policy.
                </p>
            </div>
        </div>
    )
}

export default Register