// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "A******************************I",
  authDomain: "ideaorbit-******.firebaseapp.com",
  projectId: "ideaorbit-8******",
  storageBucket: "ideaorbit-*****.firebasestorage.app",
  messagingSenderId: "**********0",
  appId: "1:6***********:web:a95***************",
  measurementId: "G-**************"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
