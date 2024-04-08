const mongoose = require('mongoose');

const procesoEsquema = new mongoose.Schema({
    nombre : String,
    version : String,
    area : String,
    categoria : String
})

const ProcesoModel = mongoose.model('Proceso',procesoEsquema,'proceso');
module.exports = ProcesoModel;