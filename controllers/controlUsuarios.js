const fs = require('fs'); //file system, para leer archivos.
const path = require('path');
const rutaDatosUsuario = path.join(__dirname, '../data/usuarios.json');

const obtenerUsuarios = () => {
    const datosGuardados = fs.readFileSync(rutaDatosUsuario, 'utf-8');
    return JSON.parse(datosGuardados);
}


//funcion para registrar usuarios
const registrarUsuario = (req, res) => {
    const { nombre, nombreUsuario, email, password } = req.body;

    //para guardar la respuesta final
    let estado = 400; //error del cliente
    let respuesta = {};

    //verificar que todos los campos esten completos
    if (nombre && nombreUsuario && email && password) {
        const usuarios = obtenerUsuarios();

        //verificar si ya existe el usuario y si esta registrado el email
        const existe = usuarios.find(u => u.email === email || u.nombreUsuario === nombreUsuario);

        if (existe) {
            respuesta = { error: 'El email o nombre de usuario ya está registrado.' };
        } else {
            //si no existe se crea el usuario
            const nuevoUsuario = {
                id: String(Date.now()),
                nombre,
                nombreUsuario,
                email,
                password
            };

            //Se agrega a la lista en memoria, y luego se escribe en el archivo .json
            usuarios.push(nuevoUsuario);
            fs.writeFileSync('./data/usuarios.json', JSON.stringify(usuarios, null, 2));

            respuesta = { mensaje: '¡Usuario registrado con éxito!' };
            estado = 200; //exito
        }
    } else {
        respuesta = { error: "Campos incompletos" };
    }

    return res.status(estado).json(respuesta);
};


//funcion para loguearse
const verificarLogin = (req, res) => {
    const { nombreUsuario, password } = req.body;
    let estado = 400;
    let rta = {};

    if (nombreUsuario && password) {
        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(u => u.nombreUsuario === nombreUsuario && u.password===password);

        if (usuarioEncontrado) {
            estado = 200;
            rta = {
                mensaje: 'Bienvenido/a!', usuario: {
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    nombreUsuario: usuarioEncontrado.nombreUsuario,
                    email: usuarioEncontrado.email
                }
            }
        }else{
            rta={error:'Usuario o contraseña incorrectos'};
        }

    }else{
        rta={error: 'Campos incompletos'};
    }

    return res.status(estado).json(rta);
}

module.exports = { registrarUsuario, verificarLogin };
