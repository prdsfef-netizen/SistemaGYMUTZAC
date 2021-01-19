const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
  nickname:
  {
    type: String,
    required: true
   },

  password:
  {
    type: String,
    required: true
  },
  date:
  {
    type: Date,
    default: Date.now
  }
});

UsuarioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UsuarioSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);