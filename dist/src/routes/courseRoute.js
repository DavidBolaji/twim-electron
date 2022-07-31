"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController = require("../controllers/courseController");
const catchAsyncError = require("../utils/error");
const upload = require("../utils/multar");
const courseRouter = (0, express_1.Router)();
courseRouter.post('/course', upload.single("images"), courseController.create, catchAsyncError);
courseRouter.get('/course', courseController.getAll);
courseRouter.get('/course/:id', courseController.getOne);
courseRouter.put('/course/:id', upload.single("images"), courseController.updateOne, catchAsyncError);
courseRouter.delete('/course/:id', courseController.deleteOne);
exports.default = courseRouter;