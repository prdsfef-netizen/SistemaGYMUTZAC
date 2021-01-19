const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/gym-db',
{
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('La BD esta conectada'))
  .catch(err => console.error(err));
