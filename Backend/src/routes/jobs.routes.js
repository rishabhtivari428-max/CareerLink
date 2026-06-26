const express = require('express')
const jobRouter = express.Router()
const { postJob, getJobs, deleteJobs } = require('../controllers/job.controller')
const { identifyUser, authorizeRole } = require('../middleware/auth.middleware')


jobRouter.post('/postjob', identifyUser, authorizeRole('Recruiter', 'Admin'), postJob)

jobRouter.get('/getjob', identifyUser, authorizeRole('Recruiter', 'Admin'), getJobs)

jobRouter.delete('/deletejob/:id', identifyUser, authorizeRole('Recruiter', 'Admin'), deleteJobs)

module.exports = jobRouter