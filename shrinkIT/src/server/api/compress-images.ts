import { defineEventHandler } from 'h3';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface CompressResponse { 
  success: boolean;
  outputPath?: string;
  originalSize?: number;
  compressedSize?: number;
  ratio?: number;
  timeTaken?: number;
  error?: string;
}

export default defineEventHandler(async (event) => {
  const uploadDir = path.join(process.cwd(), 'uploads'); // Verzeichnis in dem serverseitig komprimierte Bilddateien abgelegt werden

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({ uploadDir, keepExtensions: true });

  return new Promise<CompressResponse[]>((resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable Parse Error:', err);
        resolve([{
          success: false,
          error: err.message,
        }]);
        return;
      }

      const fileArray = Array.isArray(files.image) ? files.image : [files.image];
      if (!fileArray || fileArray.length === 0) {
        console.error('No image file found');
        resolve([{
          success: false,
          error: 'No image file found',
        }]);
        return;
      }

      const responses: CompressResponse[] = await Promise.all(fileArray.map(async (file) => {
        if (!file) {
          return {
            success: false,
            error: 'File is undefined',
          };
        }

        const imagePath = file.filepath;
        const fileExtension = path.extname(imagePath).toLowerCase();
        let outputFormat: 'jpeg' | 'png';
        const quality = 80; // Qualitätsrate 80%

        if (fileExtension === '.png') {
          outputFormat = 'png';
        } else if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
          outputFormat = 'jpeg';
        } else {
          console.error('Unsupported file format');
          return {
            success: false,
            error: 'Unsupported file format',
          };
        }

        const outputPath = path.join(uploadDir, `${path.parse(imagePath).name}_compressed.${outputFormat}`);
        const originalSize = fs.statSync(imagePath).size;
        const startTime = Date.now();

        try {
          const image = sharp(imagePath).resize(800); // Komprimierung einer Bilddatei (sharp Bibliothek für Bilddateien)
          
          if (outputFormat === 'jpeg') {
            await image.toFormat(outputFormat, { quality }).toFile(outputPath);
          } else if (outputFormat === 'png') {
            await image.toFormat(outputFormat, { compressionLevel: 9 }).toFile(outputPath);
          }

          const endTime = Date.now();
          const compressedSize = fs.statSync(outputPath).size;
          const ratio = ((originalSize - compressedSize) / originalSize) * 100;
          const timeTaken = endTime - startTime;

          console.log('Image compressed successfully:', outputPath);

          return {
            success: true,
            outputPath,
            originalSize,
            compressedSize,
            ratio,
            timeTaken,
          };
        } catch (error) {
          console.error('Sharp Error:', error);
          return {
            success: false,
            error: (error as Error).message,
          };
        }
      }));

      resolve(responses);
    });
  });
});
