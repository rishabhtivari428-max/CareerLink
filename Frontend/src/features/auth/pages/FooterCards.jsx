import React from 'react'
import { Search, Zap, Building2, CheckCircle2 } from 'lucide-react'

const FooterCards = () => {
    return (
        <div className="pb-20 select-none">
            <section className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-white border border-slate-200/90 p-7 rounded-2xl shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Search className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        Smart Job Search
                    </h3>
                    <p className="text-sm text-slate-500 font-normal mt-2.5 leading-relaxed">
                        Explore verified listings filtered by title, company, salary range, and job role with zero clutter.
                    </p>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Instant real-time filtering</span>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white border border-slate-200/90 p-7 rounded-2xl shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Zap className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        One-Click Apply
                    </h3>
                    <p className="text-sm text-slate-500 font-normal mt-2.5 leading-relaxed">
                        Submit applications instantly. Track interview and evaluation progress live in your personal dashboard.
                    </p>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Live application tracking</span>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white border border-slate-200/90 p-7 rounded-2xl shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Building2 className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        For Hiring Recruiters
                    </h3>
                    <p className="text-sm text-slate-500 font-normal mt-2.5 leading-relaxed">
                        Post detailed vacancies in seconds, evaluate applicant profiles, review resumes, and make decisions seamlessly.
                    </p>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Integrated candidate review</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FooterCards