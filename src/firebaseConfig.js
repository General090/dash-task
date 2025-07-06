// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwngTnS5WCEQp47Uvov3hoUD6EPzZzC9k",
  authDomain: "digitalforms-ebce1.firebaseapp.com",
  projectId: "digitalforms-ebce1",
  storageBucket: "digitalforms-ebce1.appspot.com",
  messagingSenderId: "151263391177",
  appId: "1:151263391177:web:c7407fbe8eea2473c24c18"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);