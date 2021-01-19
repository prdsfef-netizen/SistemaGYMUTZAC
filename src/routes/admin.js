const router = require('express').Router();
const passport = require('passport');

//Modelos
const Alumno = require('../models/alumnos');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/admin/add', isAuthenticated, (req, res) => {
  res.render('admin/register');
});

router.post('/admin/nuevo-alumno', isAuthenticated, async (req, res) => 
{
    const { matricula, nombres, apellidop, apellidom, fechan,genero, carrera, tarjeta} = req.body;
    const errors = [];
    if (!matricula)
    {
      errors.push({text: 'Escriba la matricula, por favor.'});
    }
    if (!nombres)
    {
      errors.push({text: 'Escriba el nombre, por favor'});
    }
    if(!apellidop)
    {
        errors.push({text:'Escriba el apellido paterno, por favor'});
    }
    if(!apellidom)
    {
        errors.push({text: 'Escriba el apellido materno, por favor'});
    }
    if(!fechan)
    {
        errors.push({text: 'Escriba la fecha de nacimiento, por favor'});
    }
    if(!genero)
    {
        errors.push({text: 'Eliga un genero, por favor'});
    }
    if(!carrera)
    {
        errors.push({text: 'Eliga una carrera, por favor'});
    }
    if (errors.length > 0) {
      res.render('admin/register', {
        errors,
        matricula,
        nombres,
        apellidop,
        apellidom,
        fechan,
        genero,
        carrera
      });
    }
    else
    {
        const newAlumno = new Alumno({matricula, nombres, apellidop, apellidom, fechan,genero, carrera, tarjeta});
        await newAlumno.save();
        req.flash('success_msg', 'Alumno guardado');
        res.redirect('/admin/list');
       }

});

router.get('/admin/list', isAuthenticated, async (req, res) =>
{
    const alumno = await Alumno.find();
    await Alumno.find()
    res.render('admin/list', { alumno });
});
router.get('/admin/edit/:id', isAuthenticated, async (req, res) => {
    const alumno = await Alumno.findById(req.params.id);
     res.render('admin/edit', { alumno });
  });

  router.put('/admin/edit-alumno/:id', isAuthenticated, async (req, res) => {
    const { matricula, nombres, apellidop, apellidom,genero, carrera } = req.body;
    await Alumno.findByIdAndUpdate(req.params.id, {matricula, nombres, apellidop, apellidom,genero, carrera});
    req.flash('success_msg', 'Editado');
    res.redirect('/admin/list');
  });
  router.delete('/admin/delete/:id', isAuthenticated, async (req, res) => {
    await Alumno.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Eliminado');
     res.redirect('/admin/list');
  });
  
module.exports = router;