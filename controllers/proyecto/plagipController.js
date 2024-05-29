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

                    if (error) {
                        res.status(500).json({
                            mensaje: 'Error al Guardar',
                        });
                        console.log(error.message)
                        return;
                    }
                    res.render('./proyectos/index', {
                        usuario: req.session.user,
                        tipoProyecto: tipoProyecto, //cargamos la informacion de la vista y agregamos el resultado de la consulta a la misma vista
                        encargados: encargados,//cargamos la informacion de la vista y agregamos el resultado de la consulta a la misma vista
                        tablaProyectos: tablaProyectos//cargamos la informacion de la vista y agregamos el resultado de la consulta a la misma vista
                    })

                })
            })


        });
    } catch (error) {
        res.status(500).send(error.message)
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

    try {


        connection.query(`SELECT proyectos.id AS id_proyecto,tipo_proyecto.nombre AS tipo_proyecto,users.id AS id_usuario, users.name AS encargado_proyecto, proyectos.nombre_proyecto, proyectos.fecha_creacion, proyectos.codigo_inicio, proyectos.descripcion, proyectos.codigo_fin,ciclo.nombre AS nombre_ciclo, estados.nombre AS nombre_estado, rate.nombre AS nombre_rate FROM proyectos INNER JOIN tipo_proyecto ON tipo_proyecto.id = proyectos.id_tipoproyecto INNER JOIN users ON users.id = proyectos.id_jefeproyecto LEFT JOIN ciclo ON ciclo.id = proyectos.id_ciclo LEFT JOIN estados ON estados.id = proyectos.id_estado LEFT JOIN rate ON rate.id = proyectos.id_rateproyecto WHERE users.id = "${req.session.user.user_id}" `, (error, result) => {
            const tablamisProyectos = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta 


            connection.query(`SELECT users.id, users.name as nombre, tipo_usuario_proyecto.nivel_acceso FROM users inner join proyectistas on users.id=proyectistas.id_usuario inner join tipo_usuario_proyecto on proyectistas.tipo_usuario=tipo_usuario_proyecto.id where tipo_usuario_proyecto.nombre_tipo = "Proyectista"`, (error, result) => {
                const nombreProyectista = Object.values(JSON.parse(JSON.stringify(result)));
                //evaluando lo que me trae la consulta 



                res.render('./misProyectos/index', {

                    usuario: req.session.user,
                    nombreProyectista: nombreProyectista,
                    tablamisProyectos: tablamisProyectos,
                    // mensaje :'Inicio mis Proyectos'
                })

            })
        });

    } catch (error) {
        res.status(500).send(error.message)
    }
}
////////////////////////////////////////////////////////////////////////////
//Acceso al detalle de los subproyectos
const getsubproyectos = async (req, res) => {

    try {


        const id_proc = req.params.id

        connection.query(`SELECT proyectos.id AS id_proyecto,tipo_proyecto.nombre AS tipo_proyecto,users.id AS id_usuario, users.name AS encargado_proyecto, proyectos.nombre_proyecto, proyectos.fecha_creacion, proyectos.codigo_inicio, proyectos.descripcion, proyectos.codigo_fin,ciclo.nombre AS nombre_ciclo, estados.nombre AS nombre_estado, rate.nombre AS nombre_rate FROM proyectos INNER JOIN tipo_proyecto ON tipo_proyecto.id = proyectos.id_tipoproyecto INNER JOIN users ON users.id = proyectos.id_jefeproyecto LEFT JOIN ciclo ON ciclo.id = proyectos.id_ciclo LEFT JOIN estados ON estados.id = proyectos.id_estado LEFT JOIN rate ON rate.id = proyectos.id_rateproyecto WHERE proyectos.id ="${id_proc}"`, (error, result) => {
            const nombreProyecto = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta

            connection.query(`SELECT * FROM ciclo`, (error, result) => {
                const tiposCiclos = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta

                connection.query(`SELECT * FROM estados_tsp`, (error, result) => {
                    const tipoEstados = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta

                    connection.query(`SELECT * FROM rate`, (error, result) => {
                        const tipoRate = Object.values(JSON.parse(JSON.stringify(result))); //evaluando lo que me trae la consulta

                    console.log(nombreProyecto);

                        res.render('./misProyectos/vistamisproyecto', {
                            usuario: req.session.user,
                            nombreProyecto: nombreProyecto,
                            id_proc: id_proc,
                            tiposCiclos: tiposCiclos,
                            tipoEstados: tipoEstados,
                            tipoRate: tipoRate
                        })
                    })
                })
            })
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


////////////////////////////////////////////////////
//Post actualizar ciclos

const postactualizarciclo = async (req, res) => {    
    try {
        let proyecto = req.body;
        //console.log(proyecto)
        connection.query(`SELECT * FROM ciclo`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }else{
                const ciclo = Object.values(JSON.parse(JSON.stringify(result)));
                connection.query(`SELECT * FROM ciclo_proyecto WHERE id_proyecto = "${proyecto.id_proyecto}" ORDER BY id DESC`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);
                        return;
                    }else{
                        const ciclo_proyecto = Object.values(JSON.parse(JSON.stringify(result)))
                        //console.log(ciclo_proyecto)
                        if (ciclo_proyecto.length != 0) {
                            connection.query(`UPDATE proyectos SET id_ciclo = "${proyecto.id_ciclo}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
                                if (error) {
                                    console.log(error)
                                    res.status(500).send(error.message);
                                    return;
                                }else{
                                    let elem = ciclo.find(e=> e.id == parseInt(proyecto.id_ciclo));
                                    //console.log(elem)
                                    connection.query(`UPDATE ciclo_proyecto SET fecha_fin_ciclo = "${moment().format()}" WHERE id = "${ciclo_proyecto[0].id}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                            }
                                        })
                                    connection.query(`INSERT INTO ciclo_proyecto SET id_proyecto = "${proyecto.id_proyecto}", id_ciclo = "${proyecto.id_ciclo}", fecha_inicio_ciclo = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }
                                    })
                                    connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Actualiza Ciclo", descripcion_historial = "Ciclo : ${elem.nombre}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }else{
                                            res.status(200).json({
                                                mensaje: 'Ciclo Actualizado',
                                                result: result
                                            });
                                            return;
                                        }
                                    });
                                }
                            });
                        } else {
                            connection.query(`UPDATE proyectos SET id_ciclo = "${proyecto.id_ciclo}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
                                if (error) {
                                    console.log(error)
                                    res.status(500).send(error.message);
                                    return;
                                }else{
                                    let elem = ciclo.find(e=> e.id == parseInt(proyecto.id_ciclo));
                                    //console.log(elem)
                                    connection.query(`INSERT INTO ciclo_proyecto SET id_proyecto = "${proyecto.id_proyecto}", id_ciclo = "${proyecto.id_ciclo}", fecha_inicio_ciclo = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }
                                    })
                                    connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Agrega Ciclo", descripcion_historial = "Ciclo : ${elem.nombre}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }else{
                                            // res.status(200).json({
                                            //     mensaje: 'Ciclo Actualizado',
                                            //     result: result
                                            // });
                                            console.log('ciclo actualizado con exito')
                                            res.redirect('back')
                                             return;

                                        }
                                    });
                                }
                            });
                        }
                    }
                })
            }
        })
        
    } catch (error) {
        res.status(500).send(error.message);
    }


}

////////////////////////////////////////////////////
//Post actualizar estados

const postactualizarestado=async(req, res)=>{

    try {
        let proyecto = req.body;
        // console.log("Estado")
        // console.log(proyecto)
        connection.query(`SELECT estados.id AS id, estados.nombre AS nombre_estado, postulados.nombre AS nombre_postulado FROM estados INNER JOIN postulados ON postulados.id = estados.id_postulado`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }else{
                const estados = Object.values(JSON.parse(JSON.stringify(result)));
                // console.log(estados)
                connection.query(`SELECT * FROM estados_proyectos WHERE id_proyecto = "${proyecto.id_proyecto}" ORDER BY id DESC`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);
                        return;
                    }else{
                        const estado_proyecto = Object.values(JSON.parse(JSON.stringify(result)))
                        //console.log(estado_proyecto)
                        if (estado_proyecto.length != 0) {
                            connection.query(`UPDATE proyectos SET id_estado = "${proyecto.id_estado}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
                                if (error) {
                                    console.log(error)
                                    res.status(500).send(error.message);
                                    return;
                                }else{
                                    let elem = estados.find(e=> e.id == parseInt(proyecto.id_estado));
                                    //console.log(elem)
                                    connection.query(`UPDATE estados_proyectos SET fecha_fin_estado = "${moment().format()}" WHERE id = "${estado_proyecto[0].id}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                            }
                                        })
                                    connection.query(`INSERT INTO estados_proyectos SET id_proyecto = "${proyecto.id_proyecto}", id_estado = "${proyecto.id_estado}", fecha_inicio_estado = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }
                                    })
                                    connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Actualiza Estado", descripcion_historial = "Estado : ${elem.nombre_postulado} - ${elem.nombre_estado}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }else{
                                            res.status(200).json({
                                                status : "ok",
                                                mensaje: 'Estado Actualizado',
                                                result: result
                                            });
                                            return;
                                        }
                                    });
                                }
                            });
                        } else {
                            connection.query(`UPDATE proyectos SET id_estado = "${proyecto.id_estado}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
                                if (error) {
                                    console.log(error)
                                    res.status(500).send(error.message);
                                    return;
                                }else{
                                    let elem = estados.find(e=> e.id == parseInt(proyecto.id_estado));
                                    //console.log(elem)
                                    connection.query(`INSERT INTO estados_proyectos SET id_proyecto = "${proyecto.id_proyecto}", id_estado = "${proyecto.id_estado}", fecha_inicio_estado = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }
                                    })
                                    connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Agrega Estado", descripcion_historial = "Estado : ${elem.nombre_postulado} - ${elem.nombre_estado}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }else{
                                            res.status(200).json({
                                                status : "ok",
                                                mensaje: 'Estado Actualizado',
                                                result: result
                                            });
                                            return;
                                        }
                                    });
                                }
                            });
                        }
                    }
                })
            }
        })
        
    } catch (error) {
        res.status(500).send(error.message);
    }

}



module.exports = {
    getIndex,
    getIndexProyectos,
    getIndexMisProyectos,
    setcrearproyecto,
    getsubproyectos,
    postactualizarciclo,
    postactualizarestado

};