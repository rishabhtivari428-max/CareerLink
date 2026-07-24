import React from 'react'
import { postJob, getJob, deleteJob } from '../services/jobs.api'
import { apply } from '../services/apply.api'
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'

const Jobs = () => {
    const { user, loading: authLoading } = useAuth()

    const [jobs, setjobs] = useState([])
    const [loading, setloading] = useState(false)
    const [Salary, setSalary] = useState("")


    const [appliedJobs, setAppliedJobs] = useState(() => {
        const saved = localStorage.getItem('appliedJobs')
        return saved ? JSON.parse(saved) : []
    })

    const fetchJobs = useCallback(async () => {
        setloading(true)
        try {
            const response = await getJob()
            setjobs(response.data || [])
        }
        catch (error) {
            console.log("Error while fetching Jobs: ", error)
        }
        finally {
            setloading(false)
        }
    }, [])

    useEffect(() => {
        fetchJobs()
    }, [fetchJobs])

    // Early returns (Safely below all hooks)
    if (loading || authLoading) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <h1 className="text-xl font-medium text-gray-500 animate-pulse">Loading amazing opportunities...</h1>
            </div>
        )
    }

    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-36 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <div className="text-6xl mb-3">💼</div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">No Jobs Openings Available</h2>
                <p className="text-gray-500 text-sm max-w-sm mb-4">
                    Looks like recruiters haven't posted any jobs recently. Check back in a while!
                </p>
                <button
                    onClick={fetchJobs}
                    className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition"
                >
                    Refresh Board
                </button>
            </div>
        )
    }

    const addJob = async (title, description, location, requirements, company, Salary) => {
        const response = await postJob(title, description, location, requirements, company, Salary)
        if (response.job) {
            setjobs(prev => [...prev, response.job])
        }
    }

    const applyJob = async (id) => {
        try {
            const response = await apply(id)

            // 💡 Save tracking array immediately to localStorage
            setAppliedJobs(prev => {
                const updated = [...prev, id]
                localStorage.setItem('appliedJobs', JSON.stringify(updated))
                return updated
            })
            console.log("Applied successfully", response)
        } catch (error) {
            console.log("Failed to apply:", error)
        }
    }

    const removeJob = async (id) => {
        await deleteJob(id)
        setjobs(prev => prev.filter(j => j._id !== id))
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {jobs.map((job) => (
                    <div key={job._id} className="border p-4 rounded-lg ">
                        <h2 className="font-bold text-xl text-gray-800 mb-2">{job.title}</h2>
                        <p><span className='text-blue-600 font-semibold mb-1'>Company: </span>{job.company}</p>
                        <p><span className='text-gray-500 text-sm mb-1'>Type: </span>{job.location}</p>
                        <p><span className='text-gray-500 text-sm mb-1'>Description: </span>{job.description}</p>
                        <p><span className='text-gray-600 text-sm mb-4'>Requirements: </span>{job.requirements}</p>
                        <p><span className='text-gray-600 text-sm mb-4'>Salary: </span>{job.Salary}</p>
                        {user?.role === 'Applicant' && (
                            <button
                                onClick={() => applyJob(job._id)}
                                className='p-1 mt-3 rounded-xs font-bold text-white cursor-pointer bg-blue-700'
                            >
                                {appliedJobs.includes(job._id) ? "Applied" : "Apply"}
                            </button>
                        )}
                        {user?.role === 'Recruiter' && (
                            <button onClick={() => removeJob(job._id)} className='p-1 mt-3 rounded-xs font-bold text-white bg-red-500 cursor-pointer'>Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Jobs;