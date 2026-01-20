const User = require("./model/UserModel");
const bcrypt = require("bcryptjs");

// Function to auto-create admin user
const seedAdminUser = async () => {
    try {
        // Check if admin user already exists
        const userAdmin = await User.findOne({
            where: { userEmail: process.env.ADMIN_EMAIL }
        })
        
        if (userAdmin) {
            console.log("Admin user already exists!");
            return;
        }
        
        // Create admin user
        await User.create({
            username: "dipeshbasnet",
            userEmail: process.env.ADMIN_EMAIL,
            userPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
            userRole: "jobProvider"
        })
        
        console.log("🎉 Admin user created successfully!");
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
}

module.exports = seedAdminUser;
