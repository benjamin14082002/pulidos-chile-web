document.addEventListener('DOMContentLoaded', function() {
    
    // --- 0. INICIALIZAR ANIMACIONES AL SCROLL (AOS) ---
    AOS.init({
        once: true,       // La animación solo ocurre la primera vez que bajas
        offset: 100,      // Empieza la animación 100px antes de llegar al elemento
        duration: 800,    // Duración de la animación (0.8 segundos)
        easing: 'ease-out-cubic'
    });

    // --- 1. FUNCIÓN REUTILIZABLE PARA CARRUSELES ---
    const setupCarousel = (carouselId, prevBtnId, nextBtnId) => {
        const carousel = document.getElementById(carouselId);
        const btnPrev = document.getElementById(prevBtnId);
        const btnNext = document.getElementById(nextBtnId);

        if (carousel && btnPrev && btnNext) {
            const getScrollAmount = () => {
                const cardWidth = carousel.querySelector('div').offsetWidth;
                const gap = 32; 
                return cardWidth + gap;
            };

            btnNext.addEventListener('click', () => {
                carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            });

            btnPrev.addEventListener('click', () => {
                carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            });
        }
    };

    setupCarousel('services-carousel', 'btn-prev-servicios', 'btn-next-servicios');
    setupCarousel('obras-carousel', 'btn-prev-obras', 'btn-next-obras');


    // --- 2. LÓGICA DE LA CALCULADORA ---
    const selectServicio = document.getElementById('servicio-cotizar');
    const inputMetros = document.getElementById('metros-cuadrados');
    const displayPrecio = document.getElementById('precio-total');
    let totalEstimado = 0;

    const formatearCLP = (valor) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(valor);
    };

    const calcularTotal = () => {
        const precioPorM2 = parseInt(selectServicio.options[selectServicio.selectedIndex].getAttribute('data-precio')) || 0;
        const metros = parseInt(inputMetros.value) || 0;
        totalEstimado = precioPorM2 * metros;
        displayPrecio.innerText = totalEstimado > 0 ? formatearCLP(totalEstimado) : '$0';
    };

    if(selectServicio && inputMetros) {
        selectServicio.addEventListener('change', calcularTotal);
        inputMetros.addEventListener('input', calcularTotal);
    }

    // --- 3. LÓGICA DE WHATSAPP ---
    const form = document.getElementById('wspForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let nombre = document.getElementById('nombre').value;
            let telefono = document.getElementById('telefono').value;
            let msgExtra = document.getElementById('mensaje').value;
            let servicio = selectServicio.options[selectServicio.selectedIndex].text;
            let metros = inputMetros.value;

            let texto = `Hola Pulidos Chile 👷‍♂️. \nMi nombre es ${nombre}. \nTeléfono: ${telefono}.\n`;
            if(totalEstimado > 0) {
                texto += `\n*COTIZACIÓN ESTIMADA:* \n- Servicio: ${servicio} \n- Superficie: ${metros}m² \n- Total: ${formatearCLP(totalEstimado)}\n`;
            }
            if(msgExtra) texto += `\n*Mensaje:* ${msgExtra}`;
            
            window.open(`https://wa.me/56964162458?text=${encodeURIComponent(texto)}`, '_blank');
        });
    }

    // --- 4. MENÚ MÓVIL ---
    const btnMenu = document.getElementById('mobile-menu-btn');
    const menuMovil = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (btnMenu && menuMovil) {
        btnMenu.addEventListener('click', () => menuMovil.classList.toggle('hidden'));
        links.forEach(l => l.addEventListener('click', () => menuMovil.classList.add('hidden')));
    }
});