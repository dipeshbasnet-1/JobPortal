const {DataTypes} = require("sequelize")
const { sequelize } = require("../db/dbconfig")

// Define a Sequelize model for Users table
// This creates a table "Users" (or "User") in the database

const User= sequelize.define("User",{
    id:{
        type: DataTypes.UUID,     // UUID type (unique identifier)
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4   // Auto-generate UUIDv4 if not provided
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userRole: {
            type: DataTypes.ENUM("jobSeeker", "jobProvider"),
            allowNull: false,
            defaultValue: "jobSeeker"
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        otpGeneratedTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userProfilePic:{
            type: DataTypes.STRING,
            allowNull: true
        }
})

module.exports = User;
