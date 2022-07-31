"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncError = (error, req, res, next) => {
    return res.send({ error: error.message });
};
module.exports = catchAsyncError;
