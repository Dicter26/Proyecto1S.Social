const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Registro = require('../modelos/modeloRegistro')
const registroControlador = require('../controladores/registroControlador')

router.get('/', (peticion, respuesta) => {
    respuesta.render('index')
})

//definicion de la rutas para manejar las peticiones del cliente
//POST petición a /libros para crear un nuevo libro
router.post('/libros', registroControlador.registrarLibroNuevo)

//GET petición a /libros para mostrar todos los libros
router.get('/libros',registroControlador.obtenerLibros)

//GET petición a /libros/:id para mostrar un libro en particular
router.get('/libros/:id', registroControlador.obtenerLibro)

//DELETE petición a /libros/:id para eliminar un libro en particular
router.delete('/libros/:id',registroControlador.eliminarLibro)

//PUT peticion a /libros/:id para traer un libro y actualizarlo
router.put('/libros/:id', registroControlador.actualizaLibro)

module.exports = router 