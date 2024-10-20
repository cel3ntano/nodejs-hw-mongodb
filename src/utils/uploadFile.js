import saveFileLocally from './saveFileLocally.js';
import saveFileToCloudinary from './saveFileToCloudinary.js';
import env from './env.js';

const isCloudinaryEnabled = env('ENABLE_CLOUDINARY') === 'true';

export const uploadImage = async (file, folder, existingPhoto) => {
  if (!file) return existingPhoto;

  if (isCloudinaryEnabled) {
    return await saveFileToCloudinary(file, folder);
  } else {
    return await saveFileLocally(file);
  }
};

export default uploadImage;
