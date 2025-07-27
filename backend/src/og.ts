// server/routes/og.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

// Helper to resolve relative URLs
const resolveUrl = (base: string, relative: string): string => {
  try {
    return new URL(relative, base).toString();
  } catch (e) {
    return relative;
  }
};

// Define response interface
interface OGApiResponse {
  image?: string;
  title?: string;
  description?: string;
  error?: string;
}

router.post('/', async (req: Request, res: Response<OGApiResponse>) => {
  const { url } = req.body;
  
  // Validate URL
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Special handling for Twitter
    if (url.includes('twitter.com') || url.includes('x.com')) {
      const tweetId = url.match(/status\/(\d+)/)?.[1];
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
  
    const response = await axios.get(url, {
        headers: {
    ...headers,
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
      timeout: 5000,
        //@ts-ignore
      maxRedirects: 5
    });

    // Parse HTML
    const $ = cheerio.load(response.data as string);
    
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
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)?.[1];
      if (videoId) {
        finalImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }

    res.json({ 
      image: finalImage as string ,
      title: ogTitle,
      description: ogDescription
    });
    
  } catch (error) {
    console.error('OG fetch error:', error);
    
    // YouTube fallback
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)?.[1];
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
});

export default router;