const User = require("./UserModel");
const Job = require("./JobModel");
const Application = require("./applicationModel"); 


// User - Job
User.hasMany(Job, { foreignKey: "userId" });
Job.belongsTo(User, { foreignKey: "userId" });

// User - Application
User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

// Job - Application
Job.hasMany(Application, { foreignKey: "jobId" });
Application.belongsTo(Job, { foreignKey: "jobId" });


module.exports = { User, Job, Application };
