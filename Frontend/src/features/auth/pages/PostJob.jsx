import React from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { postJob } from '../services/jobs.api'

const PostJob = () => {
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [company, setcompany] = useState("")
    const [requirements, setrequirements] = useState("")
    const [location, setlocation] = useState("")
    const [Salary, setSalary] = useState("")
    const { loading } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await postJob(title, description, location, requirements, company, Salary)
            settitle("")
            setdescription("")
            setcompany("")
            setrequirements("")
            setlocation("")
            setSalary("")
            alert("Job Posted Successfully")
        } catch (error) {
            console.log("Error while Posting Job: ", error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder='Enter Job Title'
            />
            <input type="text"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder='Enter Job Description'
            />
            <input type="text"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                placeholder='Enter Job Location'
            />
            <input type="text"
                value={requirements}
                onChange={(e) => setrequirements(e.target.value)}
                placeholder='Enter Job Requirements'
            />
            <input type="text"
                value={company}
                onChange={(e) => setcompany(e.target.value)}
                placeholder='Enter Company Name'
            />
            <input type="text"
                value={Salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder='Enter Job Salary'
            />
            <button>Post Job</button>
        </form>
    )
}

export default PostJob