"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = require("mongoose");
// Create the schema
const ContentSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    video: String,
    pos: {
        type: Number,
        required: true
    },
    duration: Number
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});
// Create and export user model
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
