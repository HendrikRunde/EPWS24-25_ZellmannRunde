import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyB5xULRkqas-jx6nVP7uM8FFhTagXS0ajE",
  authDomain: "shrinkit-cc4c7.firebaseapp.com",
  databaseURL: "https://shrinkit-cc4c7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shrinkit-cc4c7",
  storageBucket: "shrinkit-cc4c7.firebasestorage.app",
  messagingSenderId: "713219943118",
  appId: "1:713219943118:web:24dcfe711b7d591e11be9f",
  measurementId: "G-4CTN11N6DB"
};


// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default { app, database };