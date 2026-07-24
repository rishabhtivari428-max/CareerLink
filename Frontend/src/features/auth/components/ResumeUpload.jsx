import React, { useState } from 'react';
import { uploadResume } from '../services/apply.api';

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
        <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-md font-semibold mb-2 text-gray-800">Upload Resume</h3>
            <form onSubmit={handleUpload} className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Select PDF or DOC/DOCX (Max 5MB)
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-xs font-medium">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={!file || loading}
                    className={`w-full py-2 px-3 rounded-md text-white font-medium text-xs transition ${!file || loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Uploading...' : 'Upload Resume'}
                </button>
            </form>
            {uploadedUrl && (
                <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                    <p className="text-xs text-green-800 font-medium">Resume Uploaded Successfully!</p>
                    <a
                        href={uploadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 underline break-all hover:text-blue-800"
                    >
                        View Uploaded Resume
                    </a>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;