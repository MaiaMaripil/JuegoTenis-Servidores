const express=require('express');
const router= express.Router();

const {mostrarPartidas, mostrarDetallePartida}=require('../controllers/controlPartidas');


//Ruta dinamica, se pasa el id del Usuario y el id de la partida respectivamente
router.get('/usuario/:idUsuario', mostrarPartidas);
router.get('/detallePartida/:idPartida', mostrarDetallePartida);

module.exports=router;