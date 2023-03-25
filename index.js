const express = require('express') //instancia de express
const mongoose = require('mongoose') //instancia de mongoose
const app = express() //inicializamos la aplicación
const Registro = require('./src/modelos/modelRegistro')

//funcion que inicia la aplicación y escucha en el puerto 8000
app.use(express.json())
app.listen(8000, () => {
    console.log('Iniciada app que escucha el puerto 8000')
})

//funcion para la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/RegistroLiterario',{
    useNewUrlParser: true,
    useUnifiedTopology: true}).then(() => {
    console.log('conexión a la base de datos')
}).catch((error) => {
    console.log(error)
})

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
    res.status(200).json({ message: "libro nuevo creado"}) //mensaje de exito si podemos crear el libro
    }catch (error){
        console.log(error.message)
        res.status(500).json({ message: error.message }) //devolvemos un status 500 como error si no podemos insertar el libro
    }
})

//GET petición a /libros para mostrar todos los libros
app.get('/libros', async (req, res) => {
    try{
        const registros = await Registro.find({}) //mandamos a traer todos los registros de la base de datos
        console.log(registros)
        res.status(200).json({ registros }) //devolvemos los registros si todo salió bien
    }catch (error){
        console.log(error.message)
        res.status(500).json({ message: error.message }) //devolvemos el error si se genera
    }
})

//GET petición a /libros/:id para mostrar un libro en particular
app.get('/libros/:id', async (req, res) => {
    try{
        const registro = await Registro.findOne({ _id: req.params.id })
        console.log({ registro })
        res.status(200).json({ registro })
    }catch (error){
        res.status(500).json({ message: error.message })
    }
})

//DELETE petición a /libros/:id para eliminar un libro en particular
app.delete('/libros/:id', async (req, res) => {
    try{
        const registro = await Registro.findByIdAndDelete(req.params.id)
        if(!registro){
            return res.status(404).json({ message: `no se encontro algun producto con ${req.params.id}` })
        }
        res.status(200).json({ registro })
    }catch (error){
        res.status(500).json({ message : error.message })
    }
})

//PUT peticion a /libros/:id para traer un libro y actualizarlo
app.put('/libros/:id', async (req, res) => {
    try{
        const body = req.body
        const id = req.params.id
        const registro = await Registro.findByIdAndUpdate(req.params.id , {
            titulo: req.body.titulo,
            autores: req.body.autores,
            editorial: req.body.editorial,
            fecha: req.body.fecha
        })
        if(!registro){
            return res.status(404).json({ message: `registro con ${id} no encontrado` })
        }
        const updatedProduct = await Registro.findById(id)
        res.status(200).json({ updatedProduct })
    }catch(error){
        res.status(500).json({ message: error.message })
    }
})