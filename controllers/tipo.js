const express = require('express');
const router = express.Router();
const Tipo = require('../models/moduloTipo');

// Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Obtener un tipo por ID
router.get('/:id', getTipo, (req, res) => {
  res.json(res.tipo);
});

// Crear un nuevo tipo
router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;

  const nuevoTipo = new Tipo({
    nombre,
    descripcion,
  });

  try {
    const tipo = await nuevoTipo.save();
    res.status(201).json(tipo);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Actualizar un tipo
router.put('/:id', getTipo, async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    res.tipo.nombre = nombre;
    res.tipo.descripcion = descripcion;
    const tipoActualizado = await res.tipo.save();
    res.json(tipoActualizado);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Eliminar un tipo
router.delete('/:id', getTipo, async (req, res) => {
  try {
    await res.tipo.remove();
    res.json({ mensaje: 'Tipo eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Middleware para obtener un tipo por ID
async function getTipo(req, res, next) {
  let tipo;
  try {
    tipo = await Tipo.findById(req.params.id);
    if (tipo == null) {
      return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ mensaje: err.message });
  }

  res.tipo = tipo;
  next();
}

module.exports = router;