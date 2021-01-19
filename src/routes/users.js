const router = require('express').Router();
const passport = require('passport');

// Models
const Usuario = require('../models/usuarios');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { nickname, password, confirm_password } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'Contraeña incorrecta.'});
  }
  if(password.length < 4) {
    errors.push({text: 'Contraseña minina de cuatro caracteres.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, nickname,password, confirm_password});
  } else {
    // Look for email coincidence
    const nicknameUser = await Usuario.findOne({nickname:nickname});
    if(nicknameUser) {
      req.flash('error_msg', 'Usuario ocuppado.');
      res.redirect('/users/signup');
    } else {
      // Saving a New User
      const newUser = new Usuario({nickname, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Registrado.');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/admin/list',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Haz cerrado sesion.');
  res.redirect('/users/signin');
});

module.exports = router;
