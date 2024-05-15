const connection = require("../../db/db");
const moment = require('moment')

 //acceso principal index
const getIndex = async (req,res)=>{
    res.render('./index',{
        usuario: req.session.user
    })
}

 //ACCESO PRINCIPAL A VISTA PROYECTO

 const getIndexProyectos = async (req,res)=>{
    res.render('./proyectos/index',{
        usuario: req.session.user
    })
}

 //creacion proyecto
const setcrearproyecto = async (req,res)=>{
    try {
        let proyecto = req.body;
        connection.query(`INSERT INTO proyectos SET id_tipoproyecto = "${proyecto.id_tipoproyecto}", id_jefeproyecto = "${proyecto.id_jefeproyecto}", tipo_idea = "${proyecto.tipo_idea}", nombre_proyecto = "${proyecto.nombre_proyecto}", fecha_creacion = "${moment().format()}", descripcion = "${proyecto.descripcion}"`,(error,result)=>{
            if (error) {
                res.status(500).json({
                    mensaje: 'Error al Guardar',
                });
                console.log(error.message)
                return;
            }else{
                // res.status(200).json({
                //     mensaje: 'Proyecto Creado con Exito',
                //     result: result
                    
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
 const getIndexMisProyectos = async (req,res)=>{
    res.render('./misProyectos/index',{
        usuario: req.session.user
        // mensaje :'Inicio mis Proyectos'
    })
}





module.exports={
    getIndex,
    getIndexProyectos,
    getIndexMisProyectos,
    setcrearproyecto,
    
};