const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const cloudinary = require('../config/cloudinary');
const User = require('../models/userModel');

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Koi file select nahi ki!" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'resumes',
            resource_type: 'raw'
        });

        const userId = req.body.userId;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { resumeUrl: result.secure_url },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Resume upload ho gaya bhai!",
            resumeUrl: result.secure_url,
            user: updatedUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server mein kuch gadbad hui!" });
    }
});

module.exports = router;