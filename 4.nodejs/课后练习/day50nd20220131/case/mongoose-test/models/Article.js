const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: String,
  author: {
    type: String
  }
})

module.exports = mongoose.model('Article', schema)