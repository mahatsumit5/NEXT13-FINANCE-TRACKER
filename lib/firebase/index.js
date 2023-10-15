// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6RMbPF9kMNT8G0e55EIQXFX_lFd2QGcc",
  authDomain: "next13-expenses-tracker.firebaseapp.com",
  projectId: "next13-expenses-tracker",
  storageBucket: "next13-expenses-tracker.appspot.com",
  messagingSenderId: "862745816594",
  appId: "1:862745816594:web:106601c75b71f3c72cb2cb",
  measurementId: "G-H4ZBEYV90C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
