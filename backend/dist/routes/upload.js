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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const router = express_1.default.Router();
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        const ext = path_1.default.extname(file.originalname); // .pdf, .docx
        const name = path_1.default.parse(file.originalname).name.replace(/[^a-zA-Z0-9-_]/g, '-');
        return {
            folder: 'mindvault-documents',
            resource_type: 'raw',
            // public_id: `${name}${ext}`, // keep extension
            public_id: `${name}${ext}`, // ✅ This includes .pdf or .docx
        };
    }),
});
const upload = (0, multer_1.default)({ storage });
router.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const fileUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const publicId = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        if (!fileUrl || !publicId) {
            return res.status(400).json({ error: 'Missing file data' });
        }
        res.json({ url: fileUrl, publicId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    }
}));
exports.default = router;
