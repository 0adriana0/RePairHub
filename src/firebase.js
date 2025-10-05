import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBigBFrGTsQ7a_LJK4EQd47eg1woesoaZ4",
  authDomain: "repairhub-e8d52.firebaseapp.com",
  projectId: "repairhub-e8d52",
  storageBucket: "repairhub-e8d52.firebasestorage.app",
  messagingSenderId: "195139739731",
  appId: "1:195139739731:web:9a7f94fa47fa09f8e4e6a6",
  measurementId: "G-7R7VDYE4N8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);