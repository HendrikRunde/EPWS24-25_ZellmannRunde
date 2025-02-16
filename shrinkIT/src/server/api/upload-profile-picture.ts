// filepath: /C:/DevProjects/test/nuxt/shrinkIT/server/api/upload-profile-picture.ts
import { defineEventHandler, readMultipartFormData } from "h3";
import { promises as fs } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const generateGUID = () => {
  return uuidv4();
};

export default defineEventHandler(async (event) => {
  console.log("Received event:", event);
  const form = await readMultipartFormData(event);

  if (!form) {
    console.error("No form data received");
    return { success: false, error: "No file uploaded" };
  }

  console.log("Form data received:", form);
  const file = form.find((field) => field.name === "profilePicture");

  if (!file) {
    console.error("Profile picture not found in form data");
    return { success: false, error: "Profile picture not found" };
  }

  console.log("Profile picture file details:", file);

  const fileExtension = file.filename ? file.filename.split(".").pop() : "";
  const newFileName = `${generateGUID()}.${fileExtension}`;
  const filePath = join(process.cwd(), "public/assets/img/user", newFileName);

  console.log("Generated file path:", filePath);

  try {
    await fs.writeFile(filePath, file.data);
    console.log("Profile picture saved at:", filePath);
    return { success: true, filePath: `/assets/img/user/${newFileName}` };
  } catch (error) {
    console.error("Error saving profile picture", error);
    return { success: false, error: (error as Error).message };
  }
});
