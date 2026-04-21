document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LÓGICA DEL FORMULARIO DE WHATSAPP
    const form = document.getElementById('wspForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            let nombre = document.getElementById('nombre').value;
            let telefono = document.getElementById('telefono').value;
            let mensaje = document.getElementById('mensaje').value;
            
            let textoWsp = `Hola Pulidos Chile 👷‍♂️. \nMi nombre es ${nombre}. \nMi teléfono es ${telefono}. \n\nNecesito cotizar lo siguiente:\n${mensaje}`;
            let textoCodificado = encodeURIComponent(textoWsp);
            let numeroTio = "56964162458"; 
            
            window.open(`https://wa.me/${numeroTio}?text=${textoCodificado}`, '_blank');
        });
    }

    // 2. LÓGICA DEL MENÚ MÓVIL (Hamburguesa)
    const btnMenu = document.getElementById('mobile-menu-btn');
    const menuMovil = document.getElementById('mobile-menu');
    const linksMoviles = document.querySelectorAll('.mobile-link');

    if (btnMenu && menuMovil) {
        // Abrir/Cerrar menú al tocar el botón
        btnMenu.addEventListener('click', () => {
            menuMovil.classList.toggle('hidden');
        });

        // Cerrar el menú automáticamente si el usuario hace clic en un enlace
        linksMoviles.forEach(link => {
            link.addEventListener('click', () => {
                menuMovil.classList.add('hidden');
            });
        });
    }

});