//Se ejectua cuando se abre el detallePartida.html
const parametrosURL = new URLSearchParams(window.location.search);
const idPartida = parametrosURL.get('id');

document.addEventListener('DOMContentLoaded', async () => {

    // console.log("ID capturado de la URL:", partida);
    const rta = await fetch(`/api/partidas/detallePartida/${idPartida}`, {
        method: 'GET'
    });

    if (rta.ok) {
        const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
        const datos = await rta.json();
        const detalle = datos.mensaje;

        document.getElementById('nombrePartida').textContent = detalle.nombrePartida;
        document.getElementById('nombreJugador').textContent = usuario.nombre;
        document.getElementById('puntajeJugador').textContent = detalle.puntajeJugador;
        document.getElementById('puntajeRival').textContent = detalle.puntajeRival;
        document.getElementById('dificultad').textContent = detalle.dificultad;
        document.getElementById('duracion').textContent = detalle.duracion;
        document.getElementById('tipoCancha').textContent = detalle.superficie;
        document.getElementById('estado').textContent = detalle.estado;
        document.getElementById('nombreRival').textContent = 'Rival';


    } else {
        document.getElementById('nombrePartida').textContent = "Partida no encontrada";
    }

})

const botonModificar = document.getElementById('boton-modificar-nombre');
const contenedorNombre = document.getElementById('nombrePartida');
let nombreActual ='';

botonModificar.addEventListener('click', async () => {
    nombreActual=contenedorNombre.textContent.trim();

    contenedorNombre.innerHTML = `<input id="nuevoNombre" type="text" placeholder="Nuevo nombre de la partida">
    <button id="boton-guardar-nombre">Guardar</button>`;

    botonModificar.style.display = 'none'; //se oculta el boton de modificar


});

const botonGuardar = document.getElementById('boton-guardar-nombre')

contenedorNombre.addEventListener('click', async () => {
    const inputNuevoNombre = document.getElementById('nuevoNombre');
    const nuevoNombre = inputNuevoNombre.value.trim();

    if (nuevoNombre) {
        const rta = await fetch(`/api/partidas/modificarNombre/${idPartida}`, {
            method: 'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({ nombrePartida: nuevoNombre })
        });

        if (rta.ok) {
            contenedorNombre.textContent = nuevoNombre;
            botonModificar.style.display='inline-block';
        } else {
            const contenedorMensaje = document.getElementById('contenedorMensaje');
            contenedorMensaje.textContent = 'No se pudo modificar'
            contenedorNombre.textContent = nombreActual ;


            setTimeout(() => {
                contenedorMensaje.style.display = 'none';
                botonModificar.style.display='inline-block';
            }, 2000);

        }
    }
})

