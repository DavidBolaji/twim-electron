import { Router } from 'express';
const courseController = require("../controllers/courseController");
const catchAsyncError = require("../utils/error");
const upload = require("../utils/multar");

const courseRouter = Router();

courseRouter.post('/course', upload.single("images"), courseController.create, catchAsyncError)
courseRouter.get('/course', courseController.getAll)
courseRouter.get('/course/:id', courseController.getOne)
courseRouter.put('/course/:id', upload.single("images"), courseController.updateOne, catchAsyncError)
courseRouter.delete('/course/:id', courseController.deleteOne)


export default courseRouter;