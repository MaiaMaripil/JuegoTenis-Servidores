const fs = require('fs');
const path = require('path');

const rutaDatosUsuario = path.join(__dirname,'../data/usuarios.json');
const rutaInventario = path.join(__dirname, '../data/inventario.json');

const obtenerInventarioUsuario = (req, res) =>{
    const idUsuario = req.params.idUsuario;

    const usuarios = JSON.parse(fs.readFileSync(rutaDatosUsuario, 'utf-8'));
    const inventarioCatalogo = JSON.parse(fs.readFileSync(rutaInventario, 'utf-8'));

    const usuario = usuarios.find(usuarioActual => String(usuarioActual.id) === String(idUsuario));

    if (!usuario){
        return res.status(404).json({error:'Usuario no encontrado'});
    }

    const idsInventario = usuario.inventario ?? {
        guantes: [],
        zapatos: [],
        equipados: {}
    };

    const guantes = idsInventario.guantes
    .map( id => inventarioCatalogo.guantes.find(objeto => objeto.id === id))
    .filter(Boolean);
    
    const zapatos = idsInventario.zapatos
    .map(id => inventarioCatalogo.zapatos.find(objeto=> objeto.id === id))
    .filter(Boolean);

    return res.status(200).json({
        guantes,
        zapatos,
        equipados: idsInventario.equipados
    });
};

const equiparItemsUsuario = (req, res) => {
    const { idUsuario } = req.params;
    const { guante, zapato } = req.body;

    const usuarios = JSON.parse(fs.readFileSync(rutaDatosUsuario, 'utf-8'));
    const inventarioCatalogo = JSON.parse(fs.readFileSync(rutaInventario, 'utf-8'));
    const usuario = usuarios.find(usuarioActual =>
        String(usuarioActual.id) === String(idUsuario)
    );

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const guanteSeleccionado = inventarioCatalogo.guantes.find(item => item.id === guante);
    const zapatoSeleccionado = inventarioCatalogo.zapatos.find(item => item.id === zapato);

    if (!guanteSeleccionado || !zapatoSeleccionado) {
        return res.status(400).json({ error: 'Uno o más items no existen' });
    }

    usuario.inventario.equipados = { guante, zapato };
    usuario.golpe = guanteSeleccionado.golpe;
    usuario.agilidad = zapatoSeleccionado.agilidad;
    fs.writeFileSync(rutaDatosUsuario, JSON.stringify(usuarios, null, 2));

    return res.status(200).json({
        mensaje: 'Items equipados correctamente',
        equipados: usuario.inventario.equipados,
        golpe: usuario.golpe,
        agilidad: usuario.agilidad
    });
};

module.exports = { obtenerInventarioUsuario, equiparItemsUsuario };
