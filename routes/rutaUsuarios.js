const express = require('express');
const router = express.Router();
//importar la funcion del controlador
const {registrarUsuario} = require('../controllers/controlUsuarios');

router.post('/registro', registrarUsuario);

module.exports = router;
