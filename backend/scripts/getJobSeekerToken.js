require('dotenv').config();
const axios = require('axios');



const loginJobSeeker = async () => {
    try {
    const res = await axios.post("http://localhost:4000/api/auth/login", {
      userEmail: process.env.jobSeeker_EMAIL,      // Set in .env
      userPassword: process.env.jobSeeker_PASSWORD // Set in .env
    });
    
    console.log("JWT token:", res.data.token);
    } catch (error) {
    if (error.response) {
        console.error("Error response from server:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
};

loginJobSeeker();
