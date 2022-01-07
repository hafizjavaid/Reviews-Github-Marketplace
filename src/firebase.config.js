// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIstnJW75Q0CfREKKX3fN5skrXS0e5TvA",
  authDomain: "house-marketplace-4b057.firebaseapp.com",
  projectId: "house-marketplace-4b057",
  storageBucket: "house-marketplace-4b057.appspot.com",
  messagingSenderId: "456242399084",
  appId: "1:456242399084:web:c5ef8bf1255cb1c4471549",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
