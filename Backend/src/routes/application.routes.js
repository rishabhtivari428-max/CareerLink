const express = require('express')
const ApplicationRouter = express.Router()
const {  apply, getMyApplications, getApplicants, updateStatus } = require('../controllers/application.controller')
const  { identifyUser, authorizeRole }  = require('../middleware/auth.middleware')

ApplicationRouter.post('/apply/:id', identifyUser, authorizeRole('Applicant'), apply)

ApplicationRouter.get('/getAllApp/:id', identifyUser, authorizeRole('Applicant'), getMyApplications)

ApplicationRouter.get('/getAllJobsApp/:id', identifyUser, authorizeRole('Applicant', 'Recruiter'), getApplicants)

ApplicationRouter.patch('/update/:id', identifyUser, authorizeRole('Recruiter'), updateStatus)

module.exports = ApplicationRouter