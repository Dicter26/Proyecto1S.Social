const mongoose = require('mongoose')

//funcion para la conexión a la base de datos
module.exports = function (){
    mongoose.connect('mongodb://localhost:27017/RegistroLiterario',{
    useNewUrlParser: true,
    useUnifiedTopology: true}).then(() => {
    console.log('conexión a la base de datos')
    }).catch((error) => {
    console.log(error)
    })
}