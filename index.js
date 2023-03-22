const express = require('express')

//inicializamos la aplicación
const app = express()
app.use(express.json())
app.listen(8000, () => {
    console.log('Iniciada app que escucha el puerto 8000')
})

const mongoose = require('mongoose')

//funcion para la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/RegistroLiterario',{
    useNewUrlParser: true,
    useUnifiedTopology: true}).then(() => {
    console.log('conexión a la base de datos')
}).catch((error) => {
    console.log(error)
})

//Modelo de la base de datos para el registro literario
const modeloRegistro = new mongoose.Schema({
    titulo: String,
    autor: String,
    editorial: String,
    fecha: String
})

const Registro = mongoose.model('Registro', modeloRegistro)

//definicion de la rutas para manejar las peticiones del cliente
//POST petición a /libros para crear un nuevo libro
app.post('/libros', function(req, res){
    const libro = req.body.libro
    console.log({ libro })
    Registro.create({ //creamos el registro con el nuevo libro y sus datos correspondientes
        titulo: libro.titulo,
        autor: libro.autor,
        editorial: libro.editorial,
        fecha: libro.fecha
    }, (err, newBook) => { //enviamos una respuesta al cliente si es que se produjo un error o la petición fue exitosa
        if(err){
            return res.status(500).json({message: err})
        }else{
            return res.status(200).json({message: "libro nuevo creado"})
        }
    })
})

//GET petición a /libros para mostrar todos los libros
//GET petición a /libros/:id para mostrar un libro en particular
//DELETE petición a /libros/:id para eliminar un libro en particular