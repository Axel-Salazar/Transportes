const tablaRecursos = document.getElementById("tablaRecursos");
const modalRecurso = document.getElementById("modalRecurso");
const formRecurso = document.getElementById("formRecurso");
const btnAgregarRecurso = document.getElementById("btnAgregarRecurso");
const btnCancelarRecurso = document.getElementById("btnCancelarRecurso");
const modalTitulo = document.getElementById("modalTitulo");

let recursos = [];
let editando = false;
let editIndex = null;

// Cargar recursos desde localStorage
function cargarRecursos() {
    const datos = localStorage.getItem("recursos");
    recursos = datos ? JSON.parse(datos) : [];
}

// Guardar recursos en localStorage
function guardarRecursos() {
    localStorage.setItem("recursos", JSON.stringify(recursos));
}

// Mostrar recursos en la tabla
function mostrarRecursos() {
    tablaRecursos.innerHTML = "";
    if (recursos.length === 0) {
        tablaRecursos.innerHTML = `<tr><td colspan="5">No hay recursos disponibles.</td></tr>`;
        return;
    }
    recursos.forEach((recurso, i) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${recurso.nombre}</td>
            <td>${recurso.tipo}</td>
            <td>${recurso.estado}</td>
            <td>
                <button class="btnEditarRecurso" data-index="${i}">Editar</button>
                <button class="btnEliminarRecurso" data-index="${i}">Eliminar</button>
            </td>
        `;
        tablaRecursos.appendChild(fila);
    });

    document.querySelectorAll(".btnEditarRecurso").forEach(btn =>
        btn.addEventListener("click", abrirEditarRecurso)
    );
    document.querySelectorAll(".btnEliminarRecurso").forEach(btn =>
        btn.addEventListener("click", eliminarRecurso)
    );
}

// Abrir modal para agregar recurso
function abrirAgregarRecurso() {
    editando = false;
    editIndex = null;
    modalTitulo.textContent = "Agregar Recurso";
    formRecurso.reset();
    modalRecurso.classList.add("active");
}

// Abrir modal para editar recurso
function abrirEditarRecurso(e) {
    editando = true;
    editIndex = parseInt(e.target.dataset.index);
    modalTitulo.textContent = "Editar Recurso";
    const recurso = recursos[editIndex];
    formRecurso.nombre.value = recurso.nombre;
    formRecurso.tipo.value = recurso.tipo;
    formRecurso.estado.value = recurso.estado;
    modalRecurso.classList.add("active");
}

// Cerrar modal
function cerrarModalRecurso() {
    modalRecurso.classList.remove("active");
}

// Guardar recurso (agregar o editar)
function guardarRecurso(e) {
    e.preventDefault();
    const nuevoRecurso = {
        nombre: formRecurso.nombre.value.trim(),
        tipo: formRecurso.tipo.value.trim(),
        estado: formRecurso.estado.value
    };
    if (editando) {
        recursos[editIndex] = nuevoRecurso;
    } else {
        recursos.push(nuevoRecurso);
    }
    guardarRecursos();
    mostrarRecursos();
    cerrarModalRecurso();
}

// Eliminar recurso
function eliminarRecurso(e) {
    const index = parseInt(e.target.dataset.index);
    if (confirm("¿Seguro que quieres eliminar este recurso?")) {
        recursos.splice(index, 1);
        guardarRecursos();
        mostrarRecursos();
    }
}

// Eventos
btnAgregarRecurso.addEventListener("click", abrirAgregarRecurso);
btnCancelarRecurso.addEventListener("click", cerrarModalRecurso);
formRecurso.addEventListener("submit", guardarRecurso);

// Inicialización
cargarRecursos();
mostrarRecursos();
