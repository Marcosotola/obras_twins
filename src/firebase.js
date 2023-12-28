// Importa las funciones que necesitas de los SDK que necesitas
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"; // Añade la importación de Storage

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD34DuhQyH4rAb_035PhNUQNYgNKuTxwmM",
  authDomain: "obras-twins.firebaseapp.com",
  projectId: "obras-twins",
  storageBucket: "obras-twins.appspot.com",
  messagingSenderId: "22708881586",
  appId: "1:22708881586:web:a5d02a5f970ced6ec261ab"
};

// Inicializa Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();
const storage = firebase.storage(); // Inicializa Storage

export { db, storage };


