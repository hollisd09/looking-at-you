'use strict'

const bodyParser      = require('body-parser'),
      express         = require('express'),
      methodOverride  = require('method-override'),
      mongoose        = require('mongoose'),
      session         = require('express-session'),
      RedisStore      = require('connect-redis')(session),
      walmart         = require('walmart')('mawgaszv6kurpbmkkxazndvh'),

      app             = express(),
      PORT            = process.env.PORT || 3000,
      SESSION_SECRET  = process.env.SESSION_SECRET || 'secret'

const User = require('./user/userSchema')
const route = require('./routes')

app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(methodOverride('_method'))
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore(),
  resave: true,
  saveUninitialized: true
}))

app.use(route)

app.locals.title = ''

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// app.set(projectOnFire)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
 if (req.body.password === req.body.verify) {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err) throw err
        console.log(user);
      if (user) {
        res.redirect('/login')
      } else {
        User.create(req.body, (err) => {
          if (err) throw err
          console.log('creating away')
          console.log(req.body)
          res.redirect('/searchWalmart')
        })
      }
    })
  } else {
    res.render('register', {
      email: req.body.email,
      message: 'Passwords do not match'
    })
  }
})

app.get('/searchWalmart', (req, res) => {
  res.render('searchWalmart')
})

app.post('/searchWalmart', (req, res) => {
  walmart
    .search(req.body.search)
    .then(function(item) {
      res.render('searchWalmart', {
        item: item.items
      })
    })
})

const mongoURL = 'mongodb://localhost:27017/casablanca';

mongoose.connect(mongoURL);

app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT)
})


module.exports = app
