const express = require('express');
const router = express.Router();
//importar la funcion del controlador
const {registrarUsuario, verificarLogin} = require('../controllers/controlUsuarios');

// /api/usuarios/registro
router.post('/registro', registrarUsuario);

// /api/usuarios/login
router.post('/login', verificarLogin);

module.exports = router;
