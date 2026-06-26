const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ['Recruiter', 'Applicant', 'Admin'],
        required: true 
    },
    resume: {
        type: String,
        default: null
    }
}, {timestamps: true})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel