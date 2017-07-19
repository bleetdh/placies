const User = require('../models/User')

// logic

function create (req, res) {
  // use req to create new database
  User.create(req.body.user, function (err, newUser) {
    if (err) {
      // flow if user is invalid
      // passing error msg to /users
      res.redirect('/users')
    }
    // flow if user is created
    // res.redirect('/users/new')
    res.format({
      html: function () {
        res.redirect('/users/new')
      },
      json: function () {
        res.redirect('/users/new')
      }
    })
  })
}

function newUser (req, res) {

}

module.exports = {
  create,
  newUser
}
