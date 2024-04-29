const mysql = require('mysql');
const env = require('../env/.env');

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

connection.connect((error)=>{
    if (error) {
        console.log('Error de conexion: ' +error );
        return;
    }
    console.log('DB conectada')
});

module.exports = connection;