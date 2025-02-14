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
  const uploadDir = path.join(process.cwd(), 'uploads');

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

      const fileList = Array.isArray(files.audio) ? files.audio : [files.audio]; // Anpassung hier
      if (!fileList || fileList.length === 0) {
        console.error('No audio files found');
        resolve([{
          success: false,
          error: 'No audio files found',
        }]);
        return;
      }

      const results: CompressResponse[] = [];

      for (const file of fileList) {
        if (!file) continue; // Ignoriere ungültige Einträge

        const audioPath = file.filepath;
        const outputFormat = 'mp3';
        const outputPath = path.join(uploadDir, `${path.parse(audioPath).name}_compressed.${outputFormat}`);

        const originalSize = fs.statSync(audioPath).size;
        const startTime = Date.now();

        try {
          await new Promise<void>((res, rej) => {
            ffmpeg(audioPath)
              .outputOptions([
                '-c:a libmp3lame',
                '-b:a 128k', // Bitrate anpassen je nach gewünschter Qualität
              ])
              .save(outputPath)
              .on('end', () => {
                const endTime = Date.now();
                const compressedSize = fs.statSync(outputPath).size;
                const ratio = ((originalSize - compressedSize) / originalSize) * 100;
                const timeTaken = endTime - startTime;

                console.log('Audio compressed successfully:', audioPath);
                console.log(`Original Size: ${originalSize} bytes`);
                console.log(`Compressed Size: ${compressedSize} bytes`);
                console.log(`Compression Ratio: ${ratio.toFixed(2)}%`);
                console.log(`Time Taken: ${timeTaken}ms`);

                results.push({
                  success: true,
                  outputPath,
                  originalSize,
                  compressedSize,
                  ratio,
                  timeTaken,
                });

                res();
              })
              .on('error', (err) => {
                console.error('FFmpeg Error:', err);
                results.push({
                  success: false,
                  error: err.message,
                });

                res(); // resolve to continue with next files
              });
          });
        } catch (error) {
          console.error('FFmpeg Error:', error);
          results.push({
            success: false,
            error: (error as Error).message,
          });
        }
      }

      resolve(results);
    });
  });
});
