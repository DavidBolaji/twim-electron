import { Router } from 'express';
const userController = require("../controllers/userController");
const catchAsyncError = require("../utils/error");


const userRouter = Router();

userRouter.post('/course', userController.create)
userRouter.get('/user', userController.getAll)
userRouter.get('user/:id', userController.getOne)
userRouter.put('/user/:id', userController.updateOne)
userRouter.delete('/user/:id', userController.deleteOne)
