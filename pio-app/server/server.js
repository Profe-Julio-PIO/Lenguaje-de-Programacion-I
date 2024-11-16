const express = require('express')
const cors = require('cors')
const postgresPool = require('pg').Pool

const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
    extended: true 
}))

app.listen(port,(error)=>{
    if(error) throw error;
    console.log(`El servidor se está ejecutando en el puerto: ${port}`)
})


//Conexión de la base de datos
const pool = new postgresPool({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'estudiantes_master',
    port: 5432,
    max: 10
})

pool.connect((error, connection)=>{
    if(error) throw error;
    console.log(`La conexión a la base de datos estudiantes_master ha sido exitosa!`)
})


//endpoints
/* Listar estudiantes */
app.get('/estudiantes',(req,res)=>{
    const sql = 'SELECT * FROM estudiantes';
    pool.query(sql,(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows);
    })
})

/* Listar estudiantes por código */
app.get('/estudiantes/:estudianteId',(req,res)=>{
    const estId = Number(req.params.estudianteId);
    const sql = 'SELECT * FROM estudiantes WHERE "estudianteId"=$1';
    pool.query(sql,[estId],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows[0]);
    })
})

/* Insertar estudiantes */
app.post('/estudiantes',(req,res)=>{
    const {nombre,major,email} = req.body
    const sql = 'INSERT INTO estudiantes(nombre,major,email) VALUES($1,$2,$3) RETURNING *';
    pool.query(sql,[nombre,major,email],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows);
    })
})

/* Actualizar estudiantes */
app.patch('/estudiantes/:estudianteId',(req,res)=>{
    const estId = Number(req.params.estudianteId);
    const {nombre,major,email} = req.body;
    const sql = 'UPDATE estudiantes SET nombre=$1,major=$2,email=$3 WHERE "estudianteId"=$4';
    pool.query(sql,[nombre,major,email,estId],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).send(`El estudiante ha sido actualizado por el codigo: ${estId}`);
    })
})

/* Eliminar estudiantes */
app.delete('/estudiantes/:estudianteId', (req, res)=>{
    const estId = Number(req.params.estudianteId);
    const sql = 'DELETE FROM estudiantes WHERE "estudianteId"= $1';
    pool.query(sql,[estId],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).send(`El estudiante ha sido eliminado por el codigo: ${estId}`);
    })
})