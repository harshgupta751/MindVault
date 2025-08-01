"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicIdFromCloudinaryUrl = getPublicIdFromCloudinaryUrl;
function getPublicIdFromCloudinaryUrl(url) {
    try {
        if (!url.startsWith("http"))
            return url;
        const urlObj = new URL(url);
        const parts = urlObj.pathname.split('/');
        const fileWithExtension = parts.pop();
        if (!fileWithExtension)
            return null;
        const folder = parts.slice(2).join('/');
        return `${folder}/${fileWithExtension}`;
    }
    catch (e) {
        console.error('Error extracting Cloudinary public ID:', e);
        return null;
    }
}
