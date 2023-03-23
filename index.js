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
    autores: Array,
    editorial: String,
    fecha: String
})

const Registro = mongoose.model('Registro', modeloRegistro)

//definicion de la rutas para manejar las peticiones del cliente
//POST petición a /libros para crear un nuevo libro
app.post('/libros', async (req, res) =>{ //req: request, res: response
    const libro = req.body.libro //constante u objeto que obtiene lo que nos mandan en la solicitud del cliente
    console.log({ libro })
    try{
    const registro = await Registro.create({ //creamos el libro cazando los parametros que vienen en el objeto que nos mandan y nuestro modelo de la bd
        titulo : libro.titulo,
        autores: libro.autores,
        editorial: libro.editorial,
        fecha: libro.fecha
    })
    res.status(200).json({ message: "libro nuevo creado"})
    }catch (error){
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

//GET petición a /libros para mostrar todos los libros
//GET petición a /libros/:id para mostrar un libro en particular
//DELETE petición a /libros/:id para eliminar un libro en particular