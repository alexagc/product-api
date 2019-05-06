const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.ObjectId, auto: true },
  name: { type: String, required: true },
  description: { type: String, default: '' }
});

module.exports = mongoose.model('product', productSchema);
