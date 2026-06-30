import React, { useEffect } from 'react'
import { getAllJobsApp } from '../services/apply.api'
import { useState, useCallback } from 'react'

const GetApp = () => {
    const [applicants, setapplicants] = useState([])
    const [loading, setloading] = useState(false)

    const handlefetchApplicants = useCallback(async () => {
        setloading(true)
        try {
            const response = await getAllJobsApp()
            setapplicants(response.data || [])
        } catch (error) {
            console.log("Error while fetching jobs: ", error)
        }
        finally {
            setloading(false)
        }
    }, [])

    useEffect(() => {
        handlefetchApplicants()
    }, [handlefetchApplicants])

    return (
        <div>
            {applicants.map((app) => (
                <div key={app._id} className='border p-4 rounded-lg'>
                    <h2>{app.name}</h2>
                    <p>{app.email}</p>
                </div>
            ))}
        </div>
    )
}

export default GetApp