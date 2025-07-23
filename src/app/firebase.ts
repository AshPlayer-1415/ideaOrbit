// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAru9NL9jF8RiSLuA_U-XhZrx6xIqh6DUI",
  authDomain: "ideaorbit-89e1c.firebaseapp.com",
  projectId: "ideaorbit-89e1c",
  storageBucket: "ideaorbit-89e1c.firebasestorage.app",
  messagingSenderId: "695095895490",
  appId: "1:695095895490:web:a95e35bd5118321179625b",
  measurementId: "G-LV3QXH9YYP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);