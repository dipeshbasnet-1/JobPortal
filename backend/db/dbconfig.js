require("dotenv").config();
const { Sequelize } = require("sequelize");

// Initialize Sequelize instance with your database connection string
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: { 
            require: true, 
            rejectUnauthorized: false },
    },
});

// Function to connect to the database and sync models
const connectDB = async () => {
    try {
    // Test database connection
    await sequelize.authenticate();
    console.log(" Database connected successfully.");
    
    // Load models and relationships
    require("../model/index"); 

    // Sync models safely
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    } catch (error) {
    console.error(" Unable to connect to the database:", error);
    }
}

module.exports = { sequelize, connectDB };
