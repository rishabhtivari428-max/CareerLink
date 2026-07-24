const cloudinary = require('../config/cloudinary');
const User = require('../models/User.model')

exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a file" });
        }

        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'resumes',
                        resource_type: 'raw',
                        public_id: `resume_${req.user._id}_${Date.now()}`
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(req.file.buffer);
            });
        };

        const result = await streamUpload(req);

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { resume: result.secure_url },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Resume uploaded successfully!',
            resumeUrl: result.secure_url,
            user: updatedUser
        });

    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ success: false, message: 'Server upload failed', error: error.message });
    }
};