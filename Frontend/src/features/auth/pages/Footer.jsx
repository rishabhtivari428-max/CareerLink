import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, ArrowRight } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="mt-12 border-t border-slate-200/80 bg-white">
            {/* CTA Banner */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
                <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
                            Ready to take the next step?
                        </h2>
                        <p className="text-slate-300 pt-3 text-sm sm:text-base leading-relaxed">
                            Join thousands of professionals and hiring managers who trust CareerLink to connect talent with opportunity.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link 
                                to="/register" 
                                className="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm active:scale-[0.98] text-sm"
                            >
                                <span>Create Free Account</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-100 py-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                            <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">CareerLink</span>
                        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <Link to="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
                        <Link to="/login" className="hover:text-blue-600 transition-colors">Sign In</Link>
                        <Link to="/register" className="hover:text-blue-600 transition-colors">Sign Up</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer