const JobModel = require('../models/Job.model')

async function postJob(req, res) {
    try {
        const { title, description, location, requirements, company, Salary } = req.body

        if (!title || !description || !location || !requirements || !company) {
            return res.status(400).json({
                message: "All fields are required to post a Job"
            })
        }

        const job = await JobModel.create({
            title,
            description,
            location,
            requirements,
            company,
            Salary,
            postedBy: req.user._id 
        })

        return res.status(201).json({
            message: "Job posted successfully",
            data: job 
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getJob(req, res) {
    try {
        const jobId = req.params.id;

        if (jobId) {
            const job = await JobModel.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: "Job not found" });
            }
            return res.status(200).json({
                message: "Single job fetched successfully",
                data: job
            });
        }

        const allJobs = await JobModel.find({}); 
        return res.status(200).json({
            message: "All jobs fetched successfully",
            data: allJobs
        });

    } catch (error) {
        console.error("Error in getJob:", error);
        return res.status(500).json({ message: "Server error while fetching jobs" });
    }
}

async function deleteJobs(req, res) {
    try {
        const jobId = req.params.id

        const job = await JobModel.findByIdAndDelete(jobId)

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        return res.status(200).json({
            message: "Job deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    postJob,
    getJob,
    deleteJobs
}