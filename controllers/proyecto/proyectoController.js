const connection = require("../../db/db");
const moment = require('moment')

//CRUD Tipo de proyecto 
const gettipoproyecto = async (req,res)=>{
    try {
        connection.query('SELECT * FROM tipo_proyecto',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//CRUD Ciclos del proyecto 
const getciclos = async (req,res)=>{
    try {
        connection.query('SELECT * FROM ciclo',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//CRUD Rate de proyecto 
const getrate = async (req,res)=>{
    try {
        connection.query('SELECT * FROM rate',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};


//CRUD Postualdos 
//Listar Todos
const getpostulados = async (req,res)=>{
    try {
        connection.query('SELECT * FROM postulados',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Buscar postualdo
const getbuscarpostulados = async (req,res)=>{
    try {
        let id_postulado = req.params.id
        connection.query(`SELECT * FROM postulados WHERE id = "${id_postulado}" `,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                if (result != 0) {
                    res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
                } else {
                    res.status(200).json({
                        id : 0,
                        nombre : "Sin Resultados"
                    })
                }
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Guardar Nuevo postulado
const setpostulados = async (req,res)=>{
    try {
        let postulado = req.body;
        connection.query(`INSERT INTO postulados SET nombre = "${postulado.nombre}"`,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json({
                    mensaje: 'Creado con Exito',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Actualizar Nombre Postulado 
const updatepostulados = async (req,res)=>{
    try {
        let postulado = req.body;
        //console.log(postulado)
        connection.query(`UPDATE postulados SET nombre = "${postulado.nombre}" WHERE id = "${postulado.id}"`,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json({
                    status : 200,
                    mensaje: 'Actualizado de Forma Correcta',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Eliminar postualdo
const deletepostulados = async (req,res)=>{
    try {
        let id_postulado = req.params.id
        //console.log(id_postulado);
        connection.query(`DELETE FROM postulados WHERE id = "${id_postulado}"`,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json({
                    mensaje: 'Eliminado Correctamente',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//CRUD Estados-Postualdos 
//Listar Todos los estados
const getestadospostulados = async (req,res)=>{
    try {
        connection.query('SELECT estados.id, postulados.nombre AS postulado, estados.nombre AS estado FROM estados INNER JOIN postulados ON postulados.id = estados.id_postulado ORDER BY estados.id_postulado ASC',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Buscar Estado-Postulado
const getbuscarestadopostulados = async (req,res)=>{
    try {
        let id = req.params.id
        connection.query(`SELECT estados.id, postulados.nombre AS postulado, estados.nombre AS estado FROM estados INNER JOIN postulados ON postulados.id = estados.id_postulado WHERE estados.id = "${id}" `,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                if (result != 0) {
                    res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
                } else {
                    res.status(200).json({
                        id : 0,
                        nombre : "Sin Resultados"
                    })
                }
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Guardar Nuevo estado-postulado
const setestadopostulados = async (req,res)=>{
    try {
        let estado = req.body;
        connection.query(`INSERT INTO estados SET id_postulado = "${estado.id_postulado}", nombre = "${estado.nombre}"`,(error,result)=>{
            if (error) {
                res.status(500).json({
                    mensaje: 'Error al Guardar',
                });
                console.log(error.message)
                return;
            }else{
                res.status(200).json({
                    mensaje: 'Creado con Exito',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Actualizar Nombre estado-Postulado 
const updateestadopostulados = async (req,res)=>{
    try {
        let estado = req.body;
        //console.log(estado)
        connection.query(`UPDATE estados SET id_postulado = "${estado.id_postulado}", nombre = "${estado.nombre}" WHERE id = "${estado.id}"`,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json({
                    mensaje: 'Actualizado de Forma Correcta',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Eliminar estado-postualdo
const deleteestadopostulados = async (req,res)=>{
    try {
        let id_estado = req.params.id
        //console.log(id_postulado);
        connection.query(`DELETE FROM estados WHERE id = "${id_estado}"`,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json({
                    mensaje: 'Eliminado Correctamente',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//CRUD Tipos de Usuarios Proyectos
//Listar Todos los tipos de usuario
const gettiposusuario = async (req,res)=>{
    try {
        connection.query('SELECT * FROM tipo_usuario_proyecto',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
}; 

//CRUD Proyectistas
//Listado Proyectistas
const getlistaproyectista = async (req,res)=>{
    try {
        connection.query('SELECT proyectistas.id as id_proyectista, users.name, tipo_usuario_proyecto.nombre_tipo FROM proyectistas INNER JOIN users ON users.id = proyectistas.id_usuario INNER JOIN tipo_usuario_proyecto ON tipo_usuario_proyecto.id = proyectistas.tipo_usuario',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Añadir Proyectista
const setaniadirproyectista = async (req,res)=>{
    try {
        let proyectista = req.body;
        connection.query(`INSERT INTO proyectistas SET id_usuario = "${proyectista.id_usuario}", tipo_usuario  = "${proyectista.tipo_usuario}"`,(error,result)=>{
            if (error) {
                res.status(500).json({
                    mensaje: 'Error al Guardar',
                });
                console.log(error.message)
                return;
            }else{
                res.status(200).json({
                    mensaje: 'Creado con Exito',
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Actualizar permisos Proyectistas
const updateproyectista = async (req,res)=>{
    try {
        let proyectista = req.body;
        console.log(proyectista)
        connection.query(`UPDATE proyectistas SET tipo_usuario = "${proyectista.id_tipo_usuario}" WHERE id_usuario = "${proyectista.id_usuario}"`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json({
                    mensaje: 'Actualizado de Forma Correcta',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}; 

//CRUD PROYECTOS
//Crear proyecto
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
                res.status(200).json({
                    mensaje: 'Proyecto Creado con Exito',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};
//Listar Proyectos
const getlistarproyectos = async (req,res)=>{
    try {
        connection.query('SELECT proyectos.id AS id_proyecto,tipo_proyecto.nombre AS tipo_proyecto,users.id AS id_usuario, users.name AS encargado_proyecto, proyectos.nombre_proyecto, proyectos.fecha_creacion, proyectos.codigo_inicio, proyectos.descripcion, proyectos.codigo_fin,ciclo.nombre AS nombre_ciclo, estados.nombre AS nombre_estado, rate.nombre AS nombre_rate FROM proyectos INNER JOIN tipo_proyecto ON tipo_proyecto.id = proyectos.id_tipoproyecto INNER JOIN users ON users.id = proyectos.id_jefeproyecto LEFT JOIN ciclo ON ciclo.id = proyectos.id_ciclo LEFT JOIN estados ON estados.id = proyectos.id_estado LEFT JOIN rate ON rate.id = proyectos.id_rateproyecto',(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Listar Proyecto por Encargados
const getlistarproyectosencargados = async (req,res)=>{
    try {
        let id_usuario = req.params.id
        connection.query(`SELECT proyectos.id AS id_proyecto,tipo_proyecto.nombre AS tipo_proyecto,users.id AS id_usuario, users.name AS encargado_proyecto, proyectos.nombre_proyecto, proyectos.fecha_creacion, proyectos.codigo_inicio, proyectos.descripcion, proyectos.codigo_fin,ciclo.nombre AS nombre_ciclo, estados.nombre AS nombre_estado, rate.nombre AS nombre_rate FROM proyectos INNER JOIN tipo_proyecto ON tipo_proyecto.id = proyectos.id_tipoproyecto INNER JOIN users ON users.id = proyectos.id_jefeproyecto LEFT JOIN ciclo ON ciclo.id = proyectos.id_ciclo LEFT JOIN estados ON estados.id = proyectos.id_estado LEFT JOIN rate ON rate.id = proyectos.id_rateproyecto WHERE users.id = "${id_usuario}" `,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
            
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Actualización y añadir informacion a Proyecto
//Codigo Inicio
const updatecodigoinicio = async (req,res)=>{
    try {
        let proyecto = req.body;
        console.log(proyecto)
        connection.query(`UPDATE proyectos SET codigo_inicio = "${proyecto.codigo}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }else{
                connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Agrega codigo de inicio", descripcion_historial = "Codigo ${proyecto.codigo}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);
                        return;
                    }else{
                        
                        res.status(200).json({
                            mensaje: 'Codigo Agregado de Forma Correcta',
                            result: result
                        });
                        return;
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}; 

//Codigo Final
const updatecodigofin = async (req,res)=>{
    try {
        let proyecto = req.body;
        //console.log(proyecto)
        connection.query(`UPDATE proyectos SET codigo_fin = "${proyecto.codigo}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }else{
                connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Agrega codigo de Final", descripcion_historial = "Codigo ${proyecto.codigo}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);
                        return;
                    }else{
                        res.status(200).json({
                            mensaje: 'Codigo Agregado de Forma Correcta',
                            result: result
                        });
                        return;
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}; 

//Ciclos 
const updatecicloproyecto = async (req,res)=>{
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
                                            res.status(200).json({
                                                mensaje: 'Ciclo Actualizado',
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
}; 

//Estados proyecto
const updatestadoproyecto = async (req,res)=>{
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
}; 

//RATE proyecto
const updaterateproyecto = async (req,res)=>{
    try {
        let proyecto = req.body;
        // console.log("Estado")
        // console.log(proyecto)
        connection.query(`SELECT * FROM rate`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }else{
                const rate = Object.values(JSON.parse(JSON.stringify(result)));
                // console.log(rate)
                connection.query(`SELECT * FROM rate_proyecto WHERE id_proyecto = "${proyecto.id_proyecto}" ORDER BY id DESC`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);
                        return;
                    }else{
                        const rate_proyecto = Object.values(JSON.parse(JSON.stringify(result)))
                        //console.log(rate_proyecto)
                        if (rate_proyecto.length != 0) {
                            connection.query(`UPDATE proyectos SET id_rateproyecto = "${proyecto.id_rate}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
                                if (error) {
                                    console.log(error)
                                    res.status(500).send(error.message);
                                    return;
                                }else{
                                    let elem = rate.find(e=> e.id == parseInt(proyecto.id_rate));
                                    //console.log(elem)
                                    connection.query(`UPDATE rate_proyecto SET fecha_fin_rate = "${moment().format()}" WHERE id = "${rate_proyecto[0].id}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                            }
                                        })
                                    connection.query(`INSERT INTO rate_proyecto SET id_proyecto = "${proyecto.id_proyecto}", id_rate = "${proyecto.id_rate}", fecha_inicio_rate = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }
                                    })
                                    connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Actualiza RATE", descripcion_historial = "RATE : ${elem.nombre} - ${elem.descripcion}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }else{
                                            res.status(200).json({
                                                mensaje: 'RATE Actualizado',
                                                result: result
                                            });
                                            return;
                                        }
                                    });
                                }
                            });
                        } else {
                            connection.query(`UPDATE proyectos SET id_rateproyecto = "${proyecto.id_rate}" WHERE id = "${proyecto.id_proyecto}"`,(error,result)=>{
                                if (error) {
                                    console.log(error)
                                    res.status(500).send(error.message);
                                    return;
                                }else{
                                    let elem = rate.find(e=> e.id == parseInt(proyecto.id_rate));
                                    //console.log(elem)
                                    connection.query(`INSERT INTO rate_proyecto SET id_proyecto = "${proyecto.id_proyecto}", id_rate = "${proyecto.id_rate}", fecha_inicio_rate = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }
                                    })
                                    connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${proyecto.id_proyecto}",id_proyectista = "${proyecto.id_proyectista}",titulo = "Agrega RATE", descripcion_historial = "RATE : ${elem.nombre} - ${elem.descripcion}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send(error.message);
                                            return;
                                        }else{
                                            res.status(200).json({
                                                mensaje: 'RATE Actualizado',
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
}; //seba   //tuyo
// plaza, casa
//CRUD SUBPROYECTOS
//Crear Subproyecto
const setcrearsubproyecto = async (req, res) =>{
    try {
        let subproyecto = req.body;
        connection.query(`INSERT INTO sub_proyectos SET id_proyecto = "${subproyecto.id_proyecto}", id_proyectista = "${subproyecto.id_proyectista}", id_estado_subproyecto = "${subproyecto.id_estado}", nombre_subproyecto = "${subproyecto.nombre}", descripcion_subproyecto = "${subproyecto.descripcion}", fecha_inicio = "${moment().format()}"`, (error, result) => {
            if (error) {
                res.json({
                    status: 500,
                    mensaje: 'Error al Guardar',
                });
                console.log(error.message);
                return;
            } else {
                connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${subproyecto.id_proyecto}",id_proyectista = "${subproyecto.id_proyectista}",titulo = "Creacion de SubProyecto : ${subproyecto.nombre}", descripcion_historial = "${subproyecto.descripcion}", fecha_registro = "${moment().format()}"`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);rr
                        return;
                    }else{
                        res.status(200).json({
                            mensaje: 'Subproyecto Creado con Exito',
                            result: result
                        });
                        return;
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//Listar SubProyectos por proyectista asignado
const getlistarsubproyectos = async (req,res)=>{
    try {
        const id_proyectista = req.params.id
        connection.query(`SELECT sub_proyectos.id AS id_subproyecto, users.name AS jefe_proyecto,proyectos.nombre_proyecto, sub_proyectos.nombre_subproyecto, sub_proyectos.descripcion_subproyecto,sub_proyectos.fecha_inicio, estados_tsp.nombre FROM sub_proyectos INNER JOIN proyectos ON proyectos.id = sub_proyectos.id_proyecto INNER JOIN proyectistas ON proyectistas.id = proyectos.id_jefeproyecto INNER JOIN users ON users.id = proyectistas.id_usuario INNER JOIN estados_tsp ON sub_proyectos.id_estado_subproyecto = estados_tsp.id WHERE sub_proyectos.id_proyectista = "${id_proyectista}"`,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                res.status(200).json(Object.values(JSON.parse(JSON.stringify(result))));
                return;
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const getlistarsubproyecto = async (req,res)=>{
    try {
        const id_subproyecto = req.params.id
        const id_proyectista = req.params.id_proyectista
        connection.query(`SELECT sub_proyectos.id AS id_subproyecto, proyectos.id AS id_proyecto, proyectos.nombre_proyecto, proyectos.descripcion, proyectos.fecha_creacion, proyectos.codigo_inicio, proyectos.codigo_fin,ciclo.nombre AS nombre_ciclo, estados.nombre AS nombre_estado, rate.nombre as nombre_rate, sub_proyectos.nombre_subproyecto, sub_proyectos.descripcion_subproyecto,sub_proyectos.fecha_inicio, sub_proyectos.fecha_fin FROM sub_proyectos INNER JOIN proyectos ON proyectos.id = sub_proyectos.id_proyecto INNER JOIN proyectistas ON proyectistas.id = proyectos.id_jefeproyecto INNER JOIN users ON users.id = proyectistas.id_usuario LEFT JOIN ciclo ON ciclo.id = proyectos.id_ciclo LEFT JOIN estados ON estados.id = proyectos.id_estado LEFT JOIN rate ON rate.id = proyectos.id_rateproyecto INNER JOIN estados_tsp ON estados_tsp.id = sub_proyectos.id_estado_subproyecto WHERE sub_proyectos.id = "${id_subproyecto}"`,(error,result)=>{
            if (error) {
                res.status(500).send(error.message);
                return;
            }else{
                const subproyectos = Object.values(JSON.parse(JSON.stringify(result)));
                connection.query(`SELECT * FROM tareas INNER JOIN estados_tsp ON estados_tsp.id = tareas.id_estadotarea WHERE tareas.id_subproyecto= "${id_subproyecto}"`,(error,result)=>{
                    if (error) {
                        res.status(500).send(error.message);
                        return;
                    }else{
                        const tareas = Object.values(JSON.parse(JSON.stringify(result)));
                        try {
                            connection.query(`SELECT * FROM historial_proyectos WHERE id_proyecto = "${subproyectos[0].id_proyecto}" AND id_proyectista = "${id_proyectista}" `,(error,result)=>{
                                if (error) {
                                    res.status(500).send(error.message);
                                    return;
                                }else{
                                    const historial = Object.values(JSON.parse(JSON.stringify(result)));
                                    res.status(200).json({
                                        subproyectos : subproyectos[0],
                                        tareas : tareas,
                                        historial : historial
                                    });
                                    return; 
                                }
                            });  
                        } catch (error) {
                            res.status(200).json({
                                subproyectos : [null],
                                tareas : [null],
                                historial : [null]
                            });
                            return; 
                        }
                    }
                });
                
            }
            //console.log(Object.values(JSON.parse(JSON.stringify(result))));
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

//Finalizar Sub-Proyecto
const updatefinalizarsubproyecto = async (req,res)=>{
    try {
        let subproyecto = req.body;
        connection.query(`SELECT * FROM sub_proyectos WHERE id = "${subproyecto.id_subproyecto}"`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            } else {
                const data_subproyecto = Object.values(JSON.parse(JSON.stringify(result)));
                console.log(data_subproyecto)
                connection.query(`UPDATE sub_proyectos SET fecha_fin = "${moment().format()}", id_estado_subproyecto = "3"  WHERE id= "${subproyecto.id_subproyecto}"`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);
                        return;
                    }
                })
                connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${subproyecto.id_proyecto}",id_proyectista = "${subproyecto.id_proyectista}",titulo = "Finalizacion SubProyecto : ${data_subproyecto[0].nombre_subproyecto}", descripcion_historial = "${subproyecto.nota}", fecha_registro = "${moment().format()}", fecha_inicio = "${data_subproyecto[0].fecha_inicio}", fecha_fin = "${moment().format()}"`,(error,result)=>{
                    if (error) {
                        console.log(error)
                        res.status(500).send(error.message);
                        return;
                    }else{
                        res.status(200).json({
                            status : "ok",
                            mensaje: 'SubProyecto Finalizado',
                            result: result
                        });
                        return;
                    }
                });
            }
        });
        
                
    } catch (error) {
        res.status(500).send(error.message);
    }
}; 

//Tareas SubProyectos
const setcreartarea = async (req, res) =>{
    try {
        let tarea = req.body;
        connection.query(`INSERT INTO tareas SET id_subproyecto = "${tarea.id_subproyecto}", id_estadotarea = "1", nombre_tarea = "${tarea.nombre_tarea}", descripcion = "${tarea.descripcion}", fecha_inicio_tarea = "${moment().format()}"`, (error, result) => {
            if (error) {
                res.status(500).json({
                    mensaje: 'Error al Guardar',
                });
                console.log(error.message);
                return;
            } else {
                res.status(200).json({
                    status: "ok",
                    mensaje: 'Tarea Creada',
                    result: result
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//Finalizar Tarea
const updatefinalizartarea = async (req,res)=>{
    try {
        let tarea = req.body;
        connection.query(`SELECT * FROM tareas WHERE id = "${tarea.id_tarea}"`,(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            } else {
                const data_tareas = Object.values(JSON.parse(JSON.stringify(result)));
                if (data_tareas.length != 0) {
                    connection.query(`UPDATE tareas SET id_estadotarea = "3", fecha_fin_tareas = "${moment().format()}" WHERE id= "${tarea.id_tarea}"`,(error,result)=>{
                        if (error) {
                            console.log(error)
                            res.status(500).send(error.message);
                            return;
                        }
                    })
                    connection.query(`INSERT INTO historial_proyectos SET id_proyecto = "${tarea.id_proyecto}",id_proyectista = "${tarea.id_proyectista}",titulo = "Tarea Agregada", descripcion_historial = "${data_tareas[0].nombre_tarea} - ${data_tareas[0].descripcion}", fecha_registro = "${moment().format()}", fecha_inicio = "${data_tareas[0].fecha_inicio_tarea}",fecha_fin = "${moment().format()}"`,(error,result)=>{
                        if (error) {
                            console.log(error)
                            res.status(500).send(error.message);
                            return;
                        }else{
                            res.status(200).json({
                                status : "ok",
                                mensaje: 'Tarea Finalizada',
                                result: result
                            });
                            return;
                        }
                    });   
                } else {
                    res.status(200).json({
                        status : "no",
                        mensaje: 'No se Encontro Tareas',
                        result: result
                    });
                    return;
                }
                
                
            }
        })
        
        
        
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}; 






module.exports={
    getciclos,
    gettipoproyecto,
    getrate,
    getpostulados,
    getbuscarpostulados,
    setpostulados,
    updatepostulados,
    deletepostulados,
    getestadospostulados,
    getbuscarestadopostulados,
    setestadopostulados,
    updateestadopostulados,
    deleteestadopostulados,
    gettiposusuario,
    getlistaproyectista,
    setaniadirproyectista,
    updateproyectista,
    setcrearproyecto,
    getlistarproyectos,
    getlistarproyectosencargados,
    updatecodigoinicio,
    updatecodigofin,
    updatecicloproyecto,
    updatestadoproyecto,
    updaterateproyecto,
    setcrearsubproyecto,
    getlistarsubproyectos,
    getlistarsubproyecto,
    setcreartarea,
    updatefinalizartarea,
    updatefinalizarsubproyecto
};