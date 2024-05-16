const connection = require("../../db/db");
const moment = require('moment')

//acceso principal index
const getIndex = async (req, res) => {
    res.render('./index', {
        usuario: req.session.user
    })
}

//ACCESO PRINCIPAL A VISTA PROYECTO

const getIndexProyectos = async (req, res) => {

    try {        
    
    connection.query('SELECT * FROM tipo_proyecto', (error, result) => {
        const tipoProyecto = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta 


        connection.query('SELECT proyectistas.id as idproyectista, users.name as nombreproyectista, users.email as emailproyectista FROM proyectistas inner join users on proyectistas.id_usuario = users.id ;', (error, result) => {
            const encargados = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta 

            connection.query('SELECT proyectos.id AS id_proyecto,tipo_proyecto.nombre AS tipo_proyecto,users.id AS id_usuario, users.name AS encargado_proyecto, proyectos.nombre_proyecto, proyectos.fecha_creacion, proyectos.codigo_inicio, proyectos.descripcion, proyectos.codigo_fin,ciclo.nombre AS nombre_ciclo, estados.nombre AS nombre_estado, rate.nombre AS nombre_rate FROM proyectos INNER JOIN tipo_proyecto ON tipo_proyecto.id = proyectos.id_tipoproyecto INNER JOIN users ON users.id = proyectos.id_jefeproyecto LEFT JOIN ciclo ON ciclo.id = proyectos.id_ciclo LEFT JOIN estados ON estados.id = proyectos.id_estado LEFT JOIN rate ON rate.id = proyectos.id_rateproyecto', (error, result) => {
            const tablaProyectos = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta 
                
                if(error){
                    res.status(500).json({
                    mensaje: 'Error al Guardar',
                    });
                    console.log(error.message)
                    return;
                }               
                res.render('./proyectos/index', {
                    usuario: req.session.user,
                    tipoProyecto: tipoProyecto, //cargamos la informacion de la vista y agregamos el resultado de la consulta a la misma vista
                    encargados: encargados,
                    tablaProyectos: tablaProyectos
                })

            })
        })


    });
} catch (error) {
        
}
}

//creacion proyecto
const setcrearproyecto = async (req, res) => {
    try {
        let proyecto = req.body;
        connection.query(`INSERT INTO proyectos SET id_tipoproyecto = "${proyecto.id_tipoproyecto}", id_jefeproyecto = "${proyecto.id_jefeproyecto}", tipo_idea = "${proyecto.tipo_idea}", nombre_proyecto = "${proyecto.nombre_proyecto}", fecha_creacion = "${moment().format()}", descripcion = "${proyecto.descripcion}"`, (error, result) => {
            if (error) {
                res.status(500).json({
                    mensaje: 'Error al Guardar',
                });
                console.log(error.message)
                return;
            } else {
                // res.status(200).json({
                //     mensaje: 'Proyecto Creado con Exito',
                //     // result: res

                // });
                console.log('proyecto creado con exito')
                res.redirect('back')
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};




//acceso principal mis proyectos
const getIndexMisProyectos = async (req, res) => {
    res.render('./misProyectos/index', {
        usuario: req.session.user
        // mensaje :'Inicio mis Proyectos'
    })
}





module.exports = {
    getIndex,
    getIndexProyectos,
    getIndexMisProyectos,
    setcrearproyecto,

};