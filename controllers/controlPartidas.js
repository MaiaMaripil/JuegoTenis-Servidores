const fs = require('fs');
const path = require('path');
const rutaDatosPartidas = path.join(__dirname, '../data/partidas.json');

//el id usuario, la cantidad y el from entran por parametro en req.
const mostrarPartidas = (req, res) => {
    const idUsuarioBuscado = req.params.idUsuario;
    const datosPartidas = JSON.parse(fs.readFileSync(rutaDatosPartidas, 'utf-8'));

    const cant = parseInt(req.query.cantidad) || 10;
    const desde = parseInt(req.query.from) || 0;

    const inicio = desde;
    const fin = desde + cant;

    let estado = 404;  //en caso de no encontrar partidas
    let rta = { mensaje: 'error'};

    const partidasUsuario = datosPartidas.filter(p => p.idUsuario === idUsuarioBuscado);

    if (partidasUsuario.length>0) {
        estado=200;
        const partidasPorCant = partidasUsuario.slice(inicio, fin);
        rta = {
            totalPartidas: partidasUsuario.length,
            mensaje: partidasPorCant
        }
    } 

    return res.status(estado).json(rta);
}

const mostrarDetallePartida=(req, res) =>{
    const partidadBuscada=req.params.idPartida;
    const datosPartidas=JSON.parse(fs.readFileSync(rutaDatosPartidas, 'utf-8'));
 
    const partida=datosPartidas.find(p => String(p.idPartida)=== String(partidadBuscada));

    let estado=404;
    let rta= {mensaje: 'Partida no encontrada'};

    if(partida){
        estado=200;
        rta={mensaje: partida};
    }

    return res.status(estado).json(rta);
}

const modificarNombrePartida=(req, res) =>{
    const partidadBuscada=req.params.idPartida;
    const datosPartidas=JSON.parse(fs.readFileSync(rutaDatosPartidas, 'utf-8'));

    const nuevoNombre=req.body.nombrePartida;

    let estado=404;
    let rta ={mensaje:'No se encontro la partida'};

    if(nuevoNombre){
        const partida=datosPartidas.find(p => String(p.idPartida)=== String(partidadBuscada));
        console.log("se encontro la partida")
        
        if(partida){
           partida.nombrePartida= nuevoNombre;

            fs.writeFileSync(rutaDatosPartidas, JSON.stringify(datosPartidas, null, 2), 'utf-8');
            estado=200;
            rta={mensaje: 'Nombre modificado con exito'};
        }
    }else{
        estado=400;
        rta={mensaje: 'Nombre no valido'};
    }

    return res.status(estado).json(rta);
}

module.exports={mostrarPartidas, mostrarDetallePartida, modificarNombrePartida};
