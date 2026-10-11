const jwt = require('jsonwebtoken');
const authService = require('../servicios/auth.service');

// Controlador de Registro
function registro(req, res) {
    // De momento sin hash y con datos manuales en la consulta
    authService.registrarUsuario((error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error en la comunicación'
            });
        }
        res.status(201).json({
            mensaje: 'Usuario registrado'
        });
    });
}

// Controlador de Login
function login(req, res) {
    const { correo, contrasena } = req.body;

    authService.buscarPorCorreo(correo, (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const usuario = resultados[0];

        // De momento sin hash, se valida el string directo
        const passwordValido = (contrasena === usuario.contrasena);

        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            token: token,
            nombre: usuario.nombre,
            rol: usuario.rol
        });
    });
}

module.exports = {
    registro,
    login
};