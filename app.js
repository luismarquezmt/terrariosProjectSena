
//express framework
const express = require('express')
//config the env
require('dotenv').config()
//ahora esta en exprerss y se llama express.json
// const bodyParser = require('body-parser');
//database
const mysql = require('mysql')
const myconn = require('express-myconnection')
//Acceso CORS
const cors = require('cors')
//colores lindos
const colors = require('colors');
//rutas a productos donde estan los query
const productosRouter = require('./routes/productos');
const clienteRouter = require('./routes/clientes');
const path = require('path');

const port_Server = process.env.PORT_SERVER
const app = express()
app.use(cors())

app.set('port', port_Server || 9000)

const dbOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
}


// añadir carpeta bootstrap
app.use(express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
// app.use(express.static('public'))
app.use('/', express.static('views'))


// // set templates engine
// app.set('view engine', 'pug')


// añadir carpeta vistas 
app.set('views', path.join(__dirname, './views'))


//midlleware
//para que lea los res y req atraves del las routas 
app.use(express.urlencoded({ extended: true }))
//conecta bd tipo singleton
app.use(myconn(mysql, dbOptions, "single"))
//parsea el content type y los datos al req body
app.use(express.json())
app.use('/productos', productosRouter)
app.use('/clientes', clienteRouter)


app.listen(app.get('port'), () => {
    console.log(`El Server NodeJS corre en puerto: ${app.get('port')}`.rainbow)
})

