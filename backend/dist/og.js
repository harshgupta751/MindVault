"use strict";
// // server/routes/og.ts
// import express, { Request, Response } from 'express';
// import axios from 'axios';
// import cheerio from 'cheerio';
// import ogs from 'open-graph-scraper'
// const router = express.Router();
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
// // Helper to resolve relative URLs
// const resolveUrl = (base: string, relative: string): string => {
//   try {
//     return new URL(relative, base).toString();
//   } catch (e) {
//     return relative;
//   }
// };
// // Define response interface
// interface OGApiResponse {
//   image?: string;
//   title?: string;
//   description?: string;
//   error?: string;
// }
// router.post('/', async (req: Request, res: Response<OGApiResponse>) => {
//   const { url } = req.body;
//   // Validate URL
//   if (!url || typeof url !== 'string') {
//     return res.status(400).json({ error: 'Invalid URL' });
//   }
//   try {
//     // Special handling for Twitter
//     if (url.includes('twitter.com') || url.includes('x.com')) {
//       const tweetId = url.match(/status\/(\d+)/)?.[1];
//       if (tweetId) {
//         return res.json({
//           image: `https://unavatar.io/twitter/${tweetId}?fallback=false`,
//           title: 'Twitter Post',
//           description: 'View on Twitter'
//         });
//       }
//     }
//     // Special handling for LinkedIn
//     if (url.includes('linkedin.com')) {
//       // Clean LinkedIn URL
//       const cleanUrl = url.split('?')[0];
//       return res.json({
//         image: `https://unavatar.io/linkedin/${cleanUrl}?fallback=false`,
//         title: 'LinkedIn Post',
//         description: 'View on LinkedIn'
//       });
//     }
//     // Set custom headers to avoid blocking
//   //   const headers = {
//   //     'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
//   //     'Accept-Language': 'en-US,en;q=0.9',
//   //     'Accept': 'text/html,application/xhtml+xml',
//   //   };
//   //   // Fetch HTML content
//   //   const response = await axios.get(url, {
//   //       headers: {
//   //   ...headers,
//   //   'Cache-Control': 'no-cache',
//   //   'Pragma': 'no-cache',
//   // },
//   //     timeout: 5000,
//   //       //@ts-ignore
//   //     maxRedirects: 5
//   //   });
//   //   // Parse HTML
//   //   const $ = cheerio.load(response.data as string);
//   //   // Extract Open Graph data
//   //   const ogImage = $('meta[property="og:image"]').attr('content') || 
//   //                   $('meta[name="twitter:image"]').attr('content') ||
//   //                   $('meta[name="twitter:image:src"]').attr('content');
//   //   const ogTitle = $('meta[property="og:title"]').attr('content') || 
//   //                   $('title').text() ||
//   //                   $('meta[name="title"]').attr('content');
//   //   const ogDescription = $('meta[property="og:description"]').attr('content') || 
//   //                         $('meta[name="description"]').attr('content') ||
//   //                         $('meta[name="twitter:description"]').attr('content');
//   // Use open-graph-scraper instead of cheerio
// const options = {
//   url,
//   timeout: 7000,
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
//   },
// };
// const { error, result } = await ogs(options);
// if (error) {
//   console.error('OG scraping failed:', error);
//   return res.status(500).json({ error: 'OG scraping failed' });
// }
// return res.json({
//   image: result.ogImage?.url || '',
//   title: result.ogTitle || 'Untitled',
//   description: result.ogDescription || '',
// });
//     // Handle relative URLs
//     const absoluteImage = ogImage ? resolveUrl(url, ogImage) : null;
//     // YouTube fallback
//     let finalImage = absoluteImage;
//     if (!finalImage && (url.includes('youtube.com') || url.includes('youtu.be'))) {
//       const videoId = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)?.[1];
//       if (videoId) {
//         finalImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//       }
//     }
//     res.json({ 
//       image: finalImage as string ,
//       title: ogTitle,
//       description: ogDescription
//     });
//   } catch (error) {
//     console.error('OG fetch error:', error);
//     // YouTube fallback
//     if (url.includes('youtube.com') || url.includes('youtu.be')) {
//       const videoId = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)?.[1];
//       if (videoId) {
//         return res.json({
//           image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
//           title: 'YouTube Video',
//           description: 'Watch on YouTube'
//         });
//       }
//     }
//     res.status(500).json({ error: 'Failed to fetch OG data' });
//   }
// });
// export default router;
// server/routes/og.ts
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
        // Special handling for Twitter
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
        // Special handling for LinkedIn
        if (url.includes('linkedin.com')) {
            return res.json({
                image: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', // LinkedIn logo
                title: 'LinkedIn Post',
                description: 'View on LinkedIn'
            });
        }
        // Special handling for Instagram
        if (url.includes('instagram.com')) {
            return res.json({
                image: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', // Instagram logo
                title: 'Instagram Post',
                description: 'View on Instagram'
            });
        }
        // Use open-graph-scraper
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
        // ✅ YouTube fallback
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
        // Fallback for YouTube
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
