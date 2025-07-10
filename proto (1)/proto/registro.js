document.querySelector('.register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        alert('Por favor completa todos los campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    alert(`Registro exitoso. Bienvenido/a, ${name}!`);
    window.location.href = "proto.html"; // Redirige al login
});
