import express, { Request, Response } from 'express';
import ogs from 'open-graph-scraper';

const router = express.Router();

interface OGApiResponse {
  image?: string;
  title?: string;
  description?: string;
  error?: string;
}

router.post('/', async (req: Request, res: Response<OGApiResponse>) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    if (url.includes('twitter.com') || url.includes('x.com')) {
      const tweetId = url.match(/status\/(\d+)/)?.[1];
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

    const { error, result } = await ogs(options);

    if (error || !result.success) {
      console.error('OG scraping failed:', error);
      throw new Error('OG scraping failed');
    }
//@ts-ignore
    const ogImage = result.ogImage?.url;
    const ogTitle = result.ogTitle;
    const ogDescription = result.ogDescription;

    if (!ogImage && (url.includes('youtube.com') || url.includes('youtu.be'))) {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)?.[1];
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

  } catch (error) {
    console.error('OG fetch error:', error);

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/)?.[1];
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
});

export default router;
