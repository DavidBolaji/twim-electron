"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Create the schema
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});
// Create and export user model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
