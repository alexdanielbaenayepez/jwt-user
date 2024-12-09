const { check, validationResult } = require('express-validator');
const Director = require('../models/moduloDirector')
const director ={};


// Crear un nuevo director
director.crear =

    [
      check('nombre', 'invalid.nombre').not().isEmpty(),
      check('estado', 'invalid.estado').isIn(['activo', 'inactivo'])
    ],

    async function (req, res){


    try{

      const errors = validationResult(req);
      if(!errors.isEmpty()){return res.status(400).json({mensaje: errors.array()})}

      const existsDirector = await director.findOne({nombre: req.body.nombre})
      if(existsDirector){return res.status(400).send('Director existe')}

      let director = new Director();

      director.nombre = req.body.nombre;
      director.estado = req.body.estado;
      director.fechaCreacion = req.body.fechaCreacion;
      director.fechaActualizacion = req.body.fechaActualizacion;


      let saveDirector = await director.save();
      res.json(saveDirector).send()

    }catch (error){
      console.log(error)
    }
};


module.exports = director;