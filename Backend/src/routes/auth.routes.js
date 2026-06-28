const express = require('express')
const authRouter = express.Router()
const { registerUser, loginUser, getMe, logoutUser } = require('../controllers/auth.controller')
const { identifyUser } = require('../middleware/auth.middleware')

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

authRouter.post('/logout', logoutUser)

authRouter.get('/getMe', identifyUser, getMe)

module.exports = authRouter
