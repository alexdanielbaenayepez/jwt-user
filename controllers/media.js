const express = require('express');
const router = express.Router();
const Media = require('../models/moduloMedia');
const Genero = require('../models/moduloGenero');
const Director = require('../models/moduloDirector');
const Productora = require('../models/moduloProductora');
const Tipo = require('../models/moduloTipo');

// Obtener todas las medias
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
        .populate('genero')
        .populate('director')
        .populate('productora')
        .populate('tipo');
    res.json(medias);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Obtener una media por ID
router.get('/:id', getMedia, (req, res) => {
  res.json(res.media);
});

// Crear una nueva media
router.post('/', async (req, res) => {
  const { serial, titulo, sinopsis, urlPelicula, portada, anioEstreno, genero, director, productora, tipo } = req.body;

  const generoObj = await Genero.findById(genero);
  const directorObj = await Director.findById(director);
  const productoraObj = await Productora.findById(productora);
  const tipoObj = await Tipo.findById(tipo);

  if (!generoObj || !directorObj || !productoraObj || !tipoObj) {
    return res.status(400).json({ mensaje: 'Uno o más campos relacionados no encontrados' });
  }

  const nuevaMedia = new Media({
    serial,
    titulo,
    sinopsis,
    urlPelicula,
    portada,
    anioEstreno,
    genero,
    director,
    productora,
    tipo,
  });

  try {
    const media = await nuevaMedia.save();
    res.status(201).json(media);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Actualizar una media
router.put('/:id', getMedia, async (req, res) => {
  // ...
});

// Eliminar una media
router.delete('/:id', getMedia, async (req, res) => {
  // ...
});

// Middleware para obtener una media por ID
async function getMedia(req, res, next) {
  let media;
  try {
    media = await Media.findById(req.params.id)
        .populate('genero')
        .populate('director')
        .populate('productora')
        .populate('tipo');
    if (media == null) {
      return res.status(404).json({ mensaje: 'Media no encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ mensaje: err.message });
  }

  res.media = media;
  next();
}

module.exports = router;