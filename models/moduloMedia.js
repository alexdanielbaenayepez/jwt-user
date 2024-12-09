/*I. Serial: único
II. Titulo
III. Sinopsis
IV. URL de la película: único
V. Imagen o foto de portada
VI. Fecha de creación
VII. Fecha de actualización
VIII. Año de estreno
IX. Género principal:*/

const {Schema, model} = require('mongoose')

const Media = Schema({
  _id:{
    unique:true,
    type:Number,
    required:true
  },
  titulo:{
    type:String,
    requierd:true
  },
  sinopsis:{
    type:String,
    required:true
  },
  URL:{
    type:String,
    required:true
  },
  IMG:{
    type:String,
    required:true
  },
  fechaCreacion:{
    type:Date
  },
  fechaActualizacion:{
    type:Date
  },
  anoEstreno:{
    type:Date
  },
  genero:{
    type:String
  }
})

module.exports = model('moduloMedia', Media)