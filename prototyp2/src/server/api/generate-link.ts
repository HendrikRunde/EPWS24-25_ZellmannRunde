import { defineEventHandler, readBody } from "h3";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { maxUploads, validity, quality, resize } = body;

    if (!maxUploads || !validity || !quality) {
        return {
            success: false,
            message: "Missing required parameters: maxUploads, validity, or quality.",
        };
    }

    const uniqueId = uuidv4();
    let generatedLink = `http://localhost:3000/upload/${uniqueId}?maxUploads=${maxUploads}&validity=${validity}&quality=${quality}`;

    if (resize) {
        generatedLink += `&resize=${resize}`;
    }

    console.log("Generated Link:", generatedLink);

    return {
        success: true,
        link: generatedLink,
    };
});

