"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicIdFromCloudinaryUrl = getPublicIdFromCloudinaryUrl;
// function getPublicIdFromCloudinaryUrl(url: string): string | null {
//   try {
//     const urlObj = new URL(url);
//     const parts = urlObj.pathname.split('/');
//     const fileWithExtension = parts.pop();
//     if (!fileWithExtension) return null;
//     const publicId = fileWithExtension.split('.')[0]; // remove `.pdf` or `.docx`
//     const folder = parts.slice(2).join('/'); // ignore '/raw/upload'
//     return `${folder}/${publicId}`;
//   } catch (e) {
//     console.error('Failed to parse Cloudinary public ID:', e);
//     return null;
//   }
// }
function getPublicIdFromCloudinaryUrl(url) {
    try {
        if (!url.startsWith("http"))
            return url; // Already publicId
        const urlObj = new URL(url);
        const parts = urlObj.pathname.split('/');
        const fileWithExtension = parts.pop();
        if (!fileWithExtension)
            return null;
        const folder = parts.slice(2).join('/'); // Skip /raw/upload
        return `${folder}/${fileWithExtension}`; // 🔥 Keep the extension
    }
    catch (e) {
        console.error('Error extracting Cloudinary public ID:', e);
        return null;
    }
}
