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
const body_parser_1 = __importDefault(require("body-parser"));
const og_1 = __importDefault(require("./og"));
const nanoid_1 = require("nanoid");
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
    credentials: true
}));
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
        const email = req.body.email;
        const findUser = yield db_1.UserModel.findOne({
            email
        });
        if (findUser) {
            res.json({
                message: "User already exists!"
            });
            return;
        }
        const name = req.body.name;
        const password = req.body.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        try {
            yield db_1.UserModel.create({
                email,
                name,
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
        const email = req.body.email;
        const password = req.body.password;
        try {
            const findUser = yield db_1.UserModel.findOne({
                email
            });
            if (!findUser) {
                res.json({
                    message: "User does not exist!"
                });
                return;
            }
            const check = yield bcrypt_1.default.compare(password, findUser.password);
            if (!check) {
                res.json({
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
app.post('/resetpassword', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        try {
            const findUser = yield db_1.UserModel.findOne({
                email
            });
            if (!findUser) {
                res.status(404).json({
                    message: "Email not found!"
                });
                return;
            }
            //@ts-ignore
            const token = jsonwebtoken_1.default.sign({
                userId: findUser._id
            }, process.env.RESET_SECRET, { expiresIn: '15m' });
            const resetLink = `http://localhost:5173/resetpassword?token=${token}`;
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });
            yield transporter.sendMail({
                from: 'MindVault <no-reply@mindvault.com>',
                to: email,
                subject: "Reset Password",
                html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`
            });
            res.json({
                message: "Reset link sent to your email"
            });
        }
        catch (e) {
            res.status(500).json({
                error: "Error occured. Please try again!"
            });
        }
    });
});
app.post('/createnewpassword', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.body.token;
        const password = req.body.password;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.RESET_SECRET);
            const hashedPassword = yield bcrypt_1.default.hash(password, 5);
            yield db_1.UserModel.updateOne({
                //@ts-ignore
                _id: decoded.userId
            }, {
                password: hashedPassword
            });
            res.json({
                message: "Password reset successfully!"
            });
        }
        catch (e) {
            res.status(400).json({
                error: "Invalid token"
            });
        }
    });
});
app.post('/create', middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = req.body.content;
        const type = req.body.type;
        const title = req.body.title;
        const subtitle = req.body.subtitle;
        const tags = req.body.tags;
        const response = validators_1.createSchema.safeParse({
            content,
            type,
            title,
            subtitle
        });
        if (!response.success) {
            res.status(411).json({
                error: "Invalid inputs!"
            });
            return;
        }
        try {
            yield db_1.ContentModel.create({
                content,
                type,
                title,
                subtitle,
                tags,
                //@ts-ignore
                userId: new db_1.ObjectId(req.id)
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
                userId: new db_1.ObjectId(req.id)
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
app.delete('/delete/:id', middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentId = req.params.id;
        try {
            yield db_1.ContentModel.deleteOne({
                _id: contentId,
                //@ts-ignore
                userId: new db_1.ObjectId(req.id)
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
app.get('/share/settings/:shareOn', middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const shareOn = Boolean(req.params.shareOn);
        try {
            if (!shareOn) {
                yield db_1.LinkModel.deleteOne({
                    //@ts-ignore
                    userId: new db_1.ObjectId(req.id)
                });
                res.json({
                    message: "Share is disabled"
                });
                return;
            }
            const existingSharableId = yield db_1.LinkModel.findOne({
                //@ts-ignore
                userId: new db_1.ObjectId(req.id)
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
                userId: new db_1.ObjectId(req.id)
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
app.get('/share/content/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharableId = req.params.id;
        try {
            const response = yield db_1.LinkModel.findOne({
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
            const allContent = yield db_1.ContentModel.find({
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
});
app.use(body_parser_1.default.json());
app.use('/api/og', og_1.default);
app.listen(3000, () => console.log("Server is running"));
