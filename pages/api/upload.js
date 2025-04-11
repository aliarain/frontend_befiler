import { createClient } from '@vercel/storage';
import formidable from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    const file = files.file[0];

    // Create Vercel Storage client
    const storage = createClient({
      token: process.env.VERCEL_STORAGE_TOKEN,
    });

    // Read the file
    const fileBuffer = await fs.readFile(file.filepath);
    
    // Upload to Vercel Storage
    const { url } = await storage.upload({
      name: file.originalFilename,
      data: fileBuffer,
    });

    // Clean up the temporary file
    await fs.unlink(file.filepath);

    return res.status(200).json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
} 