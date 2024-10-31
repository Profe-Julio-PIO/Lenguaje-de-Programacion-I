var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  /*const datos = {
    titulo: 'Articulos disponibles a la fecha',
    articulos: [
      {codigo: 1, precio: 35000, descripcion: 'teclado DELL MS112'},
      {codigo: 2, precio: 70000, descripcion: 'pantalla HP 14"'},
      {codigo: 3, precio: 150000, descripcion: 'memoria SSD 128 GB Kingston'}
    ],
    descuento: {jueves: '15%', sabado: '40%'}
  };
  res.render('index', datos);*/
});

module.exports = router;
