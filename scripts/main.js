let eventos = [];
let arr = [];

const nombreEvento = document.querySelector('#nombreEvento');
const fechaEvento = document.querySelector('#fechaEvento');
const botonAgregar = document.querySelector('#agregar');
const listaEventos = document.querySelector('#lstaEventos');

// Función para mostrar los eventos en el contenedor
function mostrarEventos() {
    // Actualiza el contenido HTML del contenedor con una lista de eventos
    const eventosHTML = eventos.map((eventos) => {
        return `  
                <div class="evento">
                    <div class="dias">
                        <span class="diasFaltantes"></span>
                        <span class="texto">dias para</span>
                    </div>

                    <div class="nombreEvento">${eventos.nombre}</div>
                    <div class="fechaEvento">${eventos.fecha}</div>

                    <div class="acciones">
                        <button data-id="${eventos.id}" class="eliminar">Eliminar</button>
                    </div>

                </div>`;
    });

    listaEventos.innerHTML = eventosHTML.join("");

    document.querySelectorAll('.eliminar').forEach(button => {

        button.addEventListener("click", e => {
            const id = button.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id);

            mostrarEventos();

        })
    });
}

// Función para calcular la diferencia en milisegundos entre la fecha actual y la fecha del evento
function diferenciaFecha(fecha) {
    // Obtiene la fecha y hora actuales
    let hoy = new Date();
    // Convierte la fecha del evento en un objeto Date
    let evento = new Date(fecha);
    // Calcula la diferencia en milisegundos entre la fecha del evento y la fecha actual
    let diferencia = evento.getTime() - hoy.getTime();
    
    // Calcula la diferencia en días y horas
    let dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    
    // Devuelve la diferencia en milisegundos
    return dias;
}

// Función para agregar un nuevo evento
function agregarEvento() {
    // Verifica que los campos no estén vacíos y que la fecha del evento sea futura
    if (nombreEvento.value === "" || fechaEvento.value === "") {
        return; // Si alguna condición no se cumple, termina la función
    }

    if( diferenciaFecha(fechaEvento.value) < 0){
        return;
    }

    // Crea un nuevo objeto para el evento
    const nuevoEvento = {
        // Genera un ID único para el evento
        id: (Math.random() * 100).toString(36).slice(3),
        // Usa el valor del campo de nombre del evento
        nobre: nombreEvento.value,
        // Usa el valor del campo de fecha del evento
        fecha: fechaEvento.value
    };

    // Añade el nuevo evento al inicio del array de eventos
    eventos.unshift(nuevoEvento);
    // Limpia el campo de nombre del evento
    nombreEvento.value = "";

    // Llama a la función para mostrar los eventos actualizados
    mostrarEventos();
}

// Añade un manejador de eventos para el formulario
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recarga de página)
    agregarEvento(); // Llama a la función para agregar el evento
});
