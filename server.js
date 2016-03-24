'use strict'

const bodyParser      = require('body-parser'),
      express         = require('express'),
      // flash           = require('flash'),
      methodOverride  = require('method-override'),
      mongoose        = require('mongoose'),
      // path            = require('path'),
      // passport        = require('passport'),
      session         = require('express-session'),
      RedisStore      = require('connect-redis')(session),

      routes          = require('./routes'),
      // userRoutes      = require('./user/routes'),

      app             = express(),
      PORT            = process.env.PORT || 3000,
      SESSION_SECRET  = process.env.SESSION_SECRET || 'secret'

app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore()
  // resave: true,
  // saveUninitialized: true
}))
// app.use(flash())
// app.use(passport.initialize())
// app.use(passport.session)

app.locals.title = ''

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use(routes)

app.get('/', (req, res) => {
  res.render('index', { message: req.flash('info') })
})

mongoose.connect('mongodb://localhost:27017/casablanca', (err) => {
  if (err) throw err

  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  })
})

module.exports = app
