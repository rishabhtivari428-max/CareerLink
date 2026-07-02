const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')

const authRouter = require('./routes/auth.routes')
const jobRouter = require('./routes/jobs.routes')
const ApplicationRouter = require('./routes/application.routes')

const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use(cookieparser())

app.get("/", (req, res) => {
    res.status(200).json({ message: "CareerLink Backend is Live and Running! 🚀" });
});

app.use('/api/auth', authRouter)
app.use('/api/jobs', jobRouter)
app.use('/api/apply', ApplicationRouter)

module.exports = app