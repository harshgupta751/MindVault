// // server/routes/upload.ts
// import express from 'express';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../utils/cloudinary';

// const router = express.Router();

// // ✅ setup CloudinaryStorage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: 'mindvault-documents',
//     resource_type: 'raw', // <- force raw here
//     public_id: file.originalname.split('.')[0], // optional: keep original filename
//   }),
// });


// const upload = multer({ storage });

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const fileData = req.file;

//     // Log everything from multer + Cloudinary
//     console.log('Uploaded file data:', fileData);

//     const rawUrl = fileData?.path?.replace('/image/', '/raw/'); // fallback if needed
//     //@ts-ignore
//     const secureUrl = fileData?.secure_url || rawUrl;

//     res.json({ url: secureUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });


// export default router;


// server/routes/upload.ts
// import express from 'express';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../utils/cloudinary';

// const router = express.Router();

// // ✅ Setup CloudinaryStorage with raw type
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: 'mindvault-documents',
//     resource_type: 'raw', // Force raw for documents
//     public_id: file.originalname.split('.')[0], // Optional: keep original filename
//   }),
// });

// const upload = multer({ storage });

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const fileData = req.file;

//     // ✅ safest way to return URL is using 'secure_url'
//     // raw files go to /raw/upload/... path by default if uploaded as 'resource_type: raw'
//     //@ts-ignore
//     const secureUrl = fileData?.path || fileData?.secure_url;

//     if (!secureUrl) {
//       return res.status(500).json({ error: 'Upload succeeded but no file URL found' });
//     }

//     res.json({ url: secureUrl });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

// export default router;
// very final
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
