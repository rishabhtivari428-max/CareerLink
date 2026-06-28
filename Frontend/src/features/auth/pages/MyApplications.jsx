import React from 'react'
import { useState, useEffect } from 'react'
import { getAllApp } from '../services/apply.api'

const MyApplications = () => {
    const [apps, setapps] = useState([])
    const [loading, setloading] = useState(false)

    const handleFetchJobs = async (e) => {
        setloading(true)
        try {
            const response = await getAllApp()
            setapps(response.applications || [])
        } catch (error) {
            console.log("Error while fetching jobs: ", error)
        }
        finally {
            setloading(false)
        }
    }

    useEffect(() => {
        handleFetchJobs()
    }, [])

    console.log(apps)

    return (
        <div className='mt-40 bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow'>
            {loading && <h1 className="text-gray-500 font-semibold mb-4">Loading applications...</h1>}
            {!loading && apps.length === 0}
            <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
                <h2 className="text-5xl font-bold text-gray-700">🏢</h2>
                <h2 className="text-xl font-bold text-gray-700">No applied jobs yet</h2>
                <p className="text-gray-400 text-sm">Explore open positions and start applying to see them here!</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {apps.map((app) => {
                    return (
                        <div key={app._id} className='border border-gray-200 rounded-lg p-5 bg-slate-50 hover:border-blue-500 transition-colors flex flex-col gap-2'>
                            <div className='flex items-center justify-between border-b border-gray-100 pb-2 mb-1'>
                                <span className='text-sm font-semibold text-gray-500 uppercase tracking-wider'>Title</span>
                                <span className='font-bold text-gray-800 text-md'>{app.job?.title || "Not Available"}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-medium text-gray-400'>Company</span>
                                <span className='text-gray-700 font-medium'>{app.job?.company || "N/A"}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-medium text-gray-400'>Type</span>
                                <span className='text-gray-700 font-medium'>{app.job?.location || "N/A"}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-medium text-gray-400'>Salary</span>
                                <span className='text-gray-700 font-medium'>{app.job?.Salary || "N/A"}</span>
                            </div>
                            <div className='flex items-center justify-between mt-2 pt-2 border-t border-gray-100'>
                                <span className='text-sm font-medium text-gray-400'>Status</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${app.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : app.status === 'Accepted' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}`}>{app.status || "Pending"}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default MyApplications