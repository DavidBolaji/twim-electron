import { Request, Response } from 'express';
import { ObjectId, Types } from 'mongoose';
import { UserModel, User } from '../models/userModel';
const { cloudinary } = require("../utils/cloudinary");


exports.create = async (req: Request, res: Response) => {
    console.log(req.body);

    const user = new UserModel({ ...req.body });

    try {
        await user.save();
        res.status(200).send({ user });
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }

}


exports.getAll = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.find({})
        res.status(200).send(user)
    } catch (e: any) {
        res.status(500).send({ message: e.message })
    }
}


exports.getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        res.status(200).send(user)

    } catch (e: any) {
        res.status(400).send({ message: e.message })
    }
}

exports.updateOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    let user: any = await UserModel.findOne({ _id: id });

    const allowed = ['name', 'password'];

    const ObjKeys: string[] = Object.keys(req.body)


    if (!ObjKeys.every(obj => allowed.includes(obj))) {
        return res.status(401).send();
    }

    try {

        ObjKeys.forEach((obj) => {
            user[obj] = req.body[obj]
        })

        await user?.save();

        res.status(200).send(user)

    } catch (e: any) {
        res.status(400).send({ e: e.message })
    }
}


exports.deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const user = await UserModel.deleteOne({ _id: { $eq: id } });

        res.status(200).send(user)

    } catch (e: any) {
        res.status(400).send({ e: e.message })
    }
}