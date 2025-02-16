import { defineEventHandler, getQuery } from "h3";
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, get, child } from "firebase/database";
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

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = query.userId;

  if (!userId) {
    return {
      success: false,
      error: "User ID is missing",
    };
  }

  try {
    const userUploadsRef = dbRef(db, `uploads/${userId}`);
    const snapshot = await get(child(userUploadsRef, "/"));

    if (!snapshot.exists()) {
      return {
        success: false,
        error: "No compressed files found for this user",
      };
    }

    const files = snapshot.val();
    return {
      success: true,
      files,
    };
  } catch (error) {
    console.error("Firebase Error:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
});
