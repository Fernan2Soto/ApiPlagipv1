const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyecto/proyectoController');

router.get('/listaCiclos',proyectoController.getciclos);
router.get('/listaTiposProyecto',proyectoController.gettipoproyecto);
router.get('/listaRate',proyectoController.getrate);
router.get('/listaPostulados',proyectoController.getpostulados);
router.get('/buscarPostulados/:id',proyectoController.getbuscarpostulados);
router.post('/nuevoPostulados',proyectoController.setpostulados);
router.put('/actualizarPostulados',proyectoController.updatepostulados);
router.delete('/eliminarPostulados/:id',proyectoController.deletepostulados);
router.get('/listaEstadosPostulados',proyectoController.getestadospostulados);
router.get('/buscarEstadosPostulados/:id',proyectoController.getbuscarestadopostulados);
router.post('/nuevoEstadoPostulados',proyectoController.setestadopostulados);
router.put('/actualizarEstadoPostulados',proyectoController.updateestadopostulados);
router.delete('/eliminarEstadoPostulados/:id',proyectoController.deleteestadopostulados);
router.get('/tiposUsuarios',proyectoController.gettiposusuario);
router.get('/listaProyectistas',proyectoController.getlistaproyectista);
router.post('/agregarProyectista',proyectoController.setaniadirproyectista);
router.post('/actualizarProyectista',proyectoController.updateproyectista);
//Proyecto
router.post('/crearProyecto',proyectoController.setcrearproyecto);
router.get('/listarProyectos',proyectoController.getlistarproyectos);
router.get('/listarProyectos/:id',proyectoController.getlistarproyectosencargados);
router.put('/actualizarcodigoinicio',proyectoController.updatecodigoinicio);
router.put('/actualizarcodigofin',proyectoController.updatecodigofin);
router.put('/actualizarciclo',proyectoController.updatecicloproyecto);
router.put('/actualizarEstados',proyectoController.updatestadoproyecto);
router.put('/actualizarRate',proyectoController.updaterateproyecto);
//SubProyectos
router.post('/crearSubProyecto',proyectoController.setcrearsubproyecto);
router.get('/listaSubProyectos/:id',proyectoController.getlistarsubproyectos);
router.get('/SubProyectos/:id/:id_proyectista',proyectoController.getlistarsubproyecto);
router.put('/FinalizarSubPRoyectos',proyectoController.updatefinalizarsubproyecto);
//Tareas subproyectos
router.post('/creartarea',proyectoController.setcreartarea);
router.put('/FinalizarTarea',proyectoController.updatefinalizartarea);


module.exports = router;