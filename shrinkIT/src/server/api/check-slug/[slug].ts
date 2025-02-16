import { eventHandler } from "h3";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";
import dotenv from "dotenv";

// Lade die Umgebungsvariablen aus der .env Datei
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

interface User {
  id: string;
  link: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  volume: number;
  used: number;
  videos: number;
  photos: number;
  audios: number;
  profession: string;
  validUntil: string;
  background: string;
}

export default eventHandler(async (event) => {
  const { req, res } = event.node;
  const slug = req.url?.split("/").pop();

  if (!slug) {
    res.statusCode = 400;
    return { error: "Slug is required" };
  }

  const usersRef = ref(database, "users");
  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    res.statusCode = 404;
    return { error: "No users found" };
  }

  const users = snapshot.val();
  const user = Object.values(users).find(
    (user) => (user as User).link === slug
  ) as User;

  try {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      res.statusCode = 404;
      return { error: "No users found" };
    }

    const users = snapshot.val();
    const user = Object.values(users).find(
      (user) => (user as User).link === slug
    ) as User;

    if (!user) {
      res.statusCode = 404;
      return { error: "User not found" };
    }

    res.statusCode = 200;
    return {
      type: "user",
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
      image: user.profilePicture,
      volume: user.volume,
      used: user.used,
      videos: user.videos,
      photos: user.photos,
      music: user.audios,
      job: user.profession,
      expired: new Date(user.validUntil) < new Date(),
      bg: user.background,
    };
  } catch (error) {
    console.error("Error fetching user by slug:", error);
    res.statusCode = 500;
    return { error: "Internal server error" };
  }
});
