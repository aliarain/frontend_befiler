import { post } from './backend_helper';

export const uploadToVercelStorage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await post('/api/upload', formData);
    return response.url;
  } catch (error) {
    console.error('Error uploading to Vercel Storage:', error);
    throw error;
  }
};

export const uploadMultipleToVercelStorage = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadToVercelStorage(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple files to Vercel Storage:', error);
    throw error;
  }
}; 