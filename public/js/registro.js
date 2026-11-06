const botonRegistrar = document.getElementById('botonRegistrar');
const mensajeEstado = document.getElementById('mensaje');

//Cuando se presiona 'Registrarme'
botonRegistrar.addEventListener('click', async (e) => {
    e.preventDefault();
    const datosFormulario = {
        nombre: document.getElementById('nombre').value,
        nombreUsuario: document.getElementById('nombreUsuario').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }


    //Se mandan los datos al servidor con fetch
    const respuesta = await fetch('/api/usuarios/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosFormulario)
    });

    const resultado = await respuesta.json();

    //Segun rta
    if (!respuesta.ok) {
        //si hubo errores
        mensajeEstado.style.color = 'red';
        mensajeEstado.textContent = resultado.errorers ? resultado.errorers.map(error=> error.msg).join(','): resultado.error;
    } else {
        mensajeEstado.style.color = 'yellow';
        mensajeEstado.textContent = resultado.mensaje;

        formRegistro.reset();

        //Para que quede el mensaje unos segundos
        setTimeout(() => {
        mensajeEstado.textContent = '';
      }, 3000);
    }

}

);
