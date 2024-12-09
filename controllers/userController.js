const express = require('express');
const Usuario = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: { nombre, email } });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar usuario', error });
  }
});
