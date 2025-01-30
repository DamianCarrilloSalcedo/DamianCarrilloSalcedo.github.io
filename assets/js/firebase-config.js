// firebase-config.js

// Importamos las funciones necesarias desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD5JxdXA4VJdFLpcDqm1UEC0tXzjrldBLQ",
    databaseURL: "https://ridetosurvive-64cda-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ridetosurvive-64cda",
    storageBucket: "ridetosurvive-64cda.appspot.com",
    messagingSenderId: "1058676886085",
    appId: "1:1058676886085:android:073ca620e221f56e7f312c"
};

// Inicializacion de Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Exportamos la base de datos para que se pueda usar en otras partes de la app
export { database };
