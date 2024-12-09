const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  },
});

// Middleware para encriptar contraseñas antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para verificar la contraseña
UsuarioSchema.methods.verificarPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Método para generar un JWT
UsuarioSchema.methods.generarJWT = function (secretKey, expiresIn = '1h') {
  const payload = {
    id: this._id,
    nombre: this.nombre,
    email: this.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn });
};

module.exports = model('Usuario', UsuarioSchema);
