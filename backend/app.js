require('dotenv').config(); // Load .env variables

const express = require('express');
const { connectDB, sequelize } = require('./db/dbconfig'); // Import database connection and Sequelize instance

// Import User model
const User = require("./model/UserModel");
const app = express ();

// Import admin seeding function to create default admin
const seedAdminUser = require("./adminSeed");
console.log("DEBUG IMPORT:", seedAdminUser);
seedAdminUser();

// parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDB()// connects to database

// Sync Sequelize models
sequelize.sync({ alter: true }).then(() => {
    console.log("All models synced with database");
});

// Routes
// User authentication routes (register, login, OTP verification)
const userRoute = require("./routes/userRoute");
app.use("/api/auth", userRoute);

// application routes
const applicationRoute = require("./routes/applicationRoute");
app.use("/api/application", applicationRoute);


// Job management routes (create, read, update, delete jobs)
const jobRoute = require("./routes/jobRoute");
app.use("/api/job", jobRoute)

// Catch-all 404 route
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Use PORT from .env with fallback
const PORT = process.env.PORT || 4000;
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
});


