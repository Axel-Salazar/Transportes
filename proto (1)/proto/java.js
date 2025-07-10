document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Previene el envío del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        alert(`Inicio de sesión exitoso. Bienvenido, ${email}`);
        // Aquí podrías redirigir a otra página o validar contra un servidor
        window.location.href = "dashboard.html"; // Redirige a otra página
    } else {
        alert('Por favor, completa todos los campos.');
    }
});



