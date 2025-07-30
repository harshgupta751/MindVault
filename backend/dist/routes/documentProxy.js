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
const axios_1 = __importDefault(require("axios"));
const cloudinary_1 = require("cloudinary");
const router = express_1.default.Router();
router.get('/document-proxy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { publicId } = req.query;
    if (!publicId || typeof publicId !== 'string') {
        return res.status(400).send('Missing publicId');
    }
    try {
        const signedUrl = cloudinary_1.v2.url(publicId, {
            type: 'upload', // ❗ Try switching this to 'upload' or 'raw' depending on actual file type
            resource_type: 'raw',
            sign_url: true,
            secure: true,
        });
        const headResponse = yield axios_1.default.head(signedUrl);
        const contentType = headResponse.headers['content-type'] || 'application/octet-stream';
        const isPDF = contentType.includes('pdf');
        const filename = publicId.split('/').pop() || 'document';
        const fileResponse = yield axios_1.default.get(signedUrl, { responseType: 'stream' });
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `${isPDF ? 'inline' : 'attachment'}; filename="${filename}"`);
        //@ts-ignore
        fileResponse.data.pipe(res);
    }
    catch (err) {
        console.error('Proxy error:', ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) || (err === null || err === void 0 ? void 0 : err.message) || err);
        res.status(500).send('Failed to fetch or serve document');
    }
}));
exports.default = router;
