const fs = require('fs');
const path = require('path');
const rutaDatosUsuario = path.join(__dirname, '../data/usuarios.json');

const obtenerUsuarios = () => {
    const datosGuardados = fs.readFileSync(rutaDatosUsuario, 'utf-8');
    return JSON.parse(datosGuardados);
};

const registrarUsuario = (req, res) => {
    const { nombre, nombreUsuario, email, password } = req.body;
    let estado = 400;
    let respuesta = {};

    if (nombre && nombreUsuario && email && password) {
        const usuarios = obtenerUsuarios();
        const existe = usuarios.find(u => u.email === email || u.nombreUsuario === nombreUsuario);

        if (existe) {
            respuesta = { error: 'El email o nombre de usuario ya esta registrado.' };
        } else {
            const nuevoUsuario = {
                id: String(Date.now()),
                nombre,
                nombreUsuario,
                email,
                password,
                agilidad: 0,
                golpe: 0
            };

            usuarios.push(nuevoUsuario);
            fs.writeFileSync(rutaDatosUsuario, JSON.stringify(usuarios, null, 2));
            respuesta = { mensaje: 'Usuario registrado con exito!' };
            estado = 200;
        }
    } else {
        respuesta = { error: 'Campos incompletos' };
    }

    return res.status(estado).json(respuesta);
};

const verificarLogin = (req, res) => {
    const { nombreUsuario, password } = req.body;
    let estado = 400;
    let rta = {};

    if (nombreUsuario && password) {
        const usuarios = obtenerUsuarios();
        const usuarioEncontrado = usuarios.find(u =>
            (u.nombreUsuario === nombreUsuario || u.email === nombreUsuario) &&
            u.password === password
        );

        if (usuarioEncontrado) {
            estado = 200;
            rta = {
                mensaje: 'Bienvenido/a!',
                usuario: {
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    nombreUsuario: usuarioEncontrado.nombreUsuario,
                    email: usuarioEncontrado.email,
                    agilidad: usuarioEncontrado.agilidad ?? 0,
                    golpe: usuarioEncontrado.golpe ?? 0
                }
            };
        } else {
            rta = { error: 'Usuario o contrasena incorrectos' };
        }
    } else {
        rta = { error: 'Campos incompletos' };
    }

    return res.status(estado).json(rta);
};

module.exports = { registrarUsuario, verificarLogin };
