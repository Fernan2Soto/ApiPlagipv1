const express = require('express');
const router = express.Router();




const plagipController = require('../controllers/proyecto/plagipController');
const { route } = require('./proyectoRouters');

router.get('/',plagipController.getIndex);
router.get('/proyectos',plagipController.getIndexProyectos);
router.get('/misProyectos',plagipController.getIndexMisProyectos);
router.post('/proyectos',plagipController.setcrearproyecto);

router.get('/subproyectos/:id',plagipController.getsubproyectos);
router.post('/actualizarciclo',plagipController.postactualizarciclo);
router.post('/actualizarestados',plagipController.postactualizarestado);
router.post('/actualizarate',plagipController.postactualizarrate);
router.post('/crearsubproyecto',plagipController.postcrearsubproyecto);
router.post('/actualizarcodigoinicio',plagipController.updatecodigoinicio);
router.post('/actualizarcodigofin',plagipController.updatecodigofin);

router.get('/detallesubproyecto/:id',plagipController.getlistarsubproyectostareas);



module.exports = router;