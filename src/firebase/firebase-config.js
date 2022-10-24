// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBm2DIoS9Nu63qdI1y4nnA0yGc9EY_BkzQ",
    authDomain: "edufin-558e4.firebaseapp.com",
    projectId: "edufin-558e4",
    storageBucket: "edufin-558e4.appspot.com",
    messagingSenderId: "937069759593",
    appId: "1:937069759593:web:c677443cf65f20df6466f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
