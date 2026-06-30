import React, { useCallback, useState, useEffect } from 'react'
import { getAllJobsApp } from '../services/apply.api'
import { useParams } from 'react-router'

const ViewApplicants = () => {
    const { id } = useParams()
    const [applicants, setapplicants] = useState([])
    const [pageLoading, setPageLoading] = useState(true)

    const getApp = useCallback(async (jobId) => {
        if (!jobId) return;

        setPageLoading(true)
        try {
            const data = await getAllJobsApp(jobId)
            console.log("Actual Backend Data directly:", data);
            const applicationsData = data?.applicants || [];

            setapplicants(applicationsData);
        } catch (error) {
            console.log("Error while fetching Applicants: ", error)
        } finally {
            setPageLoading(false)
        }
    }, [])

    useEffect(() => {
        if (id) {
            getApp(id)
        }
    }, [id, getApp]);

    if (pageLoading) {
        return <div className="text-center mt-10 text-xl font-semibold">Loading Applicants...</div>
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Applicants for this Job ({applicants.length})</h2>
            {applicants.length === 0 ? (
                <p className="text-gray-500">No one has applied for this job yet.</p>
            ) : (
                <div className="grid gap-4">
                    {applicants.map((app) => (
                        <div key={app._id} className="border p-4 rounded-xl bg-white shadow-sm border-blue-500">
                            <h3 className="font-bold text-lg">{app.applicant?.[0]?.username || 'Anonymous'}</h3>
                            <p className="text-gray-600 text-sm">{app.applicant?.[0]?.email || 'No Email Available'}</p>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-2 inline-block font-semibold">
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewApplicants