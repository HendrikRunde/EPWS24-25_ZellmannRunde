import { defineEventHandler } from "h3";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

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
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "systemConfig"));

    if (snapshot.exists()) {
      return {
        success: true,
        config: snapshot.val(),
      };
    } else {
      return {
        success: false,
        error: "No configuration found.",
      };
    }
  } catch (error) {
    console.error("Error fetching configuration", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
});
