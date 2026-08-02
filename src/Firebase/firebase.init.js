// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7PLlYtsTKodf3h9YXuX2Ppao7CU9wkyQ",
  authDomain: "social-event-39a78.firebaseapp.com",
  projectId: "social-event-39a78",
  storageBucket: "social-event-39a78.firebasestorage.app",
  messagingSenderId: "1036295596723",
  appId: "1:1036295596723:web:bc83bd80602b25bbe7dec6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);