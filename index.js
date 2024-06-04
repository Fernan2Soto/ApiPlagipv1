const bodyParser = require("body-parser");
const express = require("express");
const session = require('express-session');
const moment = require('moment')
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});
 
const connection = require('./db/db');
const expressLayouts = require('express-ejs-layouts')

const convertirFechas = require('./middlewares/fechasMiddleware');



const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para convertir fechas
app.use(convertirFechas);

app.use(session({
    secret: 'plagip',
    resave: true,
    saveUninitialized: true,
    
  }))
  
// app.use((req, res, next)=>{
//     const token = req.headers.token
//     console.log({
//         method: req.method,
//         url: req.url,
//         headers: req.headers,
//     })
//     const data_user ={
//         id : "1",
//         username : "Fernando",
//     }
//     const data_token = jwt.sign(data_user, process.env.TOKEN,{
//         expiresIn : 60 * 30
//     })
//     console.log(data_token)

//     jwt.verify(data_token, "1234", function(error,result){
//         console.log(result)
//     })

//     if (token == process.env.TOKEN) {
//         console.log("Token valido")
//         next();
//     } else {
//         console.log("No existe Token")
//         res.status(500).json()
//     }
// });

const proyectoRouter = require('./routers/proyectoRouters')
const sesionRouter = require('./routers/loginRouters')
const plagip = require('./routers/plagipRouters')



app.use('/api',proyectoRouter)
app.use('/login',sesionRouter)
app.use('/plagip',plagip)


app.listen(PORT,()=>{ 
    console.log('http://localhost:'+PORT);
    console.log(moment().format('LLL'))
});

