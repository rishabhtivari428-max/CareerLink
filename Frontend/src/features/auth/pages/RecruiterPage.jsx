import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getJob, postJob } from '../services/jobs.api'

const RecruiterPage = () => {
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [company, setcompany] = useState("")
    const [requirements, setrequirements] = useState("")
    const [location, setlocation] = useState("")
    const [Salary, setSalary] = useState("")

    const [jobs, setjobs] = useState([])
    const { user, loading } = useAuth()

    const fetchJobs = async () => {
        try {
            const response = await getJob()
            const allJobs = response.job || []
            const myJobs = allJobs.filter(job => job.postedBy === user?._id)
            setjobs(myJobs)
            console.log("Jobs fetched successfully")
        } catch (error) {
            console.log("Error while fetching jobs: ", error)
        }
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await postJob(title, description, location, requirements, company, Salary)
            if (response.job) {
                setjobs(prev => [...prev, response.job])
                settitle("")
                setdescription("")
                setcompany("")
                setrequirements("")
                setlocation("")
                setSalary("")
            }
        } catch (error) {
            console.log("Error while posting job: ", error)
        }
    }

    useEffect(() => {
        if (user) {
            fetchJobs()
        }
    }, [user])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium">Loading recruiter dashboard...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Job Title</label>
                            <input type="text"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                placeholder='e.g. Senior Frontend Developer'
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Company Name</label>
                            <input type="text"
                                value={company}
                                onChange={(e) => setcompany(e.target.value)}
                                placeholder='e.g. Acme Corp'
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Salary Range</label>
                            <input type="text"
                                value={Salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder='e.g. $80k - $100k'
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Location Type</label>
                            <select
                                value={location}
                                onChange={(e) => setlocation(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50"
                                required
                            >
                                <option value="">Select Location</option>
                                <option value="Remote">Remote</option>
                                <option value="onSite">On-site</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Requirements</label>
                            <input type="text"
                                value={requirements}
                                onChange={(e) => setrequirements(e.target.value)}
                                placeholder='e.g. React, Node.js, 3+ years experience (comma separated)'
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50"
                                required
                            />
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-600 mb-1">Job Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                placeholder='Describe the role and responsibilities...'
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 resize-none"
                                required
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type='submit'
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition cursor-pointer"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Your Posted Jobs</h2>

                    {jobs.length === 0 ? (
                        <p className="text-gray-500 bg-white p-6 rounded-xl border border-gray-100 text-center">You haven't posted any jobs yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div key={job._id} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition">
                                    <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{job.company} • <span className="capitalize">{job.location === 'onSite' ? 'On-site' : job.location}</span> • {job.Salary}</p>
                                    <p className="text-sm text-gray-600 mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecruiterPage