const mysql = require('mysql2');

const conexion = mysql.createConnection({ //Creamos la conexión con los datos del .env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Abre la conexión y dice si salió mal
conexion.connect((error) => {
    if (error) {
        console.log('Error de conexion: ', error);
        return;
    }
    console.log("Conectado");
});

// Exportamos la conexión para usarla en otros archivos
module.exports = conexion;