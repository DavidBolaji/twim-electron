const multer = require('multer');
import { Request } from 'express';


const upload = multer({
    dest: '\src/assets/images',
    limits: {
        fileSize: 10000000000
    },
    fileFilter(
        request: Request,
        file: any,
        cb: any
    ) {
        if (!file.originalname.match(/\.(png|jpeg|jpg|mp4)$/)) {
            return cb(new Error('Please upload image file'))
        }

        cb(undefined, true);
    }
})

module.exports = upload;