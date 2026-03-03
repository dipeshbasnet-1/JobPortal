const express = require('express')
const router = require("express").Router();

// controllers
const { createJob, 
    getAllJobs, 
    getJobById,  
    deleteJobById, 
    updateJobById,
    getMyJobs
} = require('../controller/jobController');


const { checkOtp } = require('../controller/userController');

// Import middleware from usermiddleware.js
const { isAuthenticated, checkUserRole } = require('../middlewares/usermiddleware');
const catchAsyncError  = require('../services/catchAsyncError');


// Routes for jobs
router.route("/")
    .post(isAuthenticated, checkUserRole('jobProvider'), catchAsyncError (createJob)) // Only job providers
    .get(catchAsyncError (getAllJobs));  // Anyone can view all jobs
    
    router.get("/my-jobs",
    isAuthenticated,
    checkUserRole("jobProvider"),
    catchAsyncError(getMyJobs)
);
router.route("/:id")
    .get(catchAsyncError (getJobById))  // Anyone can view a single job
    .delete(isAuthenticated, checkUserRole('jobProvider'), catchAsyncError (deleteJobById)) // Only job providers
    .patch(isAuthenticated, checkUserRole('jobProvider'), catchAsyncError (updateJobById)); // Only job providers

// otp check route
router.route("/check-otp").post(catchAsyncError (checkOtp))

module.exports = router;