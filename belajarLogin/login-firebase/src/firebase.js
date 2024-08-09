// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBK_8n8BXALpsOQu4V4fSUtJQ7d9I9cJ6I",
  authDomain: "auth-noufal.firebaseapp.com",
  projectId: "auth-noufal",
  storageBucket: "auth-noufal.appspot.com",
  messagingSenderId: "1007039663363",
  appId: "1:1007039663363:web:ef29b21afe495eacf8ed36"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
