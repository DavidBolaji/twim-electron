import { Router } from 'express';
const contentController = require("../controllers/contentController");
const catchAsyncError = require("../utils/error");
const upload = require("../utils/multar");

const contentRouter = Router();

contentRouter.post('/content/:courseId', upload.single("videos"), contentController.create, catchAsyncError)
contentRouter.get('/content/:courseId', contentController.getAll)
contentRouter.get('/content/:courseId/:id', contentController.getOne)
contentRouter.put('/content/:courseId/:id', upload.single("videos"), contentController.updateOne, catchAsyncError)
contentRouter.delete('/content/:courseId/:id', contentController.deleteOne)


export default contentRouter;