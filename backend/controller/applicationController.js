const { Application } = require("../model"); 
const catchAsyncError = require("../services/catchAsyncError"); 

// Apply for a job (Only job seekers can apply)
const jobApply = catchAsyncError(async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;
    
    // Only job seekers can apply
    if (req.user.userRole === "jobProvider") {
        return res.status(400).json({
            message: "Only job seekers can apply for jobs"
        });
    }
    
    const application = await Application.create({
        jobId,
        userId
    });
    
    res.status(200).json({
        message: "Job applied successfully",
        application
    });
});

// Get all applications (Admin / job providers can see all)
const getApplications = catchAsyncError(async (req, res) => {
    const applications = await Application.findAll();
    if (!applications || applications.length === 0) {
        return res.status(404).json({
            message: "No applications found"
        });
    }
    
    res.status(200).json({
        message: "Applications fetched successfully",
        applications
    });
});

// Update application status (Only admin / job provider can update)
const updateApplicationStatus = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await Application.findByPk(id);
    if (!application) {
        return res.status(404).json({ message: "Application not found" });
    }
    
    await application.update({ status });
    
    res.status(200).json({
        message: "Application status updated successfully",
        application
    });
});

// Delete an application
const deleteApplication = catchAsyncError(async (req, res) => {
    const { applicationId } = req.params;
    
    const application = await Application.findByPk(applicationId);
    if (!application) {
        return res.status(404).json({ message: "Application not found" });
    }
    
    await application.destroy();
    
    res.status(200).json({
        message: "Application deleted successfully"
    });
});

// Get all applications of logged-in user - job seeker
const myApplications = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    
    const applications = await Application.findAll({
        where: { userId }
    });
    
    res.status(200).json({
        message: "My applications fetched successfully",
        applications
    });
});

module.exports = {
    jobApply,
    getApplications,
    updateApplicationStatus,
    deleteApplication,
    myApplications
};
