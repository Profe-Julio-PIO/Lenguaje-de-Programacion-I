const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generarId = require('../helper/generarId');

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    telefono:{
        type: String,
        default: null,
        trim: true,
    },
    direccion:{
        type: String,
        default: null,
        trim: true,
    },
    web:{
        type: String,
        default: null,
        trim: true,
    },
    token:{
        type: String,
        default: generarId(),
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
    rol:{
        type: String,
        default: null,
        trim: true,
    }

});

usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
