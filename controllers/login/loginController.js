const connection = require("../../db/db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

//CRUD Login
//Busqueda de Usuario 
//layout : false,
const getlogin = async (req,res)=>{
    res.render('./login/login',{
        layout : false,
    })
}

const setloginusuario = async (req,res)=>{ 
    try {
        let usuario =  req.body
        console.log("Usuario Logeado")
        console.log(usuario)
        //console.log(usuario)
        connection.query(`SELECT * FROM users WHERE email = "${usuario.email}"`,async(error,result)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }
            const data_user = Object.values(JSON.parse(JSON.stringify(result))); 
            if (data_user.length != 0) {
                if (await bcrypt.compare(usuario.pass, data_user[0].password )) {
                    connection.query(`SELECT proyectistas.id as id_proyectista,users.id as id_usuario, users.name, tipo_usuario_proyecto.nombre_tipo, tipo_usuario_proyecto.nivel_acceso FROM proyectistas INNER JOIN users ON users.id = proyectistas.id_usuario INNER JOIN tipo_usuario_proyecto ON tipo_usuario_proyecto.id = proyectistas.tipo_usuario WHERE users.id = "${data_user[0].id}"`,(error,result)=>{
                        if (error) {
                            res.status(500).send(error.message);
                            return;
                        }else{
                            const data_proyectista = Object.values(JSON.parse(JSON.stringify(result))); 
                            const data_user ={
                                user_id : data_proyectista[0].id,
                                username : data_proyectista[0].name,
                            }
                            const data_token = jwt.sign(data_user, process.env.TOKEN,{
                                expiresIn : 60 * 30
                            })
                            console.log(data_token)
                            if (data_proyectista.length != 0 ) {
                                res.status(200).json({
                                    login : "ok" ,
                                    user : Object.values(JSON.parse(JSON.stringify(result))),
                                    token : data_token
                                });
                                return;  
                            }
                            res.status(200).json({
                                login : "no",
                                mensaje : "Usuario sin acceso"
                            });
                            return;  
                            
                        }
                        //console.log(Object.values(JSON.parse(JSON.stringify(result))));
                        
                    });
                } else {
                    res.status(401).json({
                        login : "no" ,
                        mensaje : "Clave Incorrecta"
                    });
                    return;
                }
            } else {
                res.status(401).json({
                    existe : "no" ,
                    mensaje: 'Usuario no se encuentra registrado'
                });
                return;
            }
            
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};



//Registro
const setregistrarusuario = async (req,res)=>{ 
    try {
        let usuario =  req.body
        
        connection.query(`SELECT * FROM users WHERE email = "${usuario.email}"`,async(error,result)=>{
           
            const existe = Object.values(JSON.parse(JSON.stringify(result)));
            if (error) {
                console.log(error)
                res.status(500).send(error.message);
                return;
            }else if(existe.length != 0){
                res.status(200).json({
                    existe : "si" ,
                    mensaje: 'Email ya registrado'
                });
                return;
            }else{
                let pass = await bcrypt.hash(usuario.pass,8)
                connection.query(`INSERT INTO users SET name = "${usuario.name}", email = "${usuario.email}", password = "${pass}"`,(error,result)=>{
                    if (error) {
                        res.status(500).send(error.message);
                        return;
                    }else{
                        res.redirect('back')
                        // res.status(200).json({
                        //     mensaje: 'Creado con Exito',
                        //     result: result
                        // });
                        return;
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
};

module.exports={
    getlogin,
    setloginusuario,
    setregistrarusuario
};





