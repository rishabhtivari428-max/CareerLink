import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllApp } from '../services/apply.api'
import ResumeUpload from '../components/ResumeUpload'
import { 
    Briefcase, 
    Building2, 
    MapPin, 
    Banknote, 
    Clock, 
    CheckCircle, 
    XCircle, 
    ArrowRight,
    Loader2
} from 'lucide-react'

const MyApplications = () => {
    const [apps, setapps] = useState([])
    const [loading, setloading] = useState(false)

    const handleFetchJobs = async (userId) => {
        setloading(true)
        try {
            const response = await getAllApp()
            setapps(response.applications || [])
        } catch (error) {
            console.log("Error while fetching jobs: ", error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        handleFetchJobs()
    }, [])

    const getStatusBadge = (status) => {
        const s = status || 'Pending'
        if (s === 'Accepted' || s === 'Selected') {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{s}</span>
                </span>
            )
        }
        if (s === 'Rejected') {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    <span>Rejected</span>
                </span>
            )
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Pending Review</span>
            </span>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                            Candidate Portal
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        My Job Applications
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/jobs"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-2xs transition-all"
                    >
                        <span>Find More Jobs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Main column: Applications list */}
                <div className="lg:col-span-2 space-y-4">
                    {loading && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 flex flex-col items-center justify-center">
                            <Loader2 className="w-7 h-7 text-blue-600 animate-spin mb-2" />
                            <p className="text-sm font-medium text-slate-500">Loading your applications...</p>
                        </div>
                    )}

                    {!loading && apps.length === 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-7 h-7 stroke-[1.8]" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">No Applications Submitted Yet</h3>
                            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                                Explore hundreds of open positions and apply with a single click.
                            </p>
                            <Link
                                to="/jobs"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
                            >
                                <span>Browse Active Jobs</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}

                    {!loading && apps.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {apps.map((app) => (
                                <div
                                    key={app._id}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="font-bold text-base text-slate-900 leading-snug">
                                                {app.job?.title || "Position Title"}
                                            </h3>
                                            {getStatusBadge(app.status)}
                                        </div>

                                        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium mb-3">
                                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span>{app.job?.company || "Company"}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                                            {app.job?.location && (
                                                <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-600">
                                                    <MapPin className="w-3 h-3 text-slate-400" />
                                                    <span>{app.job.location}</span>
                                                </span>
                                            )}
                                            {app.job?.Salary && (
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-emerald-700">
                                                    <Banknote className="w-3 h-3 text-emerald-600" />
                                                    <span>{app.job.Salary}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                                        Application ID: {app._id?.slice(-8) || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right column: Resume Manager */}
                <div className="space-y-4">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                        <h2 className="text-base font-bold text-slate-900 mb-1">Candidate Profile</h2>
                        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                            Keep your resume up-to-date so recruiters can review your qualifications immediately.
                        </p>
                        <ResumeUpload />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyApplications