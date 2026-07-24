const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')

const authRouter = require('./routes/auth.routes')
const jobRouter = require('./routes/jobs.routes')
const ApplicationRouter = require('./routes/application.routes')
const resumeRouter = require('./routes/resumeRoutes')

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://career-link-alpha.vercel.app",
        "https://career-link-ey8l-blush.vercel.app"
    ],
    credentials: true
}));

app.use(express.json())
app.use(cookieparser())

app.get("/", (req, res) => {
    res.status(200).json({ message: "CareerLink Backend is Live and Running! 🚀" });
});

app.use('/api/auth', authRouter)
app.use('/api/jobs', jobRouter)
app.use('/api/apply', ApplicationRouter)
app.use('/api/resume', resumeRouter)

module.exports = app