import { Request, Response } from 'express';
import { ObjectId, Types } from 'mongoose';
import { CourseModel, Course } from '../models/courseModel';
const { cloudinary } = require("../utils/cloudinary");


exports.create = async (req: Request, res: Response) => {

    const course = new CourseModel({ ...req.body });

    await course.save();
    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        public_id: course._id,
        folder: "twim/course",
        format: "png",
        transformation: [
            {
                width: 300,
                height: 200,
                crop: "fill",
                gravity: "face",
            },
        ],
    });

    course.photo = uploadRes.secure_url;

    try {
        await course.save();
        res.status(200).send({ course });
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }

}


exports.getAll = async (req: Request, res: Response) => {
    try {
        const course = await CourseModel.find({})
        res.status(200).send(course)
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }
}


exports.getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const course = await CourseModel.findById(id);
        res.status(200).send(course)

    } catch (e: any) {
        res.status(400).send({ message: e.message })
    }
}

exports.updateOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    let course: any = await CourseModel.findOne({ _id: id });

    const allowed = ['name', 'photo'];

    const ObjKeys: string[] = Object.keys(req.body)


    if (!ObjKeys.every(obj => allowed.includes(obj))) {
        return res.status(401).send();
    }

    try {

        if (req.body) {
            const uploadRes = await cloudinary.uploader.upload(req.file.path, {
                public_id: course._id,
                folder: 'twim/course',
                format: 'png',
                transformation: [
                    {
                        width: 2000,
                        height: 1250,
                        crop: "fill"
                    }
                ]
            });

            course.photo = uploadRes.secure_url;

        }


        ObjKeys.forEach((obj) => {
            course[obj] = req.body[obj]
        })

        await course?.save();

        res.status(200).send(course)

    } catch (e: any) {
        res.status(400).send({ e: e.message })
    }
}

exports.deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const course = await CourseModel.deleteOne({ _id: { $eq: id } });

        res.status(200).send(course)

    } catch (e: any) {
        res.status(400).send({ e: e.message })
    }
}