const express = require('express');
const rutas = express.Router();
const ProcesoModel = require('../models/Proceso');
const { version } = require('mongoose');

//Implementación correcta de las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
//Leer
rutas.get('/', async (req, res) =>{
    try {
        const procesos = await ProcesoModel.find();
        // console.log(tareas);
        res.json(procesos);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
//Crear
rutas.post('/agregar', async (req, res) =>{
    
    const nuevoproceso = new ProcesoModel({
        nombre: req.body.nombre,
        version: req.body.version,
        area: req.body.area,
        categoria: req.body.categoria
    });
    try {
        const guardarproceso = await nuevoproceso.save();
        res.status(201).json(guardarproceso);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//Actualizar
rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarProceso = await ProcesoModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarProceso);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//Eliminar
rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarProceso = await ProcesoModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Proceso eliminado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//consultas ----------------------

rutas.get('/proceso-prioridad/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const procesoPrioridad = await ProcesoModel.find({ categoria: req.params.id});
        res.json(procesoPrioridad);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
  
// - Ordenar los procesos por version de forma ascendente
rutas.get('/ordenar-proceso', async (req, res) =>{
    try {
        const procesoASC = await ProcesoModel.find().sort({version: 1});
        res.json(procesoASC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Consultar el procedimiento mas reciente anadida a la base de datos
rutas.get('/proceso_reciente', async (req, res) => {
    try {
      const proceso = await ProcesoModel.find().sort({_id: -1}).limit(1);
      res.json(proceso[0]); // Respuesta simplificada
    } catch (error) {
      console.error(error); // Registrar el error
      res.status(500).json({ mensaje: "Error al obtener el proceso reciente" }); // Mensaje de error más informativo
    }
  });
module.exports = rutas;
