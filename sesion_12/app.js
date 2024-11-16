const mongoose = require('mongoose')
const URL = 'mongodb://localhost/db_pio'

mongoose.connect(URL,{
})
.then(() => console.log('BASE DE DATOS CONECTADA A MONGODB'))
.catch((e)=> console.log('Hay un error de conexión: '+e))


/* Crear un esquema para Mongo */
const estudiantesSchema = mongoose.Schema({
    _id: Number,
    nombre: String,
    edad: Number,
    email: String
}, {versionKey: false})

const estudiantesModel = mongoose.model('estudiantes', estudiantesSchema)

/* Operaciones CRUD */

/* Mostrar todos los documentos */
const mostrar = async () =>{
    const estudiantes = await estudiantesModel.find();
    console.log(estudiantes)
}

/* Ingresar un nuevo documento */
const ingresar = async ()=>{
    const estudiantes = new estudiantesModel({
        _id: 104,
        nombre: 'Fiaga Jefferson',
        edad: 36,
        email: 'jfiagad@pio.edu.co'
   })
   const resultado = await estudiantes.save()
   console.log(resultado)
}


/* Actualizar un documento */
const actualizar = async(id)=>{
    const estudiantes = await estudiantesModel.updateOne({_id: id},
        {
            $set:{
                nombre: 'Checa Soto Tatiana',
                email: 'tatiana.checa89@gmail.com'
            }
        }
    )
}

/* Eliminar un documento */
const eliminar = async (id)=>{
    const estudiantes = await estudiantesModel.deleteOne({_id: id})
    console.log(estudiantes)
}

//Llamar a los procedimientos
// mostrar()
// ingresar()
// actualizar(103)
eliminar(103)