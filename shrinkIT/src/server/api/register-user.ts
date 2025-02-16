// filepath: /C:/DevProjects/test/nuxt/shrinkIT/server/api/register-user.ts
import { defineEventHandler, readBody } from "h3";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";
import bcrypt from "bcryptjs";
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
const database = getDatabase(app);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    email,
    firstname,
    lastname,
    profession,
    company,
    password,
    link,
    validUntil,
    profilePicture,
    used,
    videos,
    photos,
    audios,
    background,
  } = body;

  try {
    const userId = email.replace(/[.#$[\]]/g, "_"); // Firebase keys cannot contain special chars [.#$[\]
    const userRef = ref(database, "users/" + userId);
    const snapshot = await get(child(ref(database), `users/${userId}`));

    if (snapshot.exists()) {
      return {
        success: false,
        error: "Benutzer mit dieser E-Mail existiert bereits.",
      };
    }

    // Get the system configuration
    const systemConfigSnapshot = await get(
      child(ref(database), `systemConfig`)
    );
    if (!systemConfigSnapshot.exists()) {
      return {
        success: false,
        error: "Systemkonfiguration nicht gefunden.",
      };
    }
    const systemConfig = systemConfigSnapshot.val();
    const volume = systemConfig.maxVolume;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the current date and time
    const createdAt = new Date().toISOString();

    await set(userRef, {
      firstname,
      lastname,
      email,
      profession,
      company,
      password: hashedPassword,
      link,
      validUntil,
      profilePicture,
      volume,
      used,
      videos,
      photos,
      audios,
      background,
      createdAt, // Add the createdAt field
    });
    return { success: true };
  } catch (error) {
    console.error("Error registering user", error);
    return { success: false, error: (error as Error).message };
  }
});
