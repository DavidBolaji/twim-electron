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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cors = require('cors');
const courseRoute_1 = __importDefault(require("./routes/courseRoute"));
const contentRoute_1 = __importDefault(require("./routes/contentRoute"));
const mongoose_1 = require("mongoose");
// import routes from "./routes";
const app = (0, express_1.default)();
app.use(cors({
    origin: '*'
}));
app.use(express_1.default.json());
app.use(courseRoute_1.default);
app.use(contentRoute_1.default);
const port = process.env.PORT || config_1.default.get("port");
const uri = process.env.MONGODB_URI_PROD || config_1.default.get("dbUri");
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${port}`);
    (0, mongoose_1.connect)(uri).then(res => {
        console.info(`database started on ${port}`);
    }).catch((e) => {
        console.error(`The following error occured ${e} `);
    });
    // routes(app);
}));
