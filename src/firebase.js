import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC2VCh5VEXaKXFpinUDG_NgFojZuUeLgtY",
    authDomain: "shopiclone-5852c.firebaseapp.com",
    projectId: "shopiclone-5852c",
    storageBucket: "shopiclone-5852c.firebasestorage.app",
    messagingSenderId: "724918036358",
    appId: "1:724918036358:web:4921acacdc44c32e57ae07"
  };
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export both auth and db
