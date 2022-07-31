"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
// Create the schema
const CourseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    photo: String,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});
// Create and export user model
exports.CourseModel = (0, mongoose_1.model)("Course", CourseSchema);
