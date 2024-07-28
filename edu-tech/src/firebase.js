// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDknmtuwYDOxYbUiMFiJdeZL6lzduriA6c",
  authDomain: "edu-tech-a53de.firebaseapp.com",
  projectId: "edu-tech-a53de",
  storageBucket: "edu-tech-a53de.appspot.com",
  messagingSenderId: "746349690150",
  appId: "1:746349690150:web:ca581bc9b4dc28ccf455e7",
  measurementId: "G-X9M7LFES07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export { auth, provider, signInWithPopup, signOut};

