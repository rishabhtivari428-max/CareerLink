import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Briefcase, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const { loginUser, loading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser(email, password)
            navigate('/')
        } catch (error) {
            console.log("Error while logging you in...", error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
                <p className="text-slate-600 font-medium text-sm">Signing into your account...</p>
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
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
                        <p className="text-slate-500 text-sm mt-1.5">Sign in to manage applications and jobs</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all text-sm cursor-pointer active:scale-[0.99]"
                        >
                            <span>Sign In</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-100"></div>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-slate-100"></div>
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        Don't have an account yet?{' '}
                        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                            Create one free
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    By signing in, you agree to our Terms of Service & Privacy Policy.
                </p>
            </div>
        </div>
    )
}

export default Login
