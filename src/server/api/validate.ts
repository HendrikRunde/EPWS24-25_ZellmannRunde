import { defineEventHandler, getQuery } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler((event) => {
    const query = getQuery(event);
    console.log("Empfangene Query-Parameter:", query);

    const { id, maxUploads, validity } = query;
    if (!id || !maxUploads || !validity) {
        console.error("Fehlende oder ungültige Parameter");
        return { isValid: false, remainingUploads: 0 };
    }

    // Bereits hochgeladene Dateien zählen
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const existingUploads = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir).length : 0;
    console.log("Bereits hochgeladene Dateien:", existingUploads);

    // Ablaufzeit berechnen
    const now = new Date();
    const localNow = new Date(now.getTime() + 3600000); // UTC+1
    const validityStr = String(validity);
    const durationMs = parseDuration(validityStr);
    const validUntil = new Date(localNow.getTime() + durationMs);
    console.log("Link gültig bis:", validUntil.toISOString());

    const isValid = localNow <= validUntil;
    let remainingUploads = parseInt(maxUploads as string, 10) - existingUploads;
    if (remainingUploads < 0) remainingUploads = 0;

    console.log("Validierungsergebnis:", { isValid, remainingUploads });
    return { isValid, remainingUploads };
});

function parseDuration(duration: string): number {
    const match = duration.match(/(\d+)([smhd])/);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60000;
        case 'h': return value * 3600000;
        case 'd': return value * 86400000;
        default: return 0;
    }
}
