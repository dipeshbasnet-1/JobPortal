const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies and authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Import database connection and models
const { connectDB, sequelize } = require('./db/dbconfig');

// Import models
const User = require('./model/UserModel');
const Job = require('./model/JobModel');
const Application = require('./model/applicationModel');
require('./model/paymentModel'); // Transaction model

// Import admin seeding function
const seedAdminUser = require('./adminSeed');

// Initialize database, sync models, and seed admin
const initializeApp = async () => {
    try {
        // Connect to DB
        await connectDB();

        // Sync all models (creates tables if they don't exist)
        await sequelize.sync({ alter: true });
        console.log("All models synced successfully");

        // Seed admin user
        await seedAdminUser();
        console.log("Admin seeding completed");

        // Start server on port 4000
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (err) {
        console.error("Failed to initialize app:", err);
        process.exit(1);
    }
};

// Call initialize
initializeApp();

// Routes
const userRoutes = require("./routes/userRoute");  
app.use("/api/auth", userRoutes);

const jobRoutes = require("./routes/jobRoute");
app.use("/api/jobs", jobRoutes);

const applicationRoutes = require("./routes/applicationRoute");
app.use("/api/applications", applicationRoutes);

const paymentRoutes = require("./routes/paymentRoute");
app.use("/api/payments", paymentRoutes);


// Catch-all 404 route
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});