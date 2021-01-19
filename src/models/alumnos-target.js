const mongoose = require('mongoose');
const { Schema } = mongoose;
const Alumno = mongoose.model('Alumno');
const AlumnosTarjetaSchema = new Schema({

    tarjeta:
    {
        type: Number,
        required: true
    },
    matricula:
    {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('AlumnoTarjeta', AlumnosTarjetaSchema);