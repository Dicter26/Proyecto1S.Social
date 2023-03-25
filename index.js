//instancia de express
const express = require('express')

//inicializamos la aplicación
const app = express()

//instanciamos a la funcion que hace la conexión con la base de datos
const dbSetup = require('./src/basedatos/setup')
dbSetup() //llamamos a la función para la conectarse a la base de datos

const rutas = require('./src/rutas/rutasRegistro')
app.use(rutas)

const ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('view', './src/vistas')

//funcion que inicia la aplicación y escucha en el puerto 8000
app.use(express.json())
app.listen(8000, () => {
    console.log('Iniciada app que escucha el puerto 8000')
})
