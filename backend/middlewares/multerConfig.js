const multer = require("multer");

// Memory storage 
const storage = multer.memoryStorage();

module.exports = { multer, storage };
