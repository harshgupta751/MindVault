import express from 'express';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

router.get('/document-proxy', async (req, res) => {
  const { publicId } = req.query;

  if (!publicId || typeof publicId !== 'string') {
    return res.status(400).send('Missing publicId');
  }

  try {
    const signedUrl = cloudinary.url(publicId, {
      type: 'upload', // ❗ Try switching this to 'upload' or 'raw' depending on actual file type
      resource_type: 'raw',
      sign_url: true,
      secure: true,
    });

    const headResponse = await axios.head(signedUrl);

    const contentType = headResponse.headers['content-type'] || 'application/octet-stream';
    const isPDF = contentType.includes('pdf');
    const filename = publicId.split('/').pop() || 'document';

    const fileResponse = await axios.get(signedUrl, { responseType: 'stream' });

    res.setHeader('Content-Type', contentType);
    res.setHeader(
      'Content-Disposition',
      `${isPDF ? 'inline' : 'attachment'}; filename="${filename}"`
    );
//@ts-ignore
    fileResponse.data.pipe(res);
  } catch (err: any) {
    console.error('Proxy error:', err?.response?.data || err?.message || err);
    res.status(500).send('Failed to fetch or serve document');
  }
});

export default router;
