const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbconfig"); 
// Define Application model
const Application = sequelize.define("Application", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, 
    },
    status: {
        type: DataTypes.ENUM("applied", "in_review", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "applied" 
    },
    appliedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    jobId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Jobs",
            key: "id"
        }
    }
}, {
    tableName: "Applications",
    timestamps: true 
});

module.exports = Application;
