const express = require('express');
const router = express.Router(); // Rutas que van a app.js con /api

const authController = require('../controlador/auth.controller'); //Las funciones que van a ejecutar las rutas
const { validarToken } = require('../middleware/auth.middleware'); // Revisamos el token antes de la peticióñ

router.post('/registro', authController.registro);
router.post('/login', authController.login);
router.get('/perfil', validarToken, authController.perfil); // Solo en esta ruta se valida el token

module.exports = router;