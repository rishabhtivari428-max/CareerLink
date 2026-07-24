const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadResume } = require('../controllers/resumeController');
const { identifyUser } = require('../middleware/auth.middleware');

router.post('/upload', identifyUser, upload.single('resume'), uploadResume);

module.exports = router;