const {DataTypes, Sequelize} = require("sequelize");
const {sequelize} = require("../db/dbconfig");

const Job = sequelize.define("Job",{
    id:{
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Salary: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    }
}, {
    tableName: "Jobs",
    timestamps: false
}
)

module.exports = Job;
