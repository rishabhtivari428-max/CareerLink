const express = require('express')
const authRouter = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/auth.controller')
const { identifyUser } = require('../middleware/auth.middleware')

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

authRouter.get('/getMe', identifyUser, getMe)

module.exports = authRouter
