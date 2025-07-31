
function getPublicIdFromCloudinaryUrl(url: string): string | null {
  try {
    if (!url.startsWith("http")) return url; // Already publicId

    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');
    const fileWithExtension = parts.pop();
    if (!fileWithExtension) return null;

    const folder = parts.slice(2).join('/'); // Skip /raw/upload
    return `${folder}/${fileWithExtension}`; // 🔥 Keep the extension
  } catch (e) {
    console.error('Error extracting Cloudinary public ID:', e);
    return null;
  }
}

 export {getPublicIdFromCloudinaryUrl}