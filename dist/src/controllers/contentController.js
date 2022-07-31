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
const contentModel_1 = require("../models/contentModel");
const { cloudinary } = require("../utils/cloudinary");
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const content = new contentModel_1.ContentModel(Object.assign(Object.assign({}, req.body), { courseId }));
    yield content.save();
    const uploadRes = yield cloudinary.uploader.upload(req.file.path, {
        public_id: content._id,
        folder: "twim/videos",
        resource_type: "video"
    });
    content.video = uploadRes.secure_url;
    content.duration = uploadRes.duration.toFixed(2);
    try {
        yield content.save();
        res.status(200).send({ content });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const contents = yield contentModel_1.ContentModel.find({ courseId });
        res.status(200).send(contents);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});
exports.getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId, id } = req.params;
    let content = yield contentModel_1.ContentModel.findOne({ _id: id, courseId });
    console.log(content);
    const allowedUpdate = ['name', 'pos', 'video'];
    console.log(req.body);
    const objKey = Object.keys(req.body);
    if (!objKey.every(obj => allowedUpdate.includes(obj))) {
        return res.status(401).send();
    }
    try {
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            const uploadRes = yield cloudinary.uploader.upload(req.file.path, {
                public_id: content._id,
                folder: "twim/videos",
                resource_type: "video"
            });
            content.video = uploadRes.secure_url;
            content.duration = uploadRes.duration.toFixed(2);
        }
        objKey.forEach((obj) => {
            content[obj] = req.body[obj];
        });
        yield (content === null || content === void 0 ? void 0 : content.save());
        res.status(200).send(content);
    }
    catch (e) {
        res.status(400).send({ e: e.message });
    }
});
exports.deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
