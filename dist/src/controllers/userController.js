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
const userModel_1 = require("../models/userModel");
const { cloudinary } = require("../utils/cloudinary");
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = new userModel_1.UserModel(Object.assign({}, req.body));
    try {
        yield user.save();
        res.status(200).send({ user });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.UserModel.find({});
        res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});
exports.getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModel_1.UserModel.findById(id);
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let user = yield userModel_1.UserModel.findOne({ _id: id });
    const allowed = ['name', 'password'];
    const ObjKeys = Object.keys(req.body);
    if (!ObjKeys.every(obj => allowed.includes(obj))) {
        return res.status(401).send();
    }
    try {
        ObjKeys.forEach((obj) => {
            user[obj] = req.body[obj];
        });
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send({ e: e.message });
    }
});
exports.deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModel_1.UserModel.deleteOne({ _id: { $eq: id } });
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send({ e: e.message });
    }
});
