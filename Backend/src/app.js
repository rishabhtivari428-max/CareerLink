const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')

const authRouter = require('./routes/auth.routes')
const jobRouter = require('./routes/jobs.routes')
const ApplicationRouter = require('./routes/application.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', authRouter)
app.use('/api/jobs', jobRouter)
app.use('/api/apply', ApplicationRouter)

module.exports = app