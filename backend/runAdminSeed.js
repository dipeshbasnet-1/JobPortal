require('dotenv').config();
const seedAdminUser = require("./adminSeed");
const { connectDB } = require("./db/dbconfig");

const runSeed = async () => {
    await connectDB();       // connect to database
    await seedAdminUser();   // create admin if not exists
    process.exit(0);         // exit
}

runSeed().catch(err => {
    console.error(err);
    process.exit(1);
});