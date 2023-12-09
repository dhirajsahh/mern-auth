// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-45a62.firebaseapp.com",
  projectId: "mern-auth-45a62",
  storageBucket: "mern-auth-45a62.appspot.com",
  messagingSenderId: "696013264956",
  appId: "1:696013264956:web:9af289b770df6aded78b39",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
