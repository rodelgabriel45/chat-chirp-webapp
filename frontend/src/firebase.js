// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "chat-chirp-ba158.firebaseapp.com",
  projectId: "chat-chirp-ba158",
  storageBucket: "chat-chirp-ba158.appspot.com",
  messagingSenderId: "573188861301",
  appId: "1:573188861301:web:6c0a615c2118f0507cb73c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
