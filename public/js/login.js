const botonIngresar = document.getElementById('botonIngresar');
const mensajeEstado = document.getElementById('mensaje');
const linkPerfil = document.getElementById('link-perfil');

if (linkPerfil) {
    linkPerfil.addEventListener('click', (e) => {
        const estaLogueado = localStorage.getItem('sesionActiva') === 'true';

        /*Si no esta logueado va al login */
        if (!estaLogueado) {
            e.preventDefault();
            window.location.href = 'pages/user/login.html';
        }
    });
}



botonIngresar.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const datosForm = {
        nombreUsuario: document.getElementById('login-email').value.trim(),
        password: document.getElementById('login-password').value.trim()
    }

    //Se mandan los datos al servidor con fetch
    const respuesta = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosForm)
    });

    const resultado = await respuesta.json();
    if (!respuesta.ok) {
        mensajeEstado.style.color = 'red';
        mensajeEstado.textContent = resultado.error;
    } else {
        mensajeEstado.style.color = 'yellow';
        mensajeEstado.textContent = resultado.mensaje;
        localStorage.setItem('sesionActiva', 'true');
        localStorage.setItem('usuarioActual', JSON.stringify(resultado.usuario));

        

        //Para que quede el mensaje unos segundos
        setTimeout(() => {
            mensajeEstado.textContent = '';
            window.location.href = 'perfilUsuario.html';
        }, 1000);
        
    }
});




/*Comportamiento para cerrar sesion */

function cerrarSesion() {
    localStorage.removeItem('sesionActiva');
    localStorage.removeItem('usuarioActual');

    //Se redirige al inicio
    window.location.href = '../../index.html';
}
