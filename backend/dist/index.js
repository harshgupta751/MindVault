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
const validators_1 = require("./validators");
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
const nanoid_1 = require("nanoid");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/signup', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = validators_1.signUpSchema.safeParse(req.body);
        if (!response.success) {
            res.status(411).json({
                error: response.error
            });
            return;
        }
        const username = req.body.username;
        const findUser = yield db_1.UserModel.findOne({
            username
        });
        if (findUser) {
            res.json({
                message: "Username already exits!"
            });
            return;
        }
        const password = req.body.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        try {
            yield db_1.UserModel.create({
                username,
                password: hashedPassword
            });
            res.json({
                message: "You are successfully Signed Up!"
            });
        }
        catch (e) {
            res.status(403).json({
                error: "Error occured. Please try again!"
            });
        }
    });
});
app.post('/signin', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = validators_1.signInSchema.safeParse(req.body);
        if (!response.success) {
            res.status(411).json({
                error: response.error
            });
            return;
        }
        const username = req.body.username;
        const password = req.body.password;
        try {
            const findUser = yield db_1.UserModel.findOne({
                username: username
            });
            if (!findUser) {
                res.status(403).json({
                    message: "User does not exist!"
                });
                return;
            }
            const check = yield bcrypt_1.default.compare(password, findUser.password);
            if (!check) {
                res.status(403).json({
                    message: "Wrong Password!"
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: findUser._id
            }, process.env.JWT_SECRET);
            res.json({
                token
            });
        }
        catch (e) {
            res.status(500).json({
                error: "Error occured. Please try again!"
            });
        }
    });
});
app.post('/create', middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body.link;
        const type = req.body.type;
        const title = req.body.title;
        const tags = req.body.tags;
        const response = validators_1.createSchema.safeParse({
            link,
            type,
            title
        });
        if (!response.success) {
            res.status(411).json({
                error: "Invalid inputs!"
            });
            return;
        }
        try {
            yield db_1.ContentModel.create({
                link,
                type,
                title,
                tags,
                //@ts-ignore
                userId: req.id
            });
            res.json({
                message: "Content Added!"
            });
        }
        catch (e) {
            res.status(403).json({
                error: "Error occured. Please try again!"
            });
        }
    });
});
app.get('/allcontent', middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allContent = yield db_1.ContentModel.find({
                //@ts-ignore
                userId: req.id
            });
            res.json({
                allContent: allContent
            });
        }
        catch (e) {
            res.status(403).json({
                error: "Error occured. Please try again!"
            });
        }
    });
});
app.delete('/delete', middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentId = req.body.contentId;
        try {
            yield db_1.ContentModel.deleteOne({
                _id: contentId,
                //@ts-ignore
                userId: req.id
            });
            res.json({
                message: "Content deleted."
            });
        }
        catch (e) {
            res.status(403).json({
                error: "Error occured. Please try again!"
            });
        }
    });
});
app.post('/share', middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const shareOn = req.body.shareOn;
        try {
            if (!shareOn) {
                yield db_1.LinkModel.deleteOne({
                    //@ts-ignore
                    userId: req.id
                });
                res.json({
                    message: "Share is disabled"
                });
                return;
            }
            const existingSharableId = db_1.LinkModel.findOne({
                //@ts-ignore
                userId: req.id
            });
            if (existingSharableId) {
                res.json({
                    //@ts-ignore
                    sharableId: `/share/${existingSharableId.hash}`
                });
                return;
            }
            const sharableId = (0, nanoid_1.nanoid)();
            yield db_1.LinkModel.create({
                hash: sharableId,
                //@ts-ignore
                userId: req.id
            });
            res.json({
                sharableId: `/share/${sharableId}`
            });
        }
        catch (e) {
            res.status(403).json({
                error: "Error occured. Please try again!"
            });
        }
    });
});
app.get('/share/:id', function (req, res) {
    const sharableId = req.params.id;
    try {
        const response = db_1.LinkModel.findOne({
            hash: sharableId
        });
        if (!response) {
            res.status(404).json({
                message: "This link is not valid"
            });
            return;
        }
        //@ts-ignore
        const userId = response.userId;
        const allContent = db_1.ContentModel.find({
            userId
        });
        res.json({
            allContent
        });
    }
    catch (e) {
        res.status(403).json({
            error: "Error occured. Please try again!"
        });
    }
});
app.listen(3000);
