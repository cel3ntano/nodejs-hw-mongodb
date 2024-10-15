import saveFileLocally from './saveFileLocally.js';
import saveFileToCloudinary from './saveFileToCloudinary.js';
import env from './env.js';

const isCloudinaryEnabled = env('ENABLE_CLOUDINARY');

export const uploadImage = async (file, folder) => {
  if (!file) return null;
  if (isCloudinaryEnabled === 'true') {
    return await saveFileToCloudinary(file, folder);
  } else {
    return await saveFileLocally(file);
  }
};

export default uploadImage;
