import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { postJob } from '../services/jobs.api'
import { Briefcase, PlusCircle, ArrowRight } from 'lucide-react'

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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white mb-3">
                        <PlusCircle className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Post a New Position</h1>
                    <p className="text-slate-500 text-sm mt-1">Publish an opening to find the right candidate</p>
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
                            placeholder="e.g. Full Stack Developer"
                            required
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
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
                                placeholder="e.g. Acme Corp"
                                required
                                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Location / Work Mode
                            </label>
                            <input 
                                type="text"
                                value={location}
                                onChange={(e) => setlocation(e.target.value)}
                                placeholder="e.g. Remote / San Francisco"
                                required
                                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Compensation / Salary
                        </label>
                        <input 
                            type="text"
                            value={Salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="e.g. $90k - $120k / yr"
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Key Requirements
                        </label>
                        <input 
                            type="text"
                            value={requirements}
                            onChange={(e) => setrequirements(e.target.value)}
                            placeholder="e.g. React, Node.js, PostgreSQL, 2+ yrs experience"
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Role Description
                        </label>
                        <textarea 
                            rows={4}
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            placeholder="Describe responsibilities, daily work, and expectations..."
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-800 resize-none"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all text-sm cursor-pointer active:scale-[0.99]"
                    >
                        <span>Publish Opening</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostJob