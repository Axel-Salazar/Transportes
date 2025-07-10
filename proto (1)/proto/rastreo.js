// Inicializar mapa con Leaflet
const map = L.map('map').setView([19.432608, -99.133209], 12);

// Cargar capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Crear marcador inicial
let marker = L.marker([19.432608, -99.133209]).addTo(map);

// Función para actualizar posición
function actualizarPosicion(lat, lng) {
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 12);
}

// Simular movimiento
let lat = 19.432608;
let lng = -99.133209;
setInterval(() => {
    lat += 0.001;
    lng -= 0.001;
    actualizarPosicion(lat, lng);
}, 5000);

// Geolocalización navegador
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            actualizarPosicion(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.error('Error en geolocalización:', error.message);
        }
    );
} else {
    alert('Geolocalización no soportada por tu navegador.');
}
