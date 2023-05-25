// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD34DuhQyH4rAb_035PhNUQNYgNKuTxwmM",
  authDomain: "obras-twins.firebaseapp.com",
  projectId: "obras-twins",
  storageBucket: "obras-twins.appspot.com",
  messagingSenderId: "22708881586",
  appId: "1:22708881586:web:a5d02a5f970ced6ec261ab"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();


