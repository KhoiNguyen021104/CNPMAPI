import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '~/config/environment';

const uploadImgCloudinary = async (imageSrc, folder) => {
  cloudinary.config({
    cloud_name: 'dbyuzvqz8',
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(imageSrc, {
      folder: folder,
      quality: 'auto:good',
      fetch_format: 'auto', 
      transformation: [
        {
          quality: '100',
          fetch_format: 'auto',
          crop: 'fill',
          gravity: 'auto',
        },
      ],
    });

    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        {
          fetch_format: 'auto',
          quality: 'auto:good',
        },
      ],
    });

    return optimizeUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

export const cloudinaryProvider = {
  uploadImgCloudinary,
};
