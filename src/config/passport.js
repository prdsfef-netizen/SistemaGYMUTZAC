const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const Usuario = require('../models/usuarios'); 

passport.use(new LocalStrategy({
  usernameField: 'nickname'
}, async (nickname, password, done) => {
  // Match Email's User
  const usuario = await Usuario.findOne({nickname: nickname});
  if (!usuario) {
    return done(null, false, { message: 'Usuario no encontrado.' });
  } else {
    // Match Password's User
    const match = await usuario.matchPassword(password);
    if(match) {
      return done(null, usuario);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta.' });
    }
  }

}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, usuario) => {
    done(err, usuario);
  });
});
