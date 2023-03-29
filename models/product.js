const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {type: String, require: true},
  price: {type: Number, require: true}
})

module.exports = mongoose.model('Product', productSchema)