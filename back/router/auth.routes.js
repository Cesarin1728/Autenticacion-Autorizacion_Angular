const express = require('express');
const router = express.Router();
const authController = require('../controlador/auth.controller');
const { validarToken } = require('../middleware/auth.middleware');

router.post('/registro', authController.registro);
router.post('/login', authController.login);
router.get('/perfil', validarToken, authController.perfil);

module.exports = router;