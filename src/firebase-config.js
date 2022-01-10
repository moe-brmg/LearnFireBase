// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "learnfirebase-2a87e.firebaseapp.com",
  projectId: "learnfirebase-2a87e",
  storageBucket: "learnfirebase-2a87e.appspot.com",
  messagingSenderId: "491904825532",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)