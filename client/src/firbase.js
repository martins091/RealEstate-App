// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-ef868.firebaseapp.com",
  projectId: "realestate-ef868",
  storageBucket: "realestate-ef868.appspot.com",
  messagingSenderId: "874692661947",
  appId: "1:874692661947:web:73adc107a4857221ef8f9e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);