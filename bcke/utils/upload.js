const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your root
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter (optional)
const fileFilter = function (req, file, cb) {
  // Accept all files or restrict by type
  cb(null, true);
};

// Initialize multer with config
const upload = multer({ storage, fileFilter });

module.exports = upload; // ✅ This is what gives you upload.single()

