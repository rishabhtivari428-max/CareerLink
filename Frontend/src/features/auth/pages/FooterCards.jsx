import React from 'react'

const FooterCards = () => {
    return (
        <div className='pt-20 pb-24 bg-white'>
            <section className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8'>
                <div className='bg-white border p-6 border-gray-100 min-h-[220px] w-full max-w-[340px] mx-auto rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center'>
                    <span className='text-3xl bg-blue-50 p-3 rounded-xl' role="img" aria-label="search">🔍</span>
                    <h3 className="text-xl pt-4 font-bold text-gray-800 font-['Inter']">Smart Job Search</h3>
                    <p className='text-sm text-gray-500 font-medium mt-2 leading-relaxed'>
                        Browse curated job listings filtered by role, location, and salary range with ease.
                    </p>
                </div>
                <div className='bg-white border p-6 border-gray-100 min-h-[220px] w-full max-w-[340px] mx-auto rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center'>
                    <span className='text-3xl bg-pink-50 p-3 rounded-xl' role="img" aria-label="rocket">🚀</span>
                    <h3 className="text-xl pt-4 font-bold text-gray-800 font-['Inter']">On-Click Apply</h3>
                    <p className='text-sm text-gray-500 font-medium mt-2 leading-relaxed'>
                        Apply to jobs instantly and track every application status in real time.
                    </p>
                </div>
                <div className='bg-white border p-6 border-gray-100 min-h-[220px] w-full max-w-[340px] mx-auto rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center'>
                    <span className='text-3xl bg-teal-50 p-3 rounded-xl' role="img" aria-label="building">🏢</span>
                    <h3 className="text-xl pt-4 font-bold text-gray-800 font-['Inter']">For Recruiters</h3>
                    <p className='text-sm text-gray-500 font-medium mt-2 leading-relaxed'>
                        Post jobs, manage applications, and find the perfect candidate — all in one place.
                    </p>
                </div>

            </section>
        </div>
    )
}

export default FooterCards