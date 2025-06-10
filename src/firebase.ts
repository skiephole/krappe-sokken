// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3mQbOtCSptZR_2vNMH6Aadk9Thj9SRaI",
  authDomain: "krappe-sokken.firebaseapp.com",
  databaseURL:
    "https://krappe-sokken-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "krappe-sokken",
  storageBucket: "krappe-sokken.appspot.com",
  messagingSenderId: "400701578071",
  appId: "1:400701578071:web:0a320328ada950f7b83c12",
  measurementId: "G-YXHYTFMKG6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage and Database
const storage = getStorage(app);
const database = getDatabase(app);

export { storage, database };
export default storage;
