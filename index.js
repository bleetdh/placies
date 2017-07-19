// express
const express = require('express')
const app = express()
// handlebars
const exphbs = require('express-handlebars')
// method override
const methodOverride = require('method-override')
// body parser
const bodyParser = require('body-parser')
// mongoose
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/placies'
mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('successful')
  },
  function (err) {
    console.log(err)
  }
)

// set middleware
app.use(express.static('public'))
// engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  // partialsDir: 'views/partials'
}))
app.set('view engine', 'handlebars')

// set up all files that the proj needs to run
const placesRoute = require('./routes/placeRoute')

// set up the routes
// no requring after this line!
app.use('/places', placesRoute)

// set up homepage
app.get('/', function (req, res) {
  res.render('home')
})
// listen, opening the port
const port = 5000
app.listen(port, function () {
  console.log('express is running on ' + port)
})
