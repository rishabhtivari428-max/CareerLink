const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        enum: ['Remote', 'onSite', 'hybrid'],
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    Salary: {
        type: String,
        required: true
    },
    applicant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
}, { timestamps: true })

const JobModel = mongoose.model('jobs', JobSchema)

module.exports = JobModel