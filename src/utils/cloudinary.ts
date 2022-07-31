import config from "config";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || config.get('cloudinaryCloudName'),
    api_key: process.env.CLOUDINARY_API_KEY || config.get('cloudinaryApiKey'),
    api_secret: process.env.CLOUDINARY_API_SECRET || config.get('cloudinaryApiSecret'),
});

module.exports = { cloudinary }