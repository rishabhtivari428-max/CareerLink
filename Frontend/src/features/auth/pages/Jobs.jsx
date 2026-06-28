import React from 'react'
import { postJob, getJob, deleteJob } from '../services/jobs.api'
import { apply } from '../services/apply.api'
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'

const Jobs = () => {
    const [jobs, setjobs] = useState([])
    const [loading, setloading] = useState(false)
    const [applied, setapplied] = useState(false)
    const [appliedJobs, setAppliedJobs] = useState([])

    const { user } = useAuth()

    const fetchJobs = useCallback(async () => {
        setloading(true)
        try {
            const response = await getJob()
            setjobs(response.job || [])
        } catch (error) {
            console.log("Error while fetching Jobs: ", error)
        }
        finally {
            setloading(false)
        }
    }, [])

    console.log(user)

    const addJob = async (title, description, location, requirements, company) => {
        const response = await postJob(title, description, location, requirements, company)
        if (response.job) {
            setjobs(prev => [...prev, response.job])
        }
    }

    const applyJob = async (id) => {
        const response = await apply(id)
        setAppliedJobs(prev => [...prev, id])
        console.log("Applied successfully", response)
    }

    const removeJob = async (id) => {
        await deleteJob(id)
        setjobs(prev => prev.filter(j => j._id !== id))
    }

    useEffect(() => {
        fetchJobs()
    }, [fetchJobs])

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            {loading && <h1>Loading...</h1>}
            <div className="grid grid-cols-3 gap-4">
                {jobs.map((job) => (
                    <div key={job._id} className="border p-4 rounded-lg ">
                        <h2 className="font-bold text-xl text-gray-800 mb-2">{job.title}</h2>
                        <p><span className='text-blue-600 font-semibold mb-1'>Company: </span>{job.company}</p>
                        <p><span className='text-gray-500 text-sm mb-1'>Type: </span>{job.location}</p>
                        <p><span className='text-gray-600 text-sm mb-4'>Requirements: </span>{job.requirements}</p>
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

export default Jobs