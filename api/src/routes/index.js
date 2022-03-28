const { Router } = require('express');
const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs.js')
const temperaments = require('./temperaments.js')

const router = Router();
router.use(express.json())
// Configurar los routers

router.use('/dogs', dogs);
router.use('/temperaments', temperaments)

module.exports = router;
