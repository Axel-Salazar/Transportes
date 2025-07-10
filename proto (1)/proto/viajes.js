// Variables globales
const tablaBody = document.querySelector("#tablaViajes tbody");
const modal = document.getElementById("modalViaje");
const form = document.getElementById("formViaje");
const btnAgregar = document.getElementById("btnAgregar");
const btnCancelar = document.getElementById("btnCancelar");
const modalTitulo = document.getElementById("modalTitulo");

let viajes = [];
let editando = false;
let editIndex = null;

// Cargar viajes desde localStorage
function cargarViajes() {
  const datos = localStorage.getItem("viajes");
  viajes = datos ? JSON.parse(datos) : [];
}

// Guardar viajes a localStorage
function guardarViajes() {
  localStorage.setItem("viajes", JSON.stringify(viajes));
}

// Mostrar tabla
function mostrarViajes() {
  tablaBody.innerHTML = "";
  if (viajes.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888;">No hay viajes programados.</td></tr>`;
    return;
  }
  viajes.forEach((viaje, i) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${viaje.origen}</td>
      <td>${viaje.destino}</td>
      <td>${viaje.fecha}</td>
      <td>${viaje.camion}</td>
      <td>${viaje.operador}</td>
      <td>
          <button class="btnEditar" data-index="${i}">Editar</button>
          <button class="btnEliminar" data-index="${i}">Eliminar</button>
      </td>
    `;

    tablaBody.appendChild(fila);
  });

  // Añadir eventos a botones editar y eliminar
  document.querySelectorAll(".btnEditar").forEach(btn => {
    btn.addEventListener("click", abrirEditar);
  });
  document.querySelectorAll(".btnEliminar").forEach(btn => {
    btn.addEventListener("click", eliminarViaje);
  });
}

// Abrir modal para agregar viaje
function abrirAgregar() {
  editando = false;
  editIndex = null;
  modalTitulo.textContent = "Agregar viaje";
  form.reset();
  modal.classList.add("active");
}

// Abrir modal para editar viaje
function abrirEditar(e) {
  editando = true;
  editIndex = parseInt(e.target.dataset.index);
  modalTitulo.textContent = "Editar viaje";
  const viaje = viajes[editIndex];
  form.origen.value = viaje.origen;
  form.destino.value = viaje.destino;
  form.fecha.value = viaje.fecha;
  form.camion.value = viaje.camion;
  form.operador.value = viaje.operador;
  modal.classList.add("active");
}

// Cerrar modal
function cerrarModal() {
  modal.classList.remove("active");
}

// Guardar viaje (agregar o editar)
function guardarViaje(e) {
  e.preventDefault();

  // Leer valores
  const nuevoViaje = {
    origen: form.origen.value.trim(),
    destino: form.destino.value.trim(),
    fecha: form.fecha.value,
    camion: form.camion.value.trim(),
    operador: form.operador.value.trim()
  };

  if (editando) {
    viajes[editIndex] = nuevoViaje;
  } else {
    viajes.push(nuevoViaje);
  }

  guardarViajes();
  mostrarViajes();
  cerrarModal();
}

// Eliminar viaje
function eliminarViaje(e) {
  const index = parseInt(e.target.dataset.index);
  const confirmado = confirm("¿Seguro que quieres eliminar este viaje?");
  if (confirmado) {
    viajes.splice(index, 1);
    guardarViajes();
    mostrarViajes();
  }
}

// Eventos
btnAgregar.addEventListener("click", abrirAgregar);
btnCancelar.addEventListener("click", cerrarModal);
form.addEventListener("submit", guardarViaje);

// Inicialización
cargarViajes();
mostrarViajes();
