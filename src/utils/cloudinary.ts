import config from "config";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.get('cloudinaryCloudName') || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: config.get('cloudinaryApiKey') || process.env.CLOUDINARY_API_KEY,
    api_secret: config.get('cloudinaryApiSecret') || process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary }