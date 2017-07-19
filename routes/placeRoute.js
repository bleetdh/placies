const express = require('express')
const router = express.Router()

const placesController = require('../controllers/places_controller')

router.get('/', function (req, res) {
  res.render('places/index')
})

// implementation/ calling the fn
router.post('/', placesController.create)

module.exports = router
