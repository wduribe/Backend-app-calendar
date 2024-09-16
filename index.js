const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config.js');

//Creando el servidor con express
const app = express();


//Conexion con base de datos
dbConnection();     



//puerto
const port = process.env.PORT || 3500;

//app.use son middlewares

//cors
app.use( cors() );

//Directorio público
app.use( express.static('public') );
//Para poder leer formatos json que vengan de las peticiones.
app.use( express.json() );




// Rutas
//Routas auth
app.use('/api/auth', require('./router/auth-router.js'));
app.use('/api/events-calendar', require('./router/events-router.js'));

app.listen( port, () =>{
    console.log('Server is running on port', port);
});
