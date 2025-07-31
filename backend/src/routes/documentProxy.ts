// correct- 
// import express from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

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

import express from 'express';
import axios from 'axios';
import { Readable } from 'stream';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/document-proxy', async (req, res) => {
  const { publicId } = req.query;

  if (!publicId || typeof publicId !== 'string') {
    return res.status(400).send('Missing document publicId');
  }

  const decodedPublicId = decodeURIComponent(publicId);
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const documentUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${decodedPublicId}`;
  console.log('Proxying from:', documentUrl);

  try {
    const response = await axios.get(documentUrl, {
      responseType: 'stream',
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${decodedPublicId.split('/').pop()}"`
    );

    // @ts-ignore
    response.data.pipe(res);
  } catch (err: any) {
    console.error('[Document Proxy Error]', err?.message || err);
    res.status(500).send('Failed to fetch or serve document');
  }
});

export default router;
