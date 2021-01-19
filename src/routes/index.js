const express = require('express');
const router = express.Router();
//Modelos
const Alumno = require('../models/alumnos');
router.get('/', async(req, res) => {
  const alumno = await Alumno.find();
  await Alumno.find()
  await Alumno.count();
  res.render('index', { alumno });
});


router.get('/index', async (req, res) => {
  const alumno = await Alumno.find();
    await Alumno.find()
    res.render('index', { alumno });
});



module.exports = router;
