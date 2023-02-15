//! Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;


//! Clases
class Citas {
    constructor() {
        /**
         * Por la estructura del codigo, este contructor provoca que cuando se vaya a
         * agregar una nueva cita al arreglo, este la tome como si fuera la ultima que 
         * se le agrego y por tanto sobreescribe las anteriores y repite la nueva.
         * 
         * Solucion: mandarle una copia
         */
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]; //* Agrega el arreglo anterior de 'citas' y agrega la actual
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita (citaAct){
        this.citas = this.citas.map( cita => cita.id === citaAct.id ? citaAct : cita);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        //* Crear el div
        const alertaDiv = document.createElement('DIV');
        alertaDiv.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //* Agregar clase en base al tipo de error
        if (tipo === 'error') {
            alertaDiv.classList.add('alert-danger');
        } else {
            alertaDiv.classList.add('alert-success');
        }
        alertaDiv.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(alertaDiv, document.querySelector('.agregar-cita'));
        setTimeout(() => {
            alertaDiv.remove();
        }, 3000);
    }

    imprimirCitas({ citas }) {

        limpiarHTML(contenedorCitas);

        citas.forEach(cita => {

            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            const divCita = document.createElement('DIV');
            divCita.classList.add('cita', 'p-3');

            divCita.setAttribute.id = id; //* Le agrega el atributo de 'id' como paramentro a cada cita

            //* Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bold');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

            //* Boton para eliminar una cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>';


            //* Boton para editar 
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            //* Agrega los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            btnEliminar.onclick = () => eliminarCita(id);

            //* Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        });
    }
}

const ui = new UI();
const adminCitas = new Citas();


//* Objeto co la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

eventListeners();
//! Eventos
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
    formulario.addEventListener('submit', nuevaCita);
}

//! Funciones
//* Agrega datos al objeto de cita
function datosCita(e) {
    /**
     * e.target.name: accede al 'name' del input que corresponde con cada propiedad del objeto 'citaObj'
     * e.target.value: retorna el contenido del input
     */
    citaObj[e.target.name] = e.target.value;
}

//* Valida y agrega una nueva cita a la clase de 'citas'
function nuevaCita(e) {
    e.preventDefault();

    //* Extraer la informacion del objeto de 'cita'
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //* Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');

        //* Pasar el objeto de la cita a edicion
        adminCitas.editarCita({...citaObj});

        //* Regresa el texto del btn 
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando = false;
    } else {
        //* Generar un id unico
        citaObj.id = Date.now();

        //* Creando una nueva cita.
        /**
         * Para evitar que se sobreescriban las citas y que el metodo 'agregarCita' tome como
         * anterior la cita actual, se le pasa una copia del objeto con la nueva cita a agregar
         */
        adminCitas.agregarCita({ ...citaObj }); //* Crea una copia del objeto 'citasObj'

        //* Mensaje de agregado corectamente
        ui.imprimirAlerta('Se agregó correctamente');

    }

    reiniciarObjeto();
    formulario.reset();

    //* Mostrar el HTML
    ui.imprimirCitas(adminCitas);



}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function limpiarHTML(contenedorCitas) {
    while (contenedorCitas.firstChild) {
        contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
}

function eliminarCita(id) {
    //*Eliminar la cita
    adminCitas.eliminarCita(id);

    //* Muestra un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //* Refrescar las citas
    ui.imprimirCitas(adminCitas);
}

//* Cargar los datos y el modo edicion
function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //* Llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //* Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    //* Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}