import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const getData = async (callback) => {
    const querySnapshot = await getDocs(collection(db, "Usuarios"));
    callback(querySnapshot.docs);
};

const remove = async (id) => {
    await deleteDoc(doc(db, "Usuarios", id));
};

const getDocumento = async (id) => {
    return await getDoc(doc(db, "Usuarios", id));
};

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = '';
        datos.forEach((emp) => {
            const item = emp.data();
            tabla += `<tr>
                <td>${item.nombre}</td>
                <td>${item.rut}</td>
                <td>${item.correo}</td>
                <td>${item.telefono}</td>
                <td>${item.nommascota}</td>
                <td>${item.especie}</td>
                <td>${item.edadMascota}</td>
                <td>${item.pesoMascota}</td>
                <td>${item.motivoConsulta}</td>
                <td>${item.fecha}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="edit-${emp.id}">Editar</button>
                    <button class="btn btn-danger" id="delete-${emp.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('datos-container').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.id.replace('delete-', '');
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(id).then(() => {
                            Swal.fire({
                                title: "Eliminado!",
                                text: "Su registro ha sido eliminado correctamente",
                                icon: "success"
                            }).then(() => {
                                location.reload(); 
                            });
                        }).catch(error => {
                            Swal.fire({
                                title: "Error!",
                                text: `Hubo un error al eliminar el registro: ${error.message}`,
                                icon: "error"
                            });
                        });
                    }
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.id.replace('edit-', '');
                const doc = await getDocumento(id);
                const emp = doc.data();

                localStorage.setItem('editingId', id);
                window.location.href = '/index.html';
            });
        });
    });
});