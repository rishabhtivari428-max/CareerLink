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
    const [role, setrole] = useState("")
    const [jobs, setjobs] = useState([])
    const { loading } = useAuth()

    const handlePostJob = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await getJob({ title, company, Salary, location, description })
            setjobs(response.data || [])
            console.log("Jobs fetched successfully")
        } catch (error) {
            console.log("Error while fetching jobs")
        }
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await postJob(title, description, location, requirements, company, Salary, role)
            setjobs(response.data || [])
        } catch (error) {
            console.log("Error while posting job: ", error)
        }
    }

    useEffect(() => {
        handlePostJob()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    placeholder='Enter Job Title'
                />
                <input type="text"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                    placeholder='Enter Role'
                />
                <input type="text"
                    value={company}
                    onChange={(e) => setcompany(e.target.value)}
                    placeholder='Enter Company'
                />
                <input type="text"
                    value={Salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder='Enter Salary'
                />
                <input type="text"
                    value={requirements}
                    onChange={(e) => setrequirements(e.target.value)}
                    placeholder='Enter Requirements'
                />
                <input type="text"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    placeholder='Enter Description'
                />
                <input type="text"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    placeholder='Enter Location'
                />
                <button type='submit'>Post Job</button>
            </form>
            <div className="mt-12 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Your Posted Jobs</h2>

                {jobs.length === 0 ? (
                    <p className="text-gray-500">You haven't posted any jobs yet.</p>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <div key={job._id} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                                <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                                <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecruiterPage