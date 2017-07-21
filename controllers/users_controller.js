const User = require('../models/User')
// bcrypt
const bcrypt = require('bcrypt')

const Place = require('../models/Place')
// logic
function show (req, res) {
  User
  .findOne({
    _id: req.params.id
  })
  .populate('places')
  .exec(function (err, theUser) {
    if (err) res.send(err)
    // res.send(theUser)

    res.render('users/show', {
      user: theUser
    })
  })
}

// function showPlace (req, res) {
//   Place.find({})
// }

function create (req, res) {
//   bcrypt.hash(req.body.password, 10, function (err, hash) {
//     if (err) {
//       res.send(err
// )
//     }
//     res.send({
//       reqbody: req.body,
//       hash: hash
//     })
//   })
  // use req to create new database
  User.create(req.body.user, function (err, newUser) {
    if (err) {
      // flow if user is invalid
      // passing error msg to /users
      res.redirect('/users')
    }
    // flow if user is created
    res.redirect('/users/new')
    // res.format({
    //   html: function () {
    //     res.redirect('users/new')
    //   },
    //   json: function () {
    //     res.send('ajax!')
    //   }
    // })
  })
}

module.exports = {
  create,
  // showPlace,
  show
}
