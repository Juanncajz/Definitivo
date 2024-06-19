import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore,addDoc,collection} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAHuIVk8CAgyFXAUdlVc1XGHqKGvIghCYs",
    authDomain: "proyexct3.firebaseapp.com",
    projectId: "proyexct3",
    storageBucket: "proyexct3.appspot.com",
    messagingSenderId: "855242504359",
    appId: "1:855242504359:web:e65670a19fb5abc05a8382"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const guardarDatos = async (datos) => {
    try {
        await addDoc(collection(db, 'Usuarios'), datos);
        Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'Los datos se han guardado correctamente en la base de datos.',
        });
    } catch (error) {
        console.error("Error adding document: ", error);
        Swal.fire({
            icon: 'error',
            title: 'Error al Guardar',
            text: `Hubo un error al guardar los datos: ${error.message}`,
        });
    }
};




