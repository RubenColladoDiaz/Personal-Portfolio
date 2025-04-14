// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwbxV2G0J-c70rhASWhKlA4_mZgalzdJM",
  authDomain: "portafoliopersonalbd.firebaseapp.com",
  databaseURL: "https://portafoliopersonalbd-default-rtdb.firebaseio.com",
  projectId: "portafoliopersonalbd",
  storageBucket: "portafoliopersonalbd.firebasestorage.app",
  messagingSenderId: "477625519192",
  appId: "1:477625519192:web:0f6d444e3fb245a2b30e2d",
  measurementId: "G-RV53JBYY8Y"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();