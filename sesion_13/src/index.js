const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const userRoutes = require('./routes/user');

const app = express();

const port = process.env.PORT || 8088;


//middleware
app.use(express.json());
app.use('/api', userRoutes);


//rutas
app.get('/', (req, res)=>{
    res.send('Bienvenido a la API de Lenguaje de Programación I')
});


//Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('Conectado a MongoDB Atlas'))
.catch((error)=> console.error(error));

app.listen(port, () => console.log('El servidor se escucha en el puerto: ',port));