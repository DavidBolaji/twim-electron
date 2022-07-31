"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: config_1.default.get('cloudinaryCloudName') || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.default.get('cloudinaryApiKey') || process.env.CLOUDINARY_API_KEY,
    api_secret: config_1.default.get('cloudinaryApiSecret') || process.env.CLOUDINARY_API_SECRET,
});
module.exports = { cloudinary };
