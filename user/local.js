'use strict'

const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,

      User = require('userSchema.js')

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(_id, done) {
  User.findById(_id, done)
})

passport.use(new LocalStrategy ({
    usernameField: 'email'
  },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err

        if (user) {
          user.authenticate(password, (err, valid) => {
            if (err) throw err

            if (valid) {
              done(null, user)
            } else {
              done()
            }
          })
        } else {
          done()
        }
    })
  })
)
