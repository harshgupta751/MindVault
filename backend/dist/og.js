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
// server/routes/og.ts
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const router = express_1.default.Router();
// Helper to resolve relative URLs
const resolveUrl = (base, relative) => {
    try {
        return new URL(relative, base).toString();
    }
    catch (e) {
        return relative;
    }
};
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { url } = req.body;
    // Validate URL
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    try {
        // Special handling for Twitter
        if (url.includes('twitter.com') || url.includes('x.com')) {
            const tweetId = (_a = url.match(/status\/(\d+)/)) === null || _a === void 0 ? void 0 : _a[1];
            if (tweetId) {
                return res.json({
                    image: `https://unavatar.io/twitter/${tweetId}?fallback=false`,
                    title: 'Twitter Post',
                    description: 'View on Twitter'
                });
            }
        }
        // Special handling for LinkedIn
        if (url.includes('linkedin.com')) {
            // Clean LinkedIn URL
            const cleanUrl = url.split('?')[0];
            return res.json({
                image: `https://unavatar.io/linkedin/${cleanUrl}?fallback=false`,
                title: 'LinkedIn Post',
                description: 'View on LinkedIn'
            });
        }
        // Set custom headers to avoid blocking
        const headers = {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml',
        };
        // Fetch HTML content
        const response = yield axios_1.default.get(url, {
            headers: Object.assign(Object.assign({}, headers), { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }),
            timeout: 5000,
            //@ts-ignore
            maxRedirects: 5
        });
        // Parse HTML
        const $ = cheerio_1.default.load(response.data);
        // Extract Open Graph data
        const ogImage = $('meta[property="og:image"]').attr('content') ||
            $('meta[name="twitter:image"]').attr('content') ||
            $('meta[name="twitter:image:src"]').attr('content');
        const ogTitle = $('meta[property="og:title"]').attr('content') ||
            $('title').text() ||
            $('meta[name="title"]').attr('content');
        const ogDescription = $('meta[property="og:description"]').attr('content') ||
            $('meta[name="description"]').attr('content') ||
            $('meta[name="twitter:description"]').attr('content');
        // Handle relative URLs
        const absoluteImage = ogImage ? resolveUrl(url, ogImage) : null;
        // YouTube fallback
        let finalImage = absoluteImage;
        if (!finalImage && (url.includes('youtube.com') || url.includes('youtu.be'))) {
            const videoId = (_b = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)) === null || _b === void 0 ? void 0 : _b[1];
            if (videoId) {
                finalImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
        }
        res.json({
            image: finalImage,
            title: ogTitle,
            description: ogDescription
        });
    }
    catch (error) {
        console.error('OG fetch error:', error);
        // YouTube fallback
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = (_c = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)) === null || _c === void 0 ? void 0 : _c[1];
            if (videoId) {
                return res.json({
                    image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                    title: 'YouTube Video',
                    description: 'Watch on YouTube'
                });
            }
        }
        res.status(500).json({ error: 'Failed to fetch OG data' });
    }
}));
exports.default = router;
