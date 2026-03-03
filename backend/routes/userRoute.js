const express = require("express");
const router = require('express').Router();

// Controllers
const { registerUser, 
    loginUser, 
    forgotPassword, 
    verifyOtp, 
    resetPassword,
    listUsers
} = require("../controller/userController");

// Async Error Wrapper
const catchAsyncError = require("../services/catchAsyncError");

// Register user
router.route("/register").post(catchAsyncError(registerUser));

// Login user
router.route("/login").post(catchAsyncError(loginUser));

// Forgot Password
router.route("/forgot-password").post(catchAsyncError(forgotPassword));

// Verify OTP
router.route("/verify-otp").post(catchAsyncError(verifyOtp))

// Reset Password
router.route("/change-password").post(catchAsyncError(resetPassword));

// list users
router.route("/list-users").get(catchAsyncError(listUsers));

module.exports = router;