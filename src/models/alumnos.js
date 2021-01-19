const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlumnosSchema = new Schema({

    matricula:
    {
        type: Number,
        required: true
    },
    nombres:
    {
        type: String,
        required: true
    },
    apellidop:
    {
        type: String,
        required: true
    },
    apellidom:
    {
        type: String,
        required: true
    },
    fechan:
    {
        type: Date,
        required: true
    },
    genero:
    {
        type: String,
        required: true
    },
    carrera:
    {
        type: String,
        required: true
    },
    fechac:
    {
        type: Date,
        default: Date.now
    },
    tarjeta:
    {
        type: Number,
        required: true
    },
    estatus:
    {
        type: String,
        
    },
    entrada:
    {
        type: Date,
        
    },
    salida:
    {
        type: Date,
        
    }
});

module.exports = mongoose.model('Alumno', AlumnosSchema);