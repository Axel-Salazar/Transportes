/*funcionalidad de facturación*/
document.querySelector('.billing-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const folio = document.getElementById('folio').value;
    const rfc = document.getElementById('rfc').value;
    const email = document.getElementById('email').value;

    if (folio && rfc && email) {
        alert(`Tu factura con el folio ${folio} ha sido generada exitosamente.`);
        // Aquí podrías redirigir a otra página o enviar los datos al servidor
        window.location.href = "gracias.html"; // Redirige a una página de agradecimiento si es necesario
    } else {
        alert('Por favor, completa todos los campos.');
    }
});