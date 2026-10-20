import React, { useCallback, useState, useEffect } from 'react'
import { getAllJobsApp, update } from '../services/apply.api'
import { useParams, Link } from 'react-router'
import { 
    Users, 
    ArrowLeft, 
    Mail, 
    FileText, 
    Check, 
    X, 
    ExternalLink, 
    Clock, 
    CheckCircle2, 
    XCircle,
    Loader2
} from 'lucide-react'

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

    const handleAction = async (applicationId, actionStatus) => {
        try {
            const data = await update(applicationId, actionStatus);

            if (data.isDeleted) {
                setapplicants(prev => prev.filter(item => item._id !== applicationId));
            } else {
                setapplicants(prev => prev.map(item =>
                    item._id === applicationId ? { ...item, status: actionStatus } : item
                ));
            }
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getApp(id)
        }
    }, [id, getApp]);

    if (pageLoading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm font-medium text-slate-500">Retrieving candidate submissions...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-slate-200/80">
                <Link
                    to="/recruiter"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Recruiter Dashboard</span>
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Job Applicants
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Review submissions, inspect uploaded resumes, and update hiring statuses.
                        </p>
                    </div>
                    <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                        <Users className="w-3.5 h-3.5" />
                        <span>{applicants.length} {applicants.length === 1 ? 'Candidate' : 'Candidates'}</span>
                    </span>
                </div>
            </div>

            {applicants.length === 0 ? (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No Applicants Yet</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                        No candidates have applied for this position yet. Check back soon!
                    </p>
                    <Link
                        to="/recruiter"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
                    >
                        <span>Return to Dashboard</span>
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {applicants.map((app) => {
                        const applicantUser = app.applicant?.[0]
                        const isSelected = app.status === 'Selected' || app.status === 'Accepted'
                        const isRejected = app.status === 'Rejected'

                        return (
                            <div
                                key={app._id}
                                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                                            {applicantUser?.username ? applicantUser.username.charAt(0).toUpperCase() : 'A'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-slate-900">
                                                {applicantUser?.username || 'Anonymous Candidate'}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{applicantUser?.email || 'No email provided'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 pt-1">
                                        {applicantUser?.resume ? (
                                            <a
                                                href={applicantUser.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                <span>View Resume</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">
                                                No resume uploaded
                                            </span>
                                        )}

                                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                            isSelected
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : isRejected
                                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                                        }`}>
                                            {isSelected && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                            {isRejected && <XCircle className="w-3 h-3 text-rose-600" />}
                                            {!isSelected && !isRejected && <Clock className="w-3 h-3 text-amber-600" />}
                                            <span>{app.status || 'Pending'}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Decision Actions */}
                                <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                                    <button
                                        onClick={() => handleAction(app._id, "Selected")}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                            isSelected 
                                                ? 'bg-emerald-600 text-white shadow-xs' 
                                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                        }`}
                                    >
                                        <Check className="w-3.5 h-3.5" />
                                        <span>Accept</span>
                                    </button>
                                    <button
                                        onClick={() => handleAction(app._id, "Rejected")}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                            isRejected 
                                                ? 'bg-rose-600 text-white shadow-xs' 
                                                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                                        }`}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        <span>Reject</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ViewApplicants