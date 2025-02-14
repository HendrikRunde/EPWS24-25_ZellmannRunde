// filepath: /C:/DevProjects/test/nuxt/shrinkIT/server/api/upload-profile-picture.ts
import { defineEventHandler, readMultipartFormData } from "h3";
import { promises as fs } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const generateGUID = () => {
  return uuidv4();
};

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form) {
    return { success: false, error: "No file uploaded" };
  }

  const file = form.find((field) => field.name === "profilePicture");

  if (!file) {
    return { success: false, error: "Profile picture not found" };
  }

  const fileExtension = file.filename ? file.filename.split(".").pop() : "";
  const newFileName = `${generateGUID()}.${fileExtension}`;
  const filePath = join(process.cwd(), "public/assets/img/user", newFileName);

  try {
    await fs.writeFile(filePath, file.data);
    return { success: true, filePath: `/assets/img/user/${newFileName}` };
  } catch (error) {
    console.error("Error saving file", error);
    return { success: false, error: (error as Error).message };
  }
});
