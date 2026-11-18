const express = require('express');
const router = express.Router();

const {obtenerInventarioUsuario, equiparItemsUsuario} = require('../controllers/controlInventario');

router.get('/usuario/:idUsuario', obtenerInventarioUsuario);
router.put('/usuario/:idUsuario/equipar', equiparItemsUsuario);

module.exports = router;
