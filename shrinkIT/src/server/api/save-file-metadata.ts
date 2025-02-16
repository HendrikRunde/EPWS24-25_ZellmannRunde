import { defineEventHandler, readBody } from "h3";
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface FileMetadata {
  filename: string;
  path: string;
  size: number;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  quality: number;
  dateCreated: string;
  directLink: string;
  userId: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<FileMetadata>(event);
  const {
    filename,
    path,
    size,
    originalSize,
    compressedSize,
    compressionRatio,
    quality,
    dateCreated,
    directLink,
    userId,
  } = body;

  if (!filename || !path || !userId || !directLink) {
    return {
      success: false,
      error: "Missing required fields",
    };
  }

  try {
    const fileRef = dbRef(db, `uploads/${userId}/${directLink}`);
    await set(fileRef, {
      filename,
      path,
      size,
      originalSize,
      compressedSize,
      compressionRatio,
      quality,
      dateCreated,
      directLink,
      userId,
    });

    // console.log("File metadata saved:", {
    //   filename,
    //   path,
    //   size,
    //   originalSize,
    //   compressedSize,
    //   compressionRatio,
    //   quality,
    //   dateCreated,
    //   directLink,
    //   userId,
    // });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Firebase Error:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
});
