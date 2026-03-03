const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const bcrypt = require('bcryptjs');
const sendEmail = require("../services/sendEmail");

// Register a new user
const registerUser=async(req,res) => {
    const {username,userEmail,userPassword, userRole} = req.body;  // taking data from req body
    console.log(req.body)

// check if user already exists
const existingUser = await User.findOne({where:{ userEmail }})
if(existingUser){
    return res.status(400).json({
        message:"User already exists with this email"
    })
}

// hash the password
const hashedPassword = await bcrypt.hash(userPassword,10);

// create a user
    const user = await User.create({
    username,
    userEmail,
    userPassword:hashedPassword, 
    userRole: userRole || "jobSeeker"
})
    res.status(201).json({ message: "User registered successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.userEmail,
            role: user.userRole
        }
    })
} 

// login a user
const loginUser=async(req,res)=>{
    console.log("Login request body:", req.body);
    
    const {userEmail,userPassword}= req.body
    
    if(!userEmail ||!userPassword){
        return res.status(400).json({message:"Please provide email and password"})
    }

const user = await User.findOne({where:{userEmail}})
    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
    
    
// compare password
const isPasswordValid = await bcrypt.compare(userPassword,user.userPassword)
    if(!isPasswordValid){  
        return res.status(400).json({message:"Invalid email or password"})
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, username: user.username, userRole: user.userRole }, // payload
        process.env.JWT_SECRET,                       // secret from .env
        { expiresIn: "30d" }                          // token valid for 30d
    );

    // send token in response 
    res.status(200).json({
        message: "Login successful",
    user: {
        id: user.id,
        username: user.username,
        userEmail: user.userEmail,
        userRole: user.userRole
    },
    token    
    });
} 

// if forgot the password 
const forgotPassword = async (req, res) => {
    const { userEmail } = req.body;
    if (!userEmail) return res.status(400).json({ message: "Email is required" });
    
    try {
        const user = await User.findOne({ where: { userEmail } });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        // Generate 6-digit OTP and save to user
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.isOtpVerified = false;
        await user.save();
        
        //  Send OTP email
        await sendEmail({
            email: userEmail,
            subject: "Password Reset OTP",
            message: `Your OTP for password reset is: ${otp}`,
        });
        
        res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send OTP", error: err.message });
    }
};

// check OTP
const verifyOtp = async (req, res) => {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) return res.status(400).json({ message: "Email and OTP are required" });
    
    const user = await User.findOne({ where: { userEmail } });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    
    user.isOtpVerified = true;
    user.otp = null; // Clear OTP so it can't be reused
    await user.save();
    
    res.status(200).json({ message: "OTP verified successfully" });
};

// reset password
const resetPassword = async (req, res) => {
    const { userEmail, newPassword, confirmPassword } = req.body;
    
    if (!userEmail || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    
    const user = await User.findOne({ where: { userEmail } });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (!user.isOtpVerified) return res.status(403).json({ message: "OTP not verified" });
    
    // Hash new password and save
    user.userPassword = await bcrypt.hash(newPassword, 10);
    user.isOtpVerified = false; // reset verification
    await user.save();
    
    res.status(200).json({ message: "Password reset successfully" });
};

// list users

const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["userPassword", "otp"] } // hide sensitive data
        });
        
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};



module.exports={
    registerUser, 
    loginUser, 
    forgotPassword, 
    verifyOtp, 
    resetPassword,
    listUsers
}   