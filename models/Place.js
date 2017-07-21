const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
  name: String,
  address: String,
  reference: String,
  users: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place
