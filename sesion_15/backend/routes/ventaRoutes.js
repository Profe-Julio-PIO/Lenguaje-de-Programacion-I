const express = require('express'); 
const{ prueba } = require('../controllers/ventaController.js');

const router = express.Router();

router.get('/prueba', prueba);

module.exports = router;