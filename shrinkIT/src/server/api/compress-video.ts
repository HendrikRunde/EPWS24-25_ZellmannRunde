import { defineEventHandler } from "h3";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

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
  const form = formidable({ keepExtensions: true });

  return new Promise<CompressResponse>(async (resolve, reject) => {
    form.parse(event.node.req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable Parse Error:", err);
        resolve({
          success: false,
          error: err.message,
        });
        return;
      }

      const userId = Array.isArray(fields.userId)
        ? fields.userId[0]
        : fields.userId;
      if (!userId) {
        resolve({
          success: false,
          error: "User ID is missing",
        });
        return;
      }
      const uploadDir = path.join(
        process.cwd(),
        "public/assets/uploads",
        userId
      );

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileArray = files.video as formidable.File[];
      if (!fileArray || fileArray.length === 0) {
        console.error("No video file found");
        resolve({
          success: false,
          error: "No video file found",
        });
        return;
      }

      const file = fileArray[0] as formidable.File;
      console.log("File received:", file);

      const videoPath = file.filepath;
      const originalFilename = file.originalFilename || "default";
      const outputFormat = "mp4";
      const outputPath = path.join(
        uploadDir,
        `${path.parse(originalFilename).name}_compressed.${outputFormat}`
      );

      const originalSize = fs.statSync(videoPath).size;
      const startTime = Date.now();

      try {
        const videoQuality = Number(fields.videoQuality) || 50;
        let crfValue;
        //Videoqualität in CRF umwandeln (Constant Rate Factor, 0-51)
        if (videoQuality >= 90) {
          crfValue = 23;
        } else if (videoQuality >= 80) {
          crfValue = 28;
        } else if (videoQuality >= 70) {
          crfValue = 30;
        } else if (videoQuality >= 60) {
          crfValue = 40;
        } else {
          crfValue = Math.round(((100 - videoQuality) * 51) / 100); 
        }

        console.log("Compressing video... crfValue:", crfValue);

        ffmpeg(videoPath)
          .outputOptions([
            "-c:v libx264",
            `-crf ${crfValue}`,
            "-preset slow", // Langsamer Modus für bessere Komprimierung verwenden
            "-movflags +faststart", 
          ])
          .save(outputPath)
          .on("end", () => {
            const endTime = Date.now();
            const compressedSize = fs.statSync(outputPath).size;
            const ratio =
              ((originalSize - compressedSize) / originalSize) * 100;
            const timeTaken = endTime - startTime;

            console.log("Video compressed successfully:", outputPath);
            console.log(`Original Size: ${originalSize} bytes`);
            console.log(`Compressed Size: ${compressedSize} bytes`);
            console.log(`Compression Ratio: ${ratio.toFixed(2)}%`);
            console.log(`Time Taken: ${timeTaken}ms`);

            resolve({
              success: true,
              outputPath: path.relative(process.cwd(), outputPath),
              originalSize,
              compressedSize,
              ratio,
              timeTaken,
            });
          })
          .on("error", (err) => {
            console.error("FFmpeg Error:", err);
            resolve({
              success: false,
              error: err.message,
            });
          });
      } catch (error) {
        console.error("FFmpeg Error:", error);
        resolve({
          success: false,
          error: (error as Error).message,
        });
      }
    });
  });
});
