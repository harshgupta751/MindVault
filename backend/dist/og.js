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
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    try {
        if (url.includes('twitter.com') || url.includes('x.com')) {
            const tweetId = (_a = url.match(/status\/(\d+)/)) === null || _a === void 0 ? void 0 : _a[1];
            if (tweetId) {
                return res.json({
                    image: `https://unavatar.io/twitter/${tweetId}?fallback=false`,
                    title: 'Twitter Post',
                    description: 'View on Twitter',
                });
            }
        }
        if (url.includes('linkedin.com')) {
            return res.json({
                image: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
                title: 'LinkedIn Post',
                description: 'View on LinkedIn'
            });
        }
        if (url.includes('instagram.com')) {
            return res.json({
                image: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
                title: 'Instagram Post',
                description: 'View on Instagram'
            });
        }
        const options = {
            url,
            timeout: 7000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            },
        };
        const { error, result } = yield (0, open_graph_scraper_1.default)(options);
        if (error || !result.success) {
            console.error('OG scraping failed:', error);
            throw new Error('OG scraping failed');
        }
        //@ts-ignore
        const ogImage = (_b = result.ogImage) === null || _b === void 0 ? void 0 : _b.url;
        const ogTitle = result.ogTitle;
        const ogDescription = result.ogDescription;
        if (!ogImage && (url.includes('youtube.com') || url.includes('youtu.be'))) {
            const videoId = (_c = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)) === null || _c === void 0 ? void 0 : _c[1];
            if (videoId) {
                return res.json({
                    image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                    title: 'YouTube Video',
                    description: 'Watch on YouTube',
                });
            }
        }
        return res.json({
            image: ogImage || '',
            title: ogTitle || 'Untitled',
            description: ogDescription || '',
        });
    }
    catch (error) {
        console.error('OG fetch error:', error);
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = (_d = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)) === null || _d === void 0 ? void 0 : _d[1];
            if (videoId) {
                return res.json({
                    image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                    title: 'YouTube Video',
                    description: 'Watch on YouTube',
                });
            }
        }
        return res.status(500).json({ error: 'Failed to fetch OG data' });
    }
}));
exports.default = router;
