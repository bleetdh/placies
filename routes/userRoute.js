const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users_controller')

router.get('/new', function (req, res) {
  res.render('users/new')
})

router.get('/:id', usersController.show)

// router.get('/', function(req, res){
//   res.send('hello')
// })

// implementation/ calling the fn
// will post to / BUT because my controllers asked that it redirect to /new, it wont go to /
router.post('/', usersController.create)

module.exports = router
