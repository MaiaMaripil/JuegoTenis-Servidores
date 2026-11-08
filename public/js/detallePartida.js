//Se ejectua cuando se abre el detallePartida.html

document.addEventListener('DOMContentLoaded', async () => {
    const parametrosURL = new URLSearchParams(window.location.search);
    const partida = parametrosURL.get('id');

    const rta = await fetch(`/api/partidas/detallePartida/${partida}`, {
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