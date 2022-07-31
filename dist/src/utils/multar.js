"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const upload = multer({
    dest: '\src/assets/images',
    limits: {
        fileSize: 10000000000
    },
    fileFilter(request, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg|mp4)$/)) {
            return cb(new Error('Please upload image file'));
        }
        cb(undefined, true);
    }
});
module.exports = upload;
