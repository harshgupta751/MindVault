// server/routes/upload.ts
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const router = express.Router();

// ✅ setup CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mindvault-documents',
    resource_type: 'auto',
  } as any,
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    //@ts-ignore
    const fileUrl = req.file.path;
    res.json({ url: fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;
