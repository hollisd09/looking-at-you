'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const methodOverride = require('methodOverride')
// const mongoose = require('mongoose')
// const path = require('path')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const routes = require('./routes/')

const app = express()
const PORT = process.env.PORT || 3000
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret'

app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore()
}))
app.use(passport.initalize())
app.use(passport.session)



//maybe include sass?

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express server running on port: ${PORT}`);
})
