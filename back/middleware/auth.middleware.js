const jwt = require('jsonwebtoken');

function validarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            mensaje: 'Sin token'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = datos;

        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: error.name === 'TokenExpiredError'
                ? 'El token caducado'
                : 'Token inválido'
        });
    }
}

module.exports = { validarToken };