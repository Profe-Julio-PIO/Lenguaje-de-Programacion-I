const express = require('express');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


//rutas
app.use(require('./routes/index'));


app.listen(3000);
console.log('El servidor esta en el puerto 3000');