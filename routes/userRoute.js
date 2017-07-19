const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users_controller')

router.get('/new', function (req, res) {
  res.render('users/new')
})

// router.get('/', function(req, res){
//   res.send('hello')
// })

// implementation/ calling the fn
router.post('/', usersController.create)

module.exports = router
