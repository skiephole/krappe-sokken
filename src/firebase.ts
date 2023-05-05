// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3mQbOtCSptZR_2vNMH6Aadk9Thj9SRaI",
  authDomain: "krappe-sokken.firebaseapp.com",
  projectId: "krappe-sokken",
  storageBucket: "krappe-sokken.appspot.com",
  messagingSenderId: "400701578071",
  appId: "1:400701578071:web:0a320328ada950f7b83c12",
  measurementId: "G-YXHYTFMKG6",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;
