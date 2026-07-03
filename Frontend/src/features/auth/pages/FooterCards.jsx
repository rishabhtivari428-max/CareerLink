import React from 'react'

const FooterCards = () => {
    return (
        <div className='pt-20 pb-24 bg-gray-50/50 select-none'>
            <section className='max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center'>
                <div className='bg-white border border-gray-100 p-8 min-h-[260px] w-full max-w-[360px] rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group'>
                    <span className='text-3xl bg-blue-50 text-blue-600 p-4 rounded-2xl transition-colors group-hover:bg-blue-600 group-hover:text-white' role="img" aria-label="search">🔍</span>
                    <h3 className="text-xl pt-5 font-extrabold text-gray-800 font-['Inter']">Smart Job Search</h3>
                    <p className='text-sm text-gray-500 font-medium mt-3 leading-relaxed'>
                        Browse curated job listings filtered by role, location, and salary range with ease.
                    </p>
                </div>
                <div className='bg-white border border-gray-100 p-8 min-h-[260px] w-full max-w-[360px] rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group'>
                    <span className='text-3xl bg-pink-50 text-pink-600 p-4 rounded-2xl transition-colors group-hover:bg-pink-600 group-hover:text-white' role="img" aria-label="rocket">🚀</span>
                    <h3 className="text-xl pt-5 font-extrabold text-gray-800 font-['Inter']">On-Click Apply</h3>
                    <p className='text-sm text-gray-500 font-medium mt-3 leading-relaxed'>
                        Apply to jobs instantly and track every application status in real time.
                    </p>
                </div>
                <div className='bg-white border border-gray-100 p-8 min-h-[260px] w-full max-w-[360px] sm:col-span-2 md:col-span-1 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group'>
                    <span className='text-3xl bg-teal-50 text-teal-600 p-4 rounded-2xl transition-colors group-hover:bg-teal-600 group-hover:text-white' role="img" aria-label="building">🏢</span>
                    <h3 className="text-xl pt-5 font-extrabold text-gray-800 font-['Inter']">For Recruiters</h3>
                    <p className='text-sm text-gray-500 font-medium mt-3 leading-relaxed'>
                        Post jobs, manage applications, and find the perfect candidate — all in one place.
                    </p>
                </div>

            </section>
        </div>
    )
}

export default FooterCards