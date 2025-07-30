"use strict";
// // server/routes/upload.ts
// import express from 'express';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../utils/cloudinary';
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
// const router = express.Router();
// // ✅ setup CloudinaryStorage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: 'mindvault-documents',
//     resource_type: 'raw', // <- force raw here
//     public_id: file.originalname.split('.')[0], // optional: keep original filename
//   }),
// });
// const upload = multer({ storage });
// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const fileData = req.file;
//     // Log everything from multer + Cloudinary
//     console.log('Uploaded file data:', fileData);
//     const rawUrl = fileData?.path?.replace('/image/', '/raw/'); // fallback if needed
//     //@ts-ignore
//     const secureUrl = fileData?.secure_url || rawUrl;
//     res.json({ url: secureUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });
// export default router;
// server/routes/upload.ts
// import express from 'express';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../utils/cloudinary';
// const router = express.Router();
// // ✅ Setup CloudinaryStorage with raw type
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: 'mindvault-documents',
//     resource_type: 'raw', // Force raw for documents
//     public_id: file.originalname.split('.')[0], // Optional: keep original filename
//   }),
// });
// const upload = multer({ storage });
// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const fileData = req.file;
//     // ✅ safest way to return URL is using 'secure_url'
//     // raw files go to /raw/upload/... path by default if uploaded as 'resource_type: raw'
//     //@ts-ignore
//     const secureUrl = fileData?.path || fileData?.secure_url;
//     if (!secureUrl) {
//       return res.status(500).json({ error: 'Upload succeeded but no file URL found' });
//     }
//     res.json({ url: secureUrl });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });
// export default router;
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
