'use strict'

      // const request = require('superagent')
      const walmart = require('walmart')('mawgaszv6kurpbmkkxazndvh')

const bodyParser      = require('body-parser'),
      express         = require('express'),
      // flash           = require('flash'),
      methodOverride  = require('method-override'),
      mongoose        = require('mongoose'),
      // path            = require('path'),
      // passport        = require('passport'),
      session         = require('express-session'),
      RedisStore      = require('connect-redis')(session),
   //   routes          = require('./routes'),
      // userRoutes      = require('./user/routes'),



      app             = express(),
      PORT            = process.env.PORT || 3000,
      SESSION_SECRET  = process.env.SESSION_SECRET || 'secret'

app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'))
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore(),
  resave: true,
  saveUninitialized: true
}))
// app.use(flash())
// app.use(passport.initialize())
// app.use(passport.session)

app.locals.title = ''

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// app.set(projectOnFire)
app.use(express.static('public'));

//app.use(routes)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/searchWalmart', (req, res) => {
  res.render('searchWalmart')
})

app.post('/searchWalmart', (req, res) => {
  console.log(req.body)
  walmart.search(req.body.search)
  .then(function(item) {
    console.log(item.items)

    res.render('searchWalmart', { item: item.items })
  })
})

app.get('/userReg', (req, res) => {
  res.render('userReg')
})

mongoose.connect('mongodb://localhost:27017/casablanca', (err) => {
  if (err) throw err

  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  })
})

module.exports = app
