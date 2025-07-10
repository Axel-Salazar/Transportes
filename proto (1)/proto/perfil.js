document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name && email && password) {
        alert(`Cambios guardados para ${name}`);
        // Aquí puedes enviar los datos al servidor o localStorage
        console.log({ name, email, password });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
