const express = require('express');
const dotenv = require('dotenv');
//const cors = require('cors');
const conectarDB = require('./config/db');

const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config()


app.use (express.json());
conectarDB();

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);


app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
