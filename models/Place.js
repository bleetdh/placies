const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
  name: String,
  address: String,
  reference: String
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place
