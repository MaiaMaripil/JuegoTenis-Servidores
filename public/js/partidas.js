let cantidad = 10;
let fromActual;

//funcion para inicializar los valores del from cada vez que se ingresa a la pagina
function inicializarVistaPartidas() {
    fromActual = 0; 
    const contenedor = document.getElementById('partidas-list');
    
    if (contenedor) {
        contenedor.innerHTML = ''; 
    }

    pedirPartidas(); // Llamamos a la primera tanda
}

document.addEventListener('DOMContentLoaded', inicializarVistaPartidas);



const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioActual'));
const contenedor = document.getElementById('lista-partidas');

async function pedirPartidas() {
  if (usuarioLogueado) {
    const url = `/api/partidas/usuario/${usuarioLogueado.id}?cantidad=${cantidad}&from=${fromActual}`;

    const res = await fetch(url,{
      method: 'GET'
    });
    const datos = await res.json();

    if (res.ok) {
      const partidas = datos.mensaje;
      partidas.forEach(p => {
        const puntajeTexto=`${p.puntajeJugador} - ${p.puntajeRival}`;
        contenedor.innerHTML += `
    <li class="partida-item">
      <div class="partida-info">
        <strong>☆ ${p.nombrePartida}</strong>
        <span class="texto">${p.resultado}</span>
        <span class="texto">${puntajeTexto}</span>
        <span class="texto">${p.fecha}</span>
      </div>
      <a href="../user/detallePartida.html?id=${p.idPartida}" class="ver-detalle">Ver detalle</a>
    </li>
  `;
      });

      fromActual += cantidad;
    } else {
      contenedor.innerHTML += `
    <li class="partida-item">
      <div class="partida-info">
        <strong> NO EXISTEN PARTIDAS </strong>
      </div>
    </li>
  `;
    };

  } else {
    //si no esta logueado
    const contenedorMensaje = document.getElementById('contenedor-partidas');
    contenedorMensaje.innerHTML = `
            <h2>Debes iniciar sesion para ver las partidas</h2>
            </div>`;

    setTimeout(() => {
      window.location.href = '../user/login.html';
    }, 2000);
  }

}


//Si se detecta que sigue scrolleando
contenedor.addEventListener('scroll', () => {
  //scrollHeigth: altura total de la lista (las 10 partidas)
  //scrollTop: lo que se bajo
  //clientHeight: lo que entra en la caja visible

  //Si faltan 30 pixeles para llegar al final, pide otras 10 partidas
  if (contenedor.scrollTop + contenedor.clientHeight >= contenedor.scrollHeight - 30) {
    pedirPartidas();
  }
});


