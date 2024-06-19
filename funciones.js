import { guardarDatos } from './firebase.js';

const limpiarFormulario = () => {
    const form = document.getElementById('formulario');
    form.reset();
    const inputs = form.querySelectorAll('.burbuja-input');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    document.getElementById('Rut').readOnly = false;
    document.getElementById('limpiarbtn').value = 'Limpiar';
};

const verificarCampos = () => {
    const inputs = document.querySelectorAll('.burbuja-input');
    const camposVacios = [];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexRut = /^\d{7,8}-[\dkK]$/i;
    let esValido = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            camposVacios.push(input.previousElementSibling.textContent || input.name);
            esValido = false;
        } else if (input.name === 'Correo' && !regexEmail.test(input.value.trim())) {
            Swal.fire({
                icon: 'error',
                title: 'Formato Incorrecto',
                text: 'Por favor, ingresa un correo electrónico válido.',
            });
            esValido = false;
        } else if (input.name === 'Rut') {
            const rutValue = input.value.replace(/[^\dkK]/g, '');
            if (rutValue.length !== 9) {
                Swal.fire({
                    icon: 'error',
                    title: 'Formato Incorrecto',
                    text: 'El RUT debe tener 9 dígitos (sin contar el guion y puntos).',
                });
                esValido = false;
            }
        }
    });

    if (camposVacios.length > 0) {
        let mensajeError = "Por favor, completa los siguientes campos:\n" + camposVacios.join(", ");
        Swal.fire({
            icon: 'error',
            title: 'Campos Vacíos',
            text: mensajeError,
        });
        esValido = false;
    }

    return esValido;
};

document.getElementById('guardarbtn').addEventListener('click', (event) => {
    event.preventDefault();

    if (verificarCampos()) {
        const datos = {
            nombre: document.getElementById('Nombre').value,
            rut: document.getElementById('Rut').value,
            correo: document.getElementById('Correo').value,
            telefono: document.getElementById('Telefono').value,
            nommascota: document.getElementById('NombreMascota').value,
            especie: document.getElementById('EspecieMascota').value,
            pesoMascota: document.getElementById('PesoMascota').value,
            edadMascota: document.getElementById('EdadMascota').value,
            motivoConsulta: document.getElementById('MotivoConsulta').value,
            fecha: document.getElementById('FechaConsulta').value,
        };

        guardarDatos(datos);
    }
});

const formatearRutConGuion = (event) => {
    let rutInput = event.target;
    let rutValue = rutInput.value.replace(/[^\dkK]/g, '');

    rutValue = rutValue.slice(0, 9);

    if (rutValue.length > 1) {
        const rutSinGuion = rutValue.slice(0, -1);
        const ultimoDigito = rutValue.slice(-1);
        rutInput.value = rutSinGuion.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + ultimoDigito.toUpperCase();
    } else {
        rutInput.value = rutValue.toUpperCase();
    }
};

const rutInput = document.getElementById('Rut');
rutInput.addEventListener('input', formatearRutConGuion);
rutInput.addEventListener('blur', formatearRutConGuion);

const permitirSoloLetras = (event) => {
    const caracterPermitido = /[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/;
    const caracter = event.key;

    if (!caracterPermitido.test(caracter)) {
        event.preventDefault();
    }
};

const permitirSoloNumeros = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const esNumero = /[0-9]/.test(keyValue);

    if (!esNumero) {
        event.preventDefault();
    }
};

const camposTexto = document.querySelectorAll('.burbuja-input:not(#Rut):not(#Telefono):not(#Correo):not(#PesoMascota):not(#EdadMascota)');
camposTexto.forEach(input => {
    input.addEventListener('keypress', permitirSoloLetras);
});

const telefonoInput = document.getElementById('Telefono');
telefonoInput.addEventListener('keypress', permitirSoloNumeros);

document.getElementById('limpiarbtn').addEventListener('click', limpiarFormulario);