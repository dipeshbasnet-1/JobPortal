const express = require("express");
const router = express.Router();
const catchAsyncError = require("../services/catchAsyncError");

// Import application controller functions
const {jobApply,
    updateApplicationStatus,
    deleteApplication,
    getApplications,
    myApplications
} = require("../controller/applicationController");

// Import authentication & role check middlewares
const { isAuthenticated, checkUserRole } = require('../middlewares/usermiddleware');

// Apply for a job by only job seekers
router.post("/apply/:jobId",isAuthenticated,checkUserRole("jobSeeker"),catchAsyncError(jobApply)
);

// Update application status by only job providers and admin
router.patch("/update/:id",isAuthenticated,checkUserRole("jobProvider"),catchAsyncError(updateApplicationStatus)
);

// Delete an application by only the applicant and job seeker
router.delete("/delete/:id",isAuthenticated,checkUserRole("jobSeeker"),catchAsyncError(deleteApplication)
);

// Get all applications by only job providers and admin
router.get("/getApplications",isAuthenticated,checkUserRole("jobProvider"),catchAsyncError(getApplications)
);

// Get applications of the logged-in user by only job seeker
router.get("/myApplications",isAuthenticated,checkUserRole("jobSeeker"),catchAsyncError(myApplications)
);

module.exports = router;
