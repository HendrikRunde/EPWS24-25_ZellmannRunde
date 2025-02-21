import { defineEventHandler, getQuery } from 'h3';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import mime from 'mime-types';
import ffmpeg from 'fluent-ffmpeg';

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
    console.log("compress.ts wurde aufgerufen!");

    // 🚀 1️⃣ URL-Analyse: Mehrere Methoden zur Parameterextraktion
    console.log("Request URL:", event.node.req.url);

    // ✅ Methode 1: Nuxt-Standard über getQuery
    const queryFromGetQuery = getQuery(event);
    console.log("Query (getQuery):", queryFromGetQuery);

    // ✅ Methode 2: URLSearchParams
    const reqUrl = event.node.req.url || '';
    const parsedUrl = new URL(reqUrl, `http://${event.node.req.headers.host}`);
    const queryFromURL = Object.fromEntries(parsedUrl.searchParams.entries());
    console.log("Query (URLSearchParams):", queryFromURL);

    // ✅ Methode 3: Fallback (manuelles Parsen)
    const fallbackQuery = Object.fromEntries(new URLSearchParams(reqUrl.split('?')[1]));
    console.log("Query (Fallback):", fallbackQuery);

    // 🟡 2️⃣ Priorisierte Parameter-Auswahl
    const qualityParam = queryFromGetQuery.quality?.toString() ||
        queryFromURL.quality?.toString() ||
        fallbackQuery.quality?.toString() ||
        'medium';

    const resizeParam = queryFromGetQuery.resize?.toString() ||
        queryFromURL.resize?.toString() ||
        fallbackQuery.resize?.toString() ||
        null;

    console.log("Finale Quality-Param:", qualityParam);
    console.log("Finale Resize-Param:", resizeParam);

    // Upload-Ordner vorbereiten
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const form = formidable({ uploadDir, keepExtensions: true });

    return new Promise<CompressResponse[]>((resolve) => {
        form.parse(event.node.req, async (err, fields, files) => {
            if (err) {
                console.error(' Formidable Parse Error:', err);
                resolve([{ success: false, error: err.message }]);
                return;
            }

            console.log("Empfangene Dateien:", files);
            console.log("Empfangene Felder (Form):", fields);

            const fileArray = Array.isArray(files.file) ? files.file : [files.file];
            if (!fileArray || fileArray.length === 0) {
                console.error('⚠No file found');
                resolve([{ success: false, error: 'No file found' }]);
                return;
            }

            // Quality-Berechnung
            let quality = 80; // Standard: Medium
            if (qualityParam === 'low') quality = 50;
            if (qualityParam === 'high') quality = 95;

            // Resize-Berechnung
            let resizeOptions: { width?: number; height?: number } = {};
            if (resizeParam) {
                const [width, height] = resizeParam.split('x').map(Number);
                if (!isNaN(width) && width > 0) resizeOptions.width = width;
                if (!isNaN(height) && height > 0) resizeOptions.height = height;
            }

            console.log("Finaler Quality-Wert:", quality);
            console.log("Verarbeitete Resize-Werte:", resizeOptions);

            const responses: CompressResponse[] = await Promise.all(fileArray.map(async (file) => {
                if (!file) return { success: false, error: 'File is undefined' };

                const filePath = file.filepath;
                let mimeType = mime.lookup(filePath) || '';
                console.log(`Datei erkannt: ${filePath}, Typ: ${mimeType}`);

                // **Bildverarbeitung**
                if (mimeType.startsWith('image/')) {
                    const outputFormat = mimeType.includes('png') ? 'png' : 'jpeg';
                    const outputPath = path.join(uploadDir, `${path.parse(filePath).name}_compressed.${outputFormat}`);
                    const originalSize = fs.statSync(filePath).size;
                    const startTime = Date.now();

                    try {
                        let image = sharp(filePath);
                        console.log("Resize gestartet mit:", resizeOptions);
                        if (resizeOptions.width || resizeOptions.height) {
                            image = image.resize(resizeOptions);
                            console.log("Resize erfolgreich ausgeführt");
                        }

                        console.log(`Übergabewerte an sharp - Quality: ${quality}, Format: ${outputFormat}`);
                        image = image.withMetadata();
                        await image.toFormat(outputFormat, { quality }).toFile(outputPath);

                        const endTime = Date.now();
                        const compressedSize = fs.statSync(outputPath).size;

                        console.log(`Komprimiertes Bild erstellt: ${outputPath}`);
                        console.log(`Komprimierte Bildgröße: ${compressedSize} Bytes`);
                        console.log(`Kompressionsverhältnis: ${((originalSize - compressedSize) / originalSize * 100).toFixed(2)}%`);
                        console.log(`Dauer der Komprimierung: ${endTime - startTime} ms`);

                        return {
                            success: true,
                            outputPath,
                            originalSize,
                            compressedSize,
                            ratio: ((originalSize - compressedSize) / originalSize) * 100,
                            timeTaken: endTime - startTime
                        };
                    } catch (error) {
                        console.error("Fehler bei der Bildkomprimierung:", (error as Error).message);
                        return { success: false, error: (error as Error).message };
                    }
                }


                // **Videokomprimierung**
                if (mimeType.startsWith('video/')) {
                    const outputPath = path.join(uploadDir, `${path.parse(filePath).name}_compressed.mp4`);
                    const originalSize = fs.statSync(filePath).size;
                    const startTime = Date.now();
                    const crf = quality === 50 ? 30 : quality === 80 ? 23 : 18;
                    const fps = 30;
                    const bitrate = quality === 50 ? '1000k' : quality === 80 ? '2000k' : '4000k';

                    return new Promise<CompressResponse>((resolve) => {
                        ffmpeg(filePath)
                            .output(outputPath)
                            .videoCodec('libx264')
                            .audioCodec('aac')
                            .outputOptions([
                                `-crf ${crf}`,
                                `-b:v ${bitrate}`,
                                `-r ${fps}`,
                                '-preset slow',
                                '-movflags faststart'
                            ])
                            .on('end', () => {
                                const endTime = Date.now();
                                const compressedSize = fs.statSync(outputPath).size;
                                console.log("Komprimierungs-Ergebnis (Video):", { originalSize, compressedSize, ratio: ((originalSize - compressedSize) / originalSize) * 100 });

                                resolve({ success: true, outputPath, originalSize, compressedSize, ratio: ((originalSize - compressedSize) / originalSize) * 100, timeTaken: endTime - startTime });
                            })
                            .on('error', (error) => {
                                console.error("Fehler bei der Videokomprimierung:", error);
                                resolve({ success: false, error: error.message });
                            })
                            .run();
                    });
                }

                // **Audiokomprimierung**
                if (mimeType.startsWith('audio/')) {
                    const outputPath = path.join(uploadDir, `${path.parse(filePath).name}_compressed.mp3`);
                    const originalSize = fs.statSync(filePath).size;
                    const startTime = Date.now();
                    const bitrate = quality === 50 ? '96k' : quality === 80 ? '128k' : '192k';

                    return new Promise<CompressResponse>((resolve) => {
                        ffmpeg(filePath)
                            .output(outputPath)
                            .audioCodec('libmp3lame')
                            .audioBitrate(bitrate)
                            .on('end', () => {
                                const endTime = Date.now();
                                const compressedSize = fs.statSync(outputPath).size;
                                console.log("Komprimierungs-Ergebnis (Audio):", { originalSize, compressedSize, ratio: ((originalSize - compressedSize) / originalSize) * 100 });

                                resolve({ success: true, outputPath, originalSize, compressedSize, ratio: ((originalSize - compressedSize) / originalSize) * 100, timeTaken: endTime - startTime });
                            })
                            .on('error', (error) => {
                                console.error("Fehler bei der Audiokomprimierung:", error);
                                resolve({ success: false, error: error.message });
                            })
                            .run();
                    });
                }

                return { success: false, error: `Unsupported file type: ${mimeType}` };
            }));

            console.log("API Antwort:", responses);
            resolve(responses);
        });
    });
});
