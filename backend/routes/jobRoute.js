const express = require('express')
const router = require("express").Router();

// controllers
const { createJob, 
    getAllJobs, 
    getJobById, 
    deleteJobById, 
    updateJobById 
} = require('../controller/jobController');


const { checkOtp } = require('../controller/userController');

// Import middleware from usermiddleware.js
const { isAuthenticated, checkUserRole } = require('../middlewares/usermiddleware');
const errorHandler = require('../services/catchAsyncError');


// Routes for jobs
router.route("/")
    .post(isAuthenticated, checkUserRole('jobProvider'), errorHandler(createJob)) // Only job providers
    .get(errorHandler(getAllJobs));  // Anyone can view all jobs

router.route("/:id")
    .get(errorHandler(getJobById))  // Anyone can view a single job
    .delete(isAuthenticated, checkUserRole('jobProvider'), errorHandler(deleteJobById)) // Only job providers
    .patch(isAuthenticated, checkUserRole('jobProvider'), errorHandler(updateJobById)); // Only job providers

// otp check route
router.route("/check-otp").post(errorHandler(checkOtp))

module.exports = router;