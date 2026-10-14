require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Para las peticiones

const conexion = require('./config/database');
const authRoutes = require('./router/auth.routes');

const app = express();

app.use(cors()); // Se habilitan los cors
app.use(express.json()); // Converte el JSON de la petición en req.body

app.use('/api', authRoutes);

app.listen(process.env.PORT, () => { // Iniciar el servidor en el puerto del .env
    console.log(`Servidor ejecutandose en puerto ${process.env.PORT}`);
});

/*
npm init -y
npm install express cors mysql2 bcrypt jsonwebtoken dotenv
*/