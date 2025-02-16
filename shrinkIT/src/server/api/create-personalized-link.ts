import { defineEventHandler, readBody } from "h3";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
import { randomBytes } from "crypto";

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
const database = getDatabase(app);

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += characters[bytes[i] % characters.length];
  }
  return result;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userId = body.userId;

    if (!userId) {
      throw new Error("userId is required");
    }

    const link = generateRandomString(32);
    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + 3);

    const userRef = ref(database, `users/${userId}`);

    await update(userRef, {
      link,
      validUntil: validUntil.toISOString().split("T")[0],
    });

    return {
      success: true,
      link,
      validUntil: validUntil.toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Fehler beim Erstellen des personalisierten Links:", error);
    return { success: false, error: (error as Error).message };
  }
});
