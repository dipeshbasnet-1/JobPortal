
const { Job, User } = require("../model");
const catchAsyncError = require("../services/catchAsyncError");

// Create a new job
const createJob = catchAsyncError(async (req, res) => {
    console.log("Create Job Request Body:", req.body);
    console.log("Logged in User from JWT:", req.user);
    
    const { jobTitle,
            jobDescription, 
            jobLocation, 
            jobSalary, 
            jobCompany } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!jobTitle || !jobDescription || !jobLocation || !jobSalary || !jobCompany) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const job = await Job.create({
        Title: jobTitle,
        Description: jobDescription,
        Location: jobLocation,
        Salary: jobSalary,
        Company: jobCompany,
        userId
    });
    
    res.status(201).json({
        message: "Job created successfully",
        data: job
    });
});

// Get all jobs with associated user info
const getAllJobs = catchAsyncError(async (req, res) => {
    const jobs = await Job.findAll({
        include: {
            model: User,
            attributes: ["id", "username", "userEmail", "userRole"]
        }
    });
    
    if (jobs.length === 0) {
        return res.status(404).json({ message: "No jobs available" });
    }
    
    res.status(200).json({ data: jobs });
});

// Get a single job by ID
const getJobById = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Job id is required" });
    
    const job = await Job.findByPk(id, {
        include: {
            model: User,
            attributes: ["id", "username", "userEmail", "userRole"]
        }
    });
    
    if (!job) return res.status(404).json({ message: "Job not found" });
    
    res.status(200).json({
        message: "Job fetched successfully",
        data: job
    });
});

// Update a job by ID
const updateJobById = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const { jobTitle, jobDescription, jobLocation, jobSalary, jobCompany } = req.body;
    
    if (!jobTitle || !jobDescription || !jobLocation || !jobSalary || !jobCompany) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const job = await Job.findOne({ where: { id } });
    if (!job) return res.status(404).json({ message: "Job not found" })
        
        await job.update({
        Title: jobTitle,
        Description: jobDescription,
        Location: jobLocation,
        Salary: jobSalary,
        Company: jobCompany
    });

    res.status(200).json({
        message: "Job updated successfully",
        data: job
    });
});

// Delete a job by ID
const deleteJobById = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    
    const job = await Job.findOne({ where: { id } });
    if (!job) return res.status(404).json({ message: "Job not found" });
    
    await job.destroy();
    
    res.status(200).json({ message: "Job deleted successfully" });
});

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJobById,
    deleteJobById
};
