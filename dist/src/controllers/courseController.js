"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const courseModel_1 = require("../models/courseModel");
const { cloudinary } = require("../utils/cloudinary");
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new courseModel_1.CourseModel(Object.assign({}, req.body));
    yield course.save();
    const uploadRes = yield cloudinary.uploader.upload(req.file.path, {
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
        yield course.save();
        res.status(200).send({ course });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courseModel_1.CourseModel.find({});
        res.status(200).send(course);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});
exports.getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const course = yield courseModel_1.CourseModel.findById(id);
        res.status(200).send(course);
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let course = yield courseModel_1.CourseModel.findOne({ _id: id });
    const allowed = ['name', 'photo'];
    const ObjKeys = Object.keys(req.body);
    if (!ObjKeys.every(obj => allowed.includes(obj))) {
        return res.status(401).send();
    }
    try {
        if (req.body) {
            const uploadRes = yield cloudinary.uploader.upload(req.file.path, {
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
            course[obj] = req.body[obj];
        });
        yield (course === null || course === void 0 ? void 0 : course.save());
        res.status(200).send(course);
    }
    catch (e) {
        res.status(400).send({ e: e.message });
    }
});
exports.deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const course = yield courseModel_1.CourseModel.deleteOne({ _id: { $eq: id } });
        res.status(200).send(course);
    }
    catch (e) {
        res.status(400).send({ e: e.message });
    }
});
