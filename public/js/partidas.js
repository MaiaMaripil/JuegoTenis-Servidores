//Partidas
const partidas = [
    { id: 1, nombre: "Partida 1", resultado: "Ganada!", set: "3-1", fecha: "4/10/2026" },
    { id: 2, nombre: "Partida 2", resultado: "Ganada!", set: "2-1", fecha: "02/10/2026" },
    { id: 3, nombre: "Partida 3", resultado: "Perdida", set: "2-3", fecha: "24/9/2026" },
    { id: 4, nombre: "Partida 4", resultado: "Empate", set: "2-2", fecha: "28/9/2026" },
    { id: 5, nombre: "Partida 5", resultado: "Empate", set: "2-2", fecha: "27/9/2026" }
];


const contenedor = document.getElementById('lista-partidas');

if (contenedor) {
    partidas.forEach(p => {
        contenedor.innerHTML += `
    <li class="partida-item">
      <div class="partida-info">
        <strong>☆ ${p.nombre}</strong>
        <span class="texto">${p.resultado}</span>
        <span class="texto">${p.set}</span>
        <span class="texto">${p.fecha}</span>
      </div>
      <a href="../user/detallePartida.html" class="ver-detalle">Ver detalle</a>
    </li>
  `;
    });
} else {
    console.error("Error, no se encontro 'partidas-list'");
}
