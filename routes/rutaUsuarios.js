const express = require('express');
const router = express.Router();
//importar la funcion del controlador
const {registrarUsuario, verificarLogin} = require('../controllers/controlUsuarios');

// /api/usuarios/login
router.post('/login', verificarLogin);

/* Se utiliza express-validator para validar los datos de usuarios desde el backend */
const {body, validationResult} = require('express-validator');

const validarRegistro = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({min:2, max:30})
        .withMessage('El nombre debe tener entre 2 y 30 caracteres')
        .matches(/^[a-zA-Z]+$/) // caracteres permitidos
        .withMessage('El usuario solo puede contener letras'),
    
    body('nombreUsuario')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({min:2, max:20})
        .withMessage('El nombre de usuario debe tener entre 2 y 20 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/) // caracteres permitidos
        .withMessage('El usuario solo puede contener letras, números y _'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('El email no es valido')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligaroria')
        .isLength({min:8, max:100})
        .withMessage('La contraseña debe tener minimo 8 caracteres')
];

const devolverErroresValidacion = (req, res, next) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(422).json({errores: errores.array()});
    }

    next();
};

// cuando llega la peticion a "/registro" se llama validar registro
router.post(
    '/registro',
    validarRegistro,
    devolverErroresValidacion,
    registrarUsuario
);

router.post('/login', verificarLogin);

module.exports = router;
