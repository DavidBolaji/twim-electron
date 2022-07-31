import { NextFunction, Request, Response } from 'express';
const catchAsyncError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.send({ error: error.message })
}

module.exports = catchAsyncError; 