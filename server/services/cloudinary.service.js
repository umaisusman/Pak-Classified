// Requiring V2 Version of Cloudinary
const cloudinary = require("cloudinary").v2;

// File System module of node
const fs = require("fs");

// require and config the dotenv for better connection
require("dotenv").config();

// Set configuration of the cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Creating uplaodOnCloud async function
const uploadOnCloud = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });


    console.log("File uploaded successfully", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error.message);

    // Ensure the local file exists before attempting to delete it
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

module.exports = uploadOnCloud;
