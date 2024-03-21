// src>app>api>report>image>route.js
import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';

cloudinary.config({
  cloud_name: 'dfgvcib7o',
  api_key: '982149576696869',
  api_secret: '9aKxJkYi0OlmfRCt5SDg0z6cEgs'
});

export async function POST(req, res) {
  try {
    const form = new IncomingForm();
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = data.files.file;
    const uploadedResponse = await cloudinary.uploader.upload(file.path, { upload_preset: 'report' });

    if (uploadedResponse) {
      res.status(200).json({ message: "Image Uploaded", url: uploadedResponse.url });
    } else {
      res.status(500).json({ message: "Image Upload Failed" });
    }
  } catch (error) {
    console.error(error); // This will print the error message to your server console
    res.status(500).json({ message: 'An error occurred on the server' });
  }
}