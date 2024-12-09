const express = require('express');
const router = express.Router();
const Productora = require('../models/moduloProductora');

// Obtener todas las productoras
router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Obtener una productora por ID
router.get('/:id', getProductora, (req, res) => {
  res.json(res.productora);
});

// Crear una nueva productora
router.post('/', async (req, res) => {
  const { nombre, slogan, descripcion } = req.body;

  const nuevaProductora = new Productora({
    nombre,
    slogan,
    descripcion,
  });

  try {
    const productora = await nuevaProductora.save();
    res.status(201).json(productora);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Actualizar una productora
router.put('/:id', getProductora, async (req, res) => {
  const { nombre, slogan, descripcion } = req.body;

  try {
    res.productora.nombre = nombre;
    res.productora.slogan = slogan;
    res.productora.descripcion = descripcion;
    const productoraActualizada = await res.productora.save();
    res.json(productoraActualizada);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Eliminar una productora
router.delete('/:id', getProductora, async (req, res) => {
  try {
    await res.productora.remove();
    res.json({ mensaje: 'Productora eliminada' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Middleware para obtener una productora por ID
async function getProductora(req, res, next) {
  let productora;
  try {
    productora = await Productora.findById(req.params.id);
    if (productora == null) {
      return res.status(404).json({ mensaje: 'Productora no encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ mensaje: err.message });
  }

  res.productora = productora;
  next();
}

module.exports = router;