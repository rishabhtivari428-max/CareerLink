const ApplicationModel = require('../models/Application.model')

async function apply(req, res) {
    try {
        const job = req.params.id
        const applicant = req.user._id

        if (!job || !applicant) {
            return res.status(400).json({
                message: "Job not available"
            })
        }

        const alreadyApplied = await ApplicationModel.findOne({ job, applicant }).populate('job')
        if (alreadyApplied) {
            return res.status(409).json({
                message: "Already applied for this job"
            })
        }

        const application = await ApplicationModel.create({
            job,
            applicant,
            status: "Pending"
        })

        return res.status(201).json({
            message: "Applied successfully",
            application
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getMyApplications(req, res) {
    try {
        const applicant = req.user._id

        const applications = await ApplicationModel.find({ applicant }).populate('job')

        if (!applications.length) {
            return res.status(404).json({
                message: "No applications found"
            })
        }

        return res.status(200).json({
            message: "Applications fetched successfully",
            applications
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getApplicants(req, res) {
    try {
        const job = req.params.id

        const applicants = await ApplicationModel.find({ job }).populate('applicant', '-password')

        if (!applicants.length) {
            return res.status(404).json({
                message: "No applicants found"
            })
        }

        return res.status(200).json({
            message: "Applicants fetched successfully",
            applicants
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function updateStatus(req, res) {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        if (status.toLowerCase() === "rejected") {
            const deleted = await ApplicationModel.findByIdAndDelete(applicationId);

            if (!deleted) {
                return res.status(404).json({
                    message: "Application not found"
                });
            }

            return res.status(200).json({
                message: "Application rejected and removed successfully",
                isDeleted: true
            });
        }

        const updated = await ApplicationModel.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        return res.status(200).json({
            message: "Status updated successfully",
            updated
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = {
    apply,
    getMyApplications,
    getApplicants,
    updateStatus
}