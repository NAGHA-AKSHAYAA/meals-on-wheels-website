const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String
});

module.exports = mongoose.model('Service', serviceSchema);
