"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagModel = exports.ContentModel = exports.UserModel = exports.ObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.ObjectId = mongoose_1.default.Types.ObjectId;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MongoDB_URL);
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});
const ContentSchema = new Schema({
    content: { type: String, required: true },
    type: { type: String, enum: ["text", "video", "link", "document"], required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    tags: { type: [String] },
    isImportant: { type: Boolean, required: true },
    userId: { type: exports.ObjectId, required: true, ref: 'Users' }
}, {
    timestamps: true
});
const TagSchema = new Schema({
    tag: { type: String, required: true }
});
const LinkSchema = new Schema({
    hash: { type: String, required: true, unique: true },
    userId: { type: exports.ObjectId, required: true, ref: 'Users' }
});
exports.UserModel = mongoose_1.default.model('Users', UserSchema);
exports.ContentModel = mongoose_1.default.model('Contents', ContentSchema);
exports.TagModel = mongoose_1.default.model('Tags', TagSchema);
exports.LinkModel = mongoose_1.default.model('Links', LinkSchema);
