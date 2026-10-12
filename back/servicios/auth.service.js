const conexion = require('../config/database');

// De momento sin los ? y poniendo datos de ejemplo manuales como se anotó en clase
function registrarUsuario(callback) {
    const sql = `INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ('Yo mero', 'yo@gmail.com', '1234', 'Admin')`;

    conexion.query(sql, (error, resultado) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, resultado);
    });
}

// Consulta para buscar el usuario por correo para el login
function buscarPorCorreo(correo, callback) {
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';

    conexion.query(sql, [correo], (error, resultados) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, resultados);
    });
}

// Consulta para buscar el usuario por id
function buscarPorId(id, callback) {
    const sql = 'SELECT * FROM usuarios WHERE id = ?';

    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, resultados);
    });
}

module.exports = {
    registrarUsuario,
    buscarPorCorreo,
    buscarPorId
};