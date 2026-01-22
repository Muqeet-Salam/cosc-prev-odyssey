// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey || "",
  authDomain: process.env.NEXT_PUBLIC_authDomain || "",
  databaseURL: process.env.NEXT_PUBLIC_databaseURL || "",
  projectId: process.env.NEXT_PUBLIC_projectId || "",
  storageBucket: process.env.NEXT_PUBLIC_storageBucket || "",
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId || "",
  appId: process.env.NEXT_PUBLIC_appId || "",
  measurementId: process.env.NEXT_PUBLIC_measurementId || "",
};

// Initialize Firebase only if we have valid config
let app, auth, database;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
  } else {
    // Create dummy objects for development/build time
    app = null;
    auth = null;
    database = null;
  }
} catch (error) {
  console.warn("Firebase initialization warning:", error.message);
  app = null;
  auth = null;
  database = null;
}

export { app, auth, database };