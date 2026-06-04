import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD6pMwXKNqm52rnjZnS5EkPyxAgGXkLfN0",
  authDomain: "sai-mangalam.firebaseapp.com",
  projectId: "sai-mangalam",
  storageBucket: "sai-mangalam.firebasestorage.app",
  messagingSenderId: "349289861380",
  appId: "1:349289861380:web:a504ae30ccd5b22af98051",
  measurementId: "G-67BG3M0N2C"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
