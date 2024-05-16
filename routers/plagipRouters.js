const express = require('express');
const router = express.Router();

const plagipController = require('../controllers/proyecto/plagipController');
const { route } = require('./proyectoRouters');

router.get('/',plagipController.getIndex);
router.get('/proyectos',plagipController.getIndexProyectos);
router.get('/misProyectos',plagipController.getIndexMisProyectos);
router.post('/proyectos',plagipController.setcrearproyecto);
//router.get('/proyectos',plagipController.getlistarproyectos);




module.exports = router;