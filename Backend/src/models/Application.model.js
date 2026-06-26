const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
        required: true 
    },
    applicant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true 
    }],
    status: {
        type: String,
        enum: ['Pending', 'Applied', 'Rejected'],
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs"
    }
}, {timestamps: true})

const ApplicationModel = mongoose.model('applications', ApplicationSchema)

module.exports = ApplicationModel