/***
 * Script para insertar los datos del usuario en la pagina de su perfil.
*/

const foto = document.getElementById("foto_usuario");
const nombre = document.getElementById("nombre_usuario");
const agilidad = document.getElementById("agilidad_usuario");
const golpe = document.getElementById("golpe_usuario");

const usuarioGuardado = localStorage.getItem("usuarioActual");

if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    nombre.textContent = usuario.nombreUsuario || usuario.nombre;
    if (usuario.agilidad !== undefined) {
        agilidad.textContent = `Agilidad: ${usuario.agilidad}`;
    }
    if (usuario.golpe !== undefined) {
        golpe.textContent = `Golpe: ${usuario.golpe}`;
    }
    
    foto.src = "../../img/foto_usuario.gif"; /* cambiamos la foto del perfil del usuario que ya inicio sesion */
}
