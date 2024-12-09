
const {Schema} = require('mongoose');
const mongoose = require('mongoose')
const Director = Schema ({
  nombre: {
    type: String,
    required: true
  },

  Estado:{
     type: String,
    // required: true,
     enun:[
         'activo', 'inactivo'
     ]
  },

  fechaCreacion: {
    type: Date,
    required: true
  }
  ,
  fechaActualizacion: {
    type: Date,
    required: true
   }
})

module.exports = mongoose.model('moduloDirector', Director)