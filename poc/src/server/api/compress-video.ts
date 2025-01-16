import { defineEventHandler } from 'h3';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

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
  const uploadDir = path.join(process.cwd(), 'uploads'); // Verzeichnis in dem serverseitig komprimierte Videodateien abgelegt werden

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({ uploadDir, keepExtensions: true });

  return new Promise<CompressResponse>((resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable Parse Error:', err);
        resolve({
          success: false,
          error: err.message,
        });
        return;
      }

      const fileArray = files.video as formidable.File[];
      if (!fileArray || fileArray.length === 0) {
        console.error('No video file found');
        resolve({
          success: false,
          error: 'No video file found',
        });
        return;
      }

      const file = fileArray[0] as formidable.File;
      console.log('File received:', file);

      const videoPath = file.filepath;
      const outputFormat = 'mp4';
      const outputPath = path.join(uploadDir, `${path.parse(videoPath).name}_compressed.${outputFormat}`);

      const originalSize = fs.statSync(videoPath).size;
      const startTime = Date.now();

      try {
        ffmpeg(videoPath) // Komprimierung einer Videodatei (ffmpeg Bibliothek für Videodateien)
          .outputOptions([
            '-c:v libx264',
            '-preset faster',  // Ändere dies je nach gewünschter Geschwindigkeit/Qualität, je schneller desto weniger komprimiert: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow.
            '-crf 23'        // Ändere dies je nach gewünschter Qualität (z.B. 18-28)
          ])
          .save(outputPath)
          .on('end', () => {
            const endTime = Date.now();
            const compressedSize = fs.statSync(outputPath).size;
            const ratio = ((originalSize - compressedSize) / originalSize) * 100;
            const timeTaken = endTime - startTime;

            console.log('Video compressed successfully:', outputPath);
            console.log(`Original Size: ${originalSize} bytes`);
            console.log(`Compressed Size: ${compressedSize} bytes`);
            console.log(`Compression Ratio: ${ratio.toFixed(2)}%`);
            console.log(`Time Taken: ${timeTaken}ms`);

            resolve({
              success: true,
              outputPath,
              originalSize,
              compressedSize,
              ratio,
              timeTaken,
            });
          })
          .on('error', (err) => {
            console.error('FFmpeg Error:', err);
            resolve({
              success: false,
              error: err.message,
            });
          });
      } catch (error) {
        console.error('FFmpeg Error:', error);
        resolve({
          success: false,
          error: (error as Error).message,
        });
      }
    });
  });
});
