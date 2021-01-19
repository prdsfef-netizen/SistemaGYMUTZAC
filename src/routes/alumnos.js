const express = require('express');
const router  = express.Router();

//Modelos
const Alumno = require('../models/alumnos');
const Asistencia = require('../models/asistencia');

router.get('/alumnos/list', async (req, res) =>
{
    const alumno = await Alumno.find();
    await Alumno.find()
    res.render('alumnos/list', { alumno });
});

router.get('/alumnos/entrada/',  async (req, res) => {
  const alumno = await Alumno.findById(req.params.id);
   res.render('alumnos/entrada', { alumno });
});
router.put('/alumno/entrada/:id',  async (req, res) => {

  const entrada = new Date(); //Obtienes la fecha
  const estatus = "Activo";

  await Alumno.findByIdAndUpdate(req.params.id, {entrada, estatus});
  res.redirect('/alumnos/list');
});

router.get('/alumnos/asistencia', async (req, res) =>
{
    const asistencia = await  Asistencia.find().sort({fechain: 'desc'});;
    await  Asistencia.find()
    res.render('alumnos/asistencia', { asistencia });
   
});
router.get('/alumnos/entrada',  async (req, res) => {
  const alumno = await Alumno.findById(req.params.id);
   res.render('alumnos/entrada', { alumno });
});
router.post('/alumnos/entradaa', async (req, res) => {
  let errors = [];
  const { matricula, fechain,entrada, estatus } = req.body;

  // Look for email coincidence
    const matriculaUser = await Alumno.findOne({matricula:matricula});
    if(!matriculaUser) {
      req.flash('error_msg', 'Matricula no registrada.');
      res.redirect('/alumnos/entrada');
    } else {
      // Guardando asistencia
      const entrada= new Date(); 
     
      const estatus = "Activo";
      const matriculaUser = new Asistencia({matricula,fechain ,entrada, estatus});
      

      await matriculaUser.save();
      req.flash('success_msg', 'Registrado.');
      res.redirect('/alumnos/asistencia');
    }
  }
);

router.get('/alumnos/salida/:id', async (req, res) => {
  const asistencia = await Asistencia.findById(req.params.id);
   res.render('alumnos/salida', { asistencia });
});
router.put('/alumno/salida/:id',  async (req, res) => {

  const salida = new Date(); //Obtienes la fecha
  const estatus = "Inactivo";

  await Asistencia.findByIdAndUpdate(req.params.id, {salida, estatus});
  res.redirect('/alumnos/asistencia');
});
module.exports = router;