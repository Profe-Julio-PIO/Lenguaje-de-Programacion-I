const express = require('express'); 
const{ prueba, registrar, confirmar } = require('../controllers/usuarioController.js');

const router = express.Router();

router.get('/prueba', prueba);
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);

module.exports = router;