import React from 'react'
import { Link } from 'react-router'
import { Briefcase, Building2, Users, ArrowRight, Sparkles } from 'lucide-react'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-20 pb-24 md:pt-28 md:pb-32 border-b border-slate-100">
        {/* Subtle decorative background circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide shadow-2xs mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Career Starts Here</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Find Your Dream Job with{' '}
            <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">CareerLink</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Connecting ambitious candidates with industry-leading companies. Browse verified job openings or hire top-tier talent in minutes.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center mt-9 gap-3 sm:gap-4 px-4">
            <Link
              to="/jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] text-sm"
            >
              <span>Explore All Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3 rounded-xl border border-slate-200 shadow-2xs transition-all text-sm active:scale-[0.98]"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 -mt-10 md:-mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-13 h-13 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">10,000+</div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">Active Job Openings</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-13 h-13 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">5,000+</div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">Verified Companies</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-13 h-13 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">50,000+</div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">Successful Placements</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home