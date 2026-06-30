const express = require('express')
const jobRouter = express.Router()
const { postJob, getJob, deleteJobs } = require('../controllers/job.controller')
const { identifyUser, authorizeRole } = require('../middleware/auth.middleware')


jobRouter.post('/postjob', identifyUser, authorizeRole('Recruiter', 'Admin'), postJob)

jobRouter.get('/getjobs', identifyUser, authorizeRole('Recruiter', 'Admin', 'Applicant'), getJob)

jobRouter.get('/getjobs/:id', identifyUser, authorizeRole('Recruiter', 'Admin', 'Applicant'), getJob)

jobRouter.delete('/deletejob/:id', identifyUser, authorizeRole('Recruiter', 'Admin'), deleteJobs)

module.exports = jobRouter