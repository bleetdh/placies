const Place = require('../models/Place')

// logic

function create (req, res) {
  // use req to create new database
  var newPlace = new Place({
    name: req.body.name,
    address: req.body.address,
    reference: req.body.reference
  })
  newPlace.save(function (err, newPlace) {
    if (err) throw err
    res.send({
      status: 200, // 200 means ok
      message: 'new place created',
      err: 'ERROR'
    })
  })
  // Place.create()
}

module.exports = {
  create
}
