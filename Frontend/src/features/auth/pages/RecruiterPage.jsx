import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getJob, postJob } from '../services/jobs.api'
import { useNavigate } from 'react-router'

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

    const navigate = useNavigate()

    const fetchJobs = async () => {
        try {
            const response = await getJob()
            const jobsData = response.data.jobs || response.data;
            setjobs(jobsData || [])
            console.log("Jobs fetched successfully")
        } catch (error) {
            console.log("Error while fetching jobs:", error)
        }
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await postJob(title, description, location, requirements, company, Salary, role)
            console.log("Job Posted Successfully")
            alert("Job Posted Successfully")
            settitle("")
            setdescription("")
            setcompany("")
            setrequirements("")
            setlocation("")
            setSalary("")
            fetchJobs()
        } catch (error) {
            console.log("Error while posting job: ", error)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-4">
                <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder='Enter Job Title' className="w-full border p-2 rounded" />
                <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Enter Job Description' className="w-full border p-2 rounded" />
                <input type="text" value={location} onChange={(e) => setlocation(e.target.value)} placeholder='Enter Job Location' className="w-full border p-2 rounded" />
                <input type="text" value={requirements} onChange={(e) => setrequirements(e.target.value)} placeholder='Enter Job Requirements' className="w-full border p-2 rounded" />
                <input type="text" value={company} onChange={(e) => setcompany(e.target.value)} placeholder='Enter Company Name' className="w-full border p-2 rounded" />
                <input type="text" value={Salary} onChange={(e) => setSalary(e.target.value)} placeholder='Enter Job Salary' className="w-full border p-2 rounded" />
                <button type='submit' className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full font-bold">Post Job</button>
            </form>
            <div className="mt-12 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Your Posted Jobs (Click card to view applicants)</h2>
                {jobs.length === 0 ? (
                    <p className="text-gray-500">You haven't posted any jobs yet.</p>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/applicants/${job._id}`)}
                                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-blue-500 hover:shadow transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                                        <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                                        <p className="text-sm text-gray-600 mt-2">{job.requirements}</p>
                                        {job.Salary && <p className="text-sm text-blue-600 font-medium mt-2">Salary: {job.Salary}</p>}
                                    </div>
                                    <button className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-medium">
                                        Applicants →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecruiterPage