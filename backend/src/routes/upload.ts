import express from 'express';
import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname); // .pdf, .docx
    const name = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9-_]/g, '-');

    return {
      folder: 'mindvault-documents',
      resource_type: 'raw',
      // public_id: `${name}${ext}`, // keep extension
     public_id: `${name}${ext}`, // ✅ This includes .pdf or .docx

    };
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileUrl = req.file?.path;      
    const publicId = req.file?.filename; 

    if (!fileUrl || !publicId) {
      return res.status(400).json({ error: 'Missing file data' });
    }

    res.json({ url: fileUrl, publicId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});


export default router;
