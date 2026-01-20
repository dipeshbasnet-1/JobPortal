const express = require("express");
const router = require('express').Router();

// Controllers
const { registerUser, 
    loginUser, 
    forgotPassword, 
    checkOtp, 
    resetPassword 
} = require("../controller/userController");

// Async Error Wrapper
const errorHandler = require("../services/catchAsyncError");

// Register user
router.route("/register").post(errorHandler(registerUser));

// Login user
router.route("/login").post(errorHandler(loginUser));

// Forgot Password
router.route("/forgot-password").post(errorHandler(forgotPassword));

// Check OTP
router.route("/check-otp").post(errorHandler(checkOtp));

// Reset Password
router.route("/change-password").post(errorHandler(resetPassword));

module.exports = router;