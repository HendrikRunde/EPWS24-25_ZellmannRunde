import { defineEventHandler, readBody } from "h3";
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, update } from "firebase/database";
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface UserStats {
  userId: string;
  videos: number;
  photos: number;
  music: number;
  used: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<UserStats>(event);
  const { userId, videos, photos, music, used } = body;

  if (!userId) {
    return {
      success: false,
      error: "User ID is missing",
    };
  }

  try {
    const userRef = dbRef(db, `users/${userId}`);
    await update(userRef, { videos, photos, music, used });

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
