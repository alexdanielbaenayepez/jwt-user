const express = require('express');
const router = express.Router();
const Genero = require('../models/moduloGenero');

// Obtener todos los géneros
router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Obtener un género por ID
router.get('/:id', getGenero, (req, res) => {
  res.json(res.genero);
});

// Crear un nuevo género
router.post('/', async (req, res) => {
  const nuevoGenero = new Genero({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  });

  try {
    const genero = await nuevoGenero.save();
    res.status(201).json(genero);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Actualizar un género
router.put('/:id', getGenero, async (req, res) => {
  try {
    res.genero.nombre = req.body.nombre;
    res.genero.descripcion = req.body.descripcion;
    const generoActualizado = await res.genero.save();
    res.json(generoActualizado);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Eliminar un género
router.delete('/:id', getGenero, async (req, res) => {
  try {
    await res.genero.remove();
    res.json({ mensaje: 'Género eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Middleware para obtener un género por ID
async function getGenero(req, res, next) {
  let genero;
  try {
    genero = await Genero.findById(req.params.id);
    if (genero == null) {
      return res.status(404).json({ mensaje: 'Género no encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ mensaje: err.message });
  }

  res.genero = genero;
  next();
}

module.exports = router;