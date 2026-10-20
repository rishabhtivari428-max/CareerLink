import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Briefcase, LogOut, User, Menu, X, PlusCircle, FileText } from 'lucide-react'

const Navbar = () => {
    const { user, logoutUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleLogout = async () => {
        await logoutUser()
        navigate('/')
        setMobileOpen(false)
    }

    const isActive = (path) => location.pathname === path

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center gap-2.5 group transition-transform active:scale-95"
                    >
                        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
                            <Briefcase className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-xl font-bold tracking-tight text-slate-900">Career</span>
                            <span className="text-xl font-bold tracking-tight text-blue-600">Link</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            to="/"
                            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive('/')
                                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive('/jobs')
                                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                            }`}
                        >
                            Browse Jobs
                        </Link>
                    </nav>

                    {/* Desktop Right Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs hover:shadow transition-all active:scale-[0.98]"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}

                        {user?.role === 'Applicant' && (
                            <>
                                <Link
                                    to="/myapp"
                                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/myapp')
                                            ? 'text-blue-600 bg-blue-50/80 font-semibold'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                                    }`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>My Applications</span>
                                </Link>
                                <div className="h-5 w-px bg-slate-200"></div>
                                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                                    <User className="w-3.5 h-3.5 text-blue-600" />
                                    <span>{user?.name || user?.username || 'Applicant'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    title="Sign Out"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 cursor-pointer transition-all"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}

                        {user?.role === 'Recruiter' && (
                            <>
                                <Link
                                    to="/recruiter"
                                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/recruiter')
                                            ? 'text-blue-600 bg-blue-50/80 font-semibold'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                                    }`}
                                >
                                    <PlusCircle className="w-4 h-4 text-blue-600" />
                                    <span>Recruiter Dashboard</span>
                                </Link>
                                <div className="h-5 w-px bg-slate-200"></div>
                                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-700 border border-blue-100">
                                    <span>Recruiter</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    title="Sign Out"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 cursor-pointer transition-all"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
                    <Link
                        to="/"
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-base font-medium ${
                            isActive('/') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/jobs"
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-base font-medium ${
                            isActive('/jobs') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        Browse Jobs
                    </Link>

                    {!user && (
                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMobileOpen(false)}
                                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}

                    {user?.role === 'Applicant' && (
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                            <Link
                                to="/myapp"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span>My Applications</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}

                    {user?.role === 'Recruiter' && (
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                            <Link
                                to="/recruiter"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                <PlusCircle className="w-4 h-4 text-blue-600" />
                                <span>Recruiter Dashboard</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

export default Navbar