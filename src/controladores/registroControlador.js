const Registro = require('../modelos/modeloRegistro')

exports.registrarLibroNuevo = async (req, res) =>{ //req: request, res: response
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
}

exports.obtenerLibros = async (req, res) => {
    try{
        const registros = await Registro.find({}) //mandamos a traer todos los registros de la base de datos
        console.log(registros)
        res.status(200).json({ registros }) //devolvemos los registros si todo salió bien
    }catch (error){
        console.log(error.message)
        res.status(500).json({ message: error.message }) //devolvemos el error si se genera
    }
}

exports.obtenerLibro = async (req, res) => {
    try{
        const registro = await Registro.findOne({ _id: req.params.id })
        console.log({ registro })
        res.status(200).json({ registro })
    }catch (error){
        res.status(500).json({ message: error.message })
    }
}

exports.eliminarLibro = async (req, res) => {
    try{
        const registro = await Registro.findByIdAndDelete(req.params.id)
        if(!registro){
            return res.status(404).json({ message: `no se encontro algun producto con ${req.params.id}` })
        }
        res.status(200).json({ registro })
    }catch (error){
        res.status(500).json({ message : error.message })
    }
}

exports.actualizaLibro = async (req, res) => {
    try{
        const registro = await Registro.findByIdAndDelete(req.params.id)
        if(!registro){
            return res.status(404).json({ message: `no se encontro algun producto con ${req.params.id}` })
        }
        res.status(200).json({ registro })
    }catch (error){
        res.status(500).json({ message : error.message })
    }
}
