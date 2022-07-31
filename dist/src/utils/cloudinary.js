"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || config_1.default.get('cloudinaryCloudName'),
    api_key: process.env.CLOUDINARY_API_KEY || config_1.default.get('cloudinaryApiKey'),
    api_secret: process.env.CLOUDINARY_API_SECRET || config_1.default.get('cloudinaryApiSecret'),
});
module.exports = { cloudinary };
