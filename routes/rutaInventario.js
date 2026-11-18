const express = require('express');
const router = express.Router();

const { obtenerInventarioUsuario } = require('../controllers/controlInventario');

router.get('/usuario/:idUsuario', obtenerInventarioUsuario);

module.exports = router;
