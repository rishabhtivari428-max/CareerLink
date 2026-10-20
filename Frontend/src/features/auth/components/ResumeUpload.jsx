import React, { useState } from 'react';
import { uploadResume } from '../services/apply.api';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';

const ResumeUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                setFile(null);
                return;
            }
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (!allowedTypes.includes(selectedFile.type)) {
                setError('Only PDF or DOC/DOCX files are allowed');
                setFile(null);
                return;
            }
            setError('');
            setFile(selectedFile);
        }
    };

    const handleUpload = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!file) {
            setError('Please select a file first');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const responseData = await uploadResume(file);

            if (responseData && responseData.success) {
                const resumeUrl = responseData.resumeUrl;
                setUploadedUrl(resumeUrl);
                setFile(null);
                if (onUploadSuccess) {
                    onUploadSuccess(resumeUrl);
                }
            }
        } catch (err) {
            console.error('Upload Error:', err);
            setError(
                err.response?.data?.message || 'Failed to upload resume. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleUpload} className="space-y-3">
                <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20 group block">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 text-blue-600 flex items-center justify-center mb-2 transition-colors">
                        <UploadCloud className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                        {file ? file.name : "Click to select your resume"}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                        PDF or DOC/DOCX (Max 5MB)
                    </span>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {error && (
                    <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!file || loading}
                    className={`w-full py-2.5 px-4 rounded-xl text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                        !file || loading
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-xs active:scale-[0.99] cursor-pointer'
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading Document...</span>
                        </>
                    ) : (
                        <span>Upload Resume</span>
                    )}
                </button>
            </form>

            {uploadedUrl && (
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Resume Uploaded Successfully!</span>
                    </div>
                    <a
                        href={uploadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline mt-1"
                    >
                        <span>Preview Uploaded Resume</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;