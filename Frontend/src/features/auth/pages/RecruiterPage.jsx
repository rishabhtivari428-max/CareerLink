import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getJob, postJob } from '../services/jobs.api'
import { useNavigate } from 'react-router'
import { 
    PlusCircle, 
    Briefcase, 
    Building2, 
    MapPin, 
    Banknote, 
    FileText, 
    Users, 
    ArrowRight,
    CheckCircle2
} from 'lucide-react'

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
            const jobsData = response.data?.jobs || response.data;
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-slate-200/80">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        Recruiter Portal
                    </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Hiring & Candidate Management
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Publish new job opportunities and evaluate incoming applicant submissions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form: Post Job */}
                <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <PlusCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Post a Job Opening</h2>
                            <p className="text-xs text-slate-500">Reach qualified candidates across all industries</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Job Title
                            </label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => settitle(e.target.value)} 
                                placeholder="e.g. Senior Frontend Engineer" 
                                required
                                className="w-full px-3.5 py-2 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800" 
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Company Name
                                </label>
                                <input 
                                    type="text" 
                                    value={company} 
                                    onChange={(e) => setcompany(e.target.value)} 
                                    placeholder="e.g. Acme Labs" 
                                    required
                                    className="w-full px-3.5 py-2 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Location / Type
                                </label>
                                <input 
                                    type="text" 
                                    value={location} 
                                    onChange={(e) => setlocation(e.target.value)} 
                                    placeholder="e.g. Remote, NY, Full-Time" 
                                    required
                                    className="w-full px-3.5 py-2 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Offered Compensation / Salary
                            </label>
                            <input 
                                type="text" 
                                value={Salary} 
                                onChange={(e) => setSalary(e.target.value)} 
                                placeholder="e.g. $110,000 - $130,000 / yr" 
                                className="w-full px-3.5 py-2 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800" 
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Role Requirements
                            </label>
                            <input 
                                type="text" 
                                value={requirements} 
                                onChange={(e) => setrequirements(e.target.value)} 
                                placeholder="e.g. 3+ yrs React, TypeScript, Tailwind" 
                                className="w-full px-3.5 py-2 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800" 
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Job Description
                            </label>
                            <textarea 
                                rows={3}
                                value={description} 
                                onChange={(e) => setdescription(e.target.value)} 
                                placeholder="Brief overview of responsibilities and team culture..." 
                                className="w-full px-3.5 py-2 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800 resize-none" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all text-sm cursor-pointer active:scale-[0.99]"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Publish Job Vacancy</span>
                        </button>
                    </form>
                </div>

                {/* Right: List of Posted Jobs */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-slate-900">
                            Your Posted Openings
                        </h2>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            {jobs.length} Active {jobs.length === 1 ? 'Job' : 'Jobs'}
                        </span>
                    </div>

                    {jobs.length === 0 ? (
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center shadow-xs">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                                <Briefcase className="w-6 h-6 stroke-[1.8]" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 mb-1">No Jobs Posted Yet</h3>
                            <p className="text-xs text-slate-500 max-w-xs mx-auto">
                                Create your first job posting using the form on the left to start receiving candidate applications.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3.5">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    onClick={() => navigate(`/applicants/${job._id}`)}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                <span className="flex items-center gap-1 text-slate-700">
                                                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                                    {job.company}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-slate-400" />
                                                    {job.location}
                                                </span>
                                            </div>
                                        </div>

                                        <button className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>Applicants</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {job.description && (
                                        <p className="text-xs text-slate-600 line-clamp-2 mt-3 leading-relaxed">
                                            {job.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                                        {job.Salary && (
                                            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                                                <Banknote className="w-3 h-3 text-emerald-600" />
                                                <span>{job.Salary}</span>
                                            </span>
                                        )}
                                        {job.requirements && (
                                            <span className="text-slate-500 text-[11px] truncate max-w-xs">
                                                Req: {job.requirements}
                                            </span>
                                        )}
                                    </div>
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