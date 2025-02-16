import { defineEventHandler, getQuery, createError } from "h3";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref as dbRef,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
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
  const queryParameters = getQuery(event);
  const directLink = queryParameters.directLink as string;

  if (!directLink) {
    console.error("Direct link is missing");
    throw createError({
      statusCode: 400,
      statusMessage: "Direct link is missing",
    });
  }

  try {
    console.log("Querying for direct link:", directLink);
    const usersRef = dbRef(db, "uploads");
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      console.error("No users found in uploads");
      return undefined;
    }

    let filePath: string | undefined = undefined;
    for (const [userId, userFiles] of Object.entries(usersSnapshot.val())) {
      console.log(`Checking files for user: ${userId}`);
      const userFilesRef = dbRef(db, `uploads/${userId}`);
      const filesQuery = query(
        userFilesRef,
        orderByChild("directLink"),
        equalTo(directLink)
      );

      const filesSnapshot = await get(filesQuery);
      if (filesSnapshot.exists()) {
        const file = Object.values(filesSnapshot.val())[0] as { path: string };
        console.log(`File found for user ${userId}:`, file);
        filePath = file.path.replace(/^public/, "");
        break; // Exit the loop early
      } else {
        console.log(
          `No file found for user ${userId} with direct link: ${directLink}`
        );
      }
    }

    if (!filePath) {
      console.error("File not found for direct link:", directLink);
      return undefined;
    }

    console.log("File path found:", filePath);

    return filePath;
  } catch (error) {
    console.error("Firebase Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
