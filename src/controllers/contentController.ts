import { Request, Response } from 'express';
import { ContentModel } from '../models/contentModel';
const { cloudinary } = require("../utils/cloudinary");


exports.create = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const content = new ContentModel({ ...req.body, courseId })

    await content.save();

    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        public_id: content._id,
        folder: "twim/videos",
        resource_type: "video"
    });

    content.video = uploadRes.secure_url;
    content.duration = uploadRes.duration.toFixed(2);

    try {
        await content.save();
        res.status(200).send({ content });
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }
}


exports.getAll = async (req: Request, res: Response) => {
    const { courseId } = req.params;

    try {
        const contents = await ContentModel.find({ courseId });
        res.status(200).send(contents)

    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }
}


exports.getOne = async (req: Request, res: Response) => {

}

exports.updateOne = async (req: Request, res: Response) => {
    const { courseId, id } = req.params;

    let content: any = await ContentModel.findOne({ _id: id, courseId });

    console.log(content);


    const allowedUpdate: string[] = ['name', 'pos', 'video'];

    console.log(req.body);


    const objKey: string[] = Object.keys(req.body)

    if (!objKey.every(obj => allowedUpdate.includes(obj))) {
        return res.status(401).send()
    }

    try {
        if (req.file?.path) {
            const uploadRes = await cloudinary.uploader.upload(req.file.path, {
                public_id: content._id,
                folder: "twim/videos",
                resource_type: "video"

            });

            content.video = uploadRes.secure_url;
            content.duration = uploadRes.duration.toFixed(2);
        }

        objKey.forEach((obj) => {
            content[obj] = req.body[obj]
        })

        await content?.save();

        res.status(200).send(content)
    } catch (e: any) {
        res.status(400).send({ e: e.message })
    }

}


exports.deleteOne = async (req: Request, res: Response) => {

}