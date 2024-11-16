const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

//Crear el usuario
router.post('/users', (req,res)=>{
    const user = userSchema(req.body);
    user
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});

//Listar todos los usuarios
router.get('/users', (req,res)=>{
    userSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});

//Consulta de un usuario por medio del 'Id'
router.get('/users/:id', (req,res)=>{
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});

//Acutalizar un usuario
router.put('/users/:id', (req,res)=>{
    const { id } = req.params;
    const { name, age, email } = req.body
    userSchema
        .updateOne({_id: id},{$set: {name, age, email}})
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});

//Eliminar un usuario
router.delete('/users/:id', (req,res)=>{
    const { id } = req.params;
    userSchema
        .deleteOne({_id: id})
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});


module.exports = router;