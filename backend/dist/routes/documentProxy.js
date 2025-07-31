"use strict";
// correct- 
// import express from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();
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
// router.get('/document-proxy', async (req, res) => {
//   const { publicId } = req.query;
//   if (!publicId || typeof publicId !== 'string') {
//     return res.status(400).send('Missing document publicId');
//   }
//   const decodedPublicId = decodeURIComponent(publicId);
//   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
//   const documentUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${decodedPublicId}`;
//   console.log('Proxying from:', documentUrl);
//   try {
//     const response = await axios.get(documentUrl, {
//       responseType: 'stream',
//     });
//     res.setHeader('Content-Type', response.headers['content-type']);
//     res.setHeader(
//       'Content-Disposition',
//       `attachment; filename="${decodedPublicId.split('/').pop()}"`
//     );
//     // @ts-ignore
//     response.data.pipe(res);
//   } catch (err: any) {
//     console.error('[Document Proxy Error]', err?.message || err);
//     res.status(500).send('Failed to fetch or serve document');
//   }
// });
// export default router;
// routes/documentProxy.ts
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get('/document-proxy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicId } = req.query;
    if (!publicId || typeof publicId !== 'string') {
        return res.status(400).send('Missing document publicId');
    }
    const decodedPublicId = decodeURIComponent(publicId);
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const documentUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${decodedPublicId}`;
    console.log('Proxying from:', documentUrl);
    try {
        const response = yield axios_1.default.get(documentUrl, {
            responseType: 'stream',
        });
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Disposition', `attachment; filename="${decodedPublicId.split('/').pop()}"`);
        // @ts-ignore
        response.data.pipe(res);
    }
    catch (err) {
        console.error('[Document Proxy Error]', (err === null || err === void 0 ? void 0 : err.message) || err);
        res.status(500).send('Failed to fetch or serve document');
    }
}));
exports.default = router;
