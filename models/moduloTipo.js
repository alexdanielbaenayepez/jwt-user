/*I. Nombre
II. Fecha de creación
III. Fecha de actualización
IV. Descripción*/

const {Schema, model} = require('mongoose')

const Tipo = Schema({
  nombre: {
    type: String,
    required: true
  },

  fechaCreacion: {
    type: Date,
    required: true
  },
  fechaActualizacion:{
    type: Date,
    required: true
  },

  descripcion:{
    type: String,
    required: true
  }
})

module.exports = model('moduloTipo', Tipo)