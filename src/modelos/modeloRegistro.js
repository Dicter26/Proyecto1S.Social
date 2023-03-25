const mongoose = require('mongoose')

//Modelo de la base de datos para el registro literario
const modeloRegistro = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "Por favor introduzca un nombre para la obra literaria"]
    },
    autores: {
        type: Array,
        required: true
    },
    editorial: {
        type : String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
})

//instancia de la base de datos
const Registro = mongoose.model('Registro', modeloRegistro)

//exportamos para usar la instancia
module.exports = Registro