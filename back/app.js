require('dotenv').config();

const express = require('express');
const cors = require('cors');

const conexion = require('./config/database');
const authRoutes = require('./router/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${process.env.PORT}`);
});

/*
npm init -y
npm install express cors mysql2 bcrypt jsonwebtoken dotenv
*/