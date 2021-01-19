const mongoose = require('mongoose');
const { Schema } = mongoose;

const AsistenciaSchema = new Schema({

    matricula:
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

module.exports = mongoose.model("Asistencia", AsistenciaSchema);