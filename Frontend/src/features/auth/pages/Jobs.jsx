import React, { useState, useEffect, useCallback } from 'react'
import { postJob, getJob, deleteJob } from '../services/jobs.api'
import { apply } from '../services/apply.api'
import { useAuth } from '../hooks/useAuth'
import { 
    Briefcase, 
    Building2, 
    MapPin, 
    Banknote, 
    Check, 
    Trash2, 
    RotateCw, 
    Search,
    Send,
    FileCheck
} from 'lucide-react'

const Jobs = () => {
    const { user, loading: authLoading } = useAuth()

    const [jobs, setjobs] = useState([])
    const [loading, setloading] = useState(false)
    const [Salary, setSalary] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const [appliedJobs, setAppliedJobs] = useState(() => {
        const saved = localStorage.getItem('appliedJobs')
        return saved ? JSON.parse(saved) : []
    })

    const fetchJobs = useCallback(async () => {
        setloading(true)
        try {
            const response = await getJob()
            // Support both response.data.jobs array or response.data array
            const jobsData = response?.data?.jobs || response?.data || []
            setjobs(jobsData)
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

    const addJob = async (title, description, location, requirements, company, Salary) => {
        const response = await postJob(title, description, location, requirements, company, Salary)
        if (response.job) {
            setjobs(prev => [...prev, response.job])
        }
    }

    const applyJob = async (id) => {
        try {
            const response = await apply(id)

            // Save tracking array immediately to localStorage
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

    // Filter jobs client-side by title or company
    const filteredJobs = jobs.filter(job => {
        if (!searchTerm) return true
        const term = searchTerm.toLowerCase()
        return (
            job.title?.toLowerCase().includes(term) ||
            job.company?.toLowerCase().includes(term) ||
            job.location?.toLowerCase().includes(term)
        )
    })

    // Early returns
    if (loading || authLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-slate-500">Discovering latest job opportunities...</p>
                </div>
            </div>
        )
    }

    if (jobs.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <Briefcase className="w-8 h-8 stroke-[1.8]" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1.5">No Openings Currently Available</h2>
                    <p className="text-slate-500 text-sm max-w-sm mb-6 leading-relaxed">
                        Hiring managers haven't published new vacancies yet. Please check back soon or refresh the board.
                    </p>
                    <button
                        onClick={fetchJobs}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                        <RotateCw className="w-4 h-4" />
                        <span>Refresh Board</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header with Search and Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                            Explore Careers
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                            {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Available Job Openings
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Filter by title, company..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-700 shadow-2xs"
                    />
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                    const isApplied = appliedJobs.includes(job._id)

                    return (
                        <div
                            key={job._id}
                            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                        >
                            <div>
                                {/* Top Title & Company */}
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium mt-1">
                                            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span>{job.company}</span>
                                        </div>
                                    </div>
                                    <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                        <MapPin className="w-3 h-3 text-slate-500" />
                                        <span>{job.location || 'Remote'}</span>
                                    </span>
                                </div>

                                {/* Salary Badge */}
                                {job.Salary && (
                                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                                        <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>{job.Salary}</span>
                                    </div>
                                )}

                                {/* Job Description */}
                                <div className="mt-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Description
                                    </p>
                                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                        {job.description || "No description provided."}
                                    </p>
                                </div>

                                {/* Requirements */}
                                {job.requirements && (
                                    <div className="mt-3.5 pt-3 border-t border-slate-100">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                            Requirements
                                        </p>
                                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                            {job.requirements}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Card Footer Actions */}
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                {user?.role === 'Applicant' && (
                                    <button
                                        onClick={() => applyJob(job._id)}
                                        disabled={isApplied}
                                        className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                                            isApplied
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow'
                                        }`}
                                    >
                                        {isApplied ? (
                                            <>
                                                <FileCheck className="w-4 h-4 text-emerald-600" />
                                                <span>Application Submitted</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-3.5 h-3.5" />
                                                <span>Quick Apply</span>
                                            </>
                                        )}
                                    </button>
                                )}

                                {user?.role === 'Recruiter' && (
                                    <button
                                        onClick={() => removeJob(job._id)}
                                        className="w-full py-2 px-3 rounded-xl font-semibold text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Delete Opening</span>
                                    </button>
                                )}

                                {!user && (
                                    <span className="text-xs text-slate-400 italic">
                                        Sign in to apply for this opening
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Jobs