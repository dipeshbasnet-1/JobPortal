const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const bcrypt = require('bcryptjs');

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
    userRole
})
    res.status(201).json({ message: "User registered successfully", user })
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
        { userId: user.id, userRole: user.userRole }, // payload
        process.env.JWT_SECRET,                       // secret from .env
        { expiresIn: "30d" }                          // token valid for 30d
    );

    // send token in response 
    res.status(200).json({
        message: "Login successful",
        user,     // user info
        token     
    });
} 

// if forgot the password 
const forgotPassword = async (req, res) => {
    try {
        const { userEmail } = req.body;
        res.status(200).json({ message: `otp sent to ${userEmail}`})
    } catch (error) {
        res.status(500).json ({message: "server error", error})
    }
}

// check OTP
const checkOtp = async (req, res) => {
    const {userEmail, otp} = req.body
    res.status(200).json({ message: `OTP verified for ${userEmail}`})
}

// reset password
const resetPassword = async (req, res) => {
    const { userEmail, newPassword } = req.body;
    res.status(200).json({ message: `Password reset for ${userEmail}` })
    }


module.exports={
    registerUser, 
    loginUser, 
    forgotPassword, 
    checkOtp, 
    resetPassword}   