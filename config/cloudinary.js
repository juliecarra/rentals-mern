const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "rentals",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(undefined, "rental" + Date.now());
  }
});

const uploader = multer({ storage });

module.exports = uploader;
