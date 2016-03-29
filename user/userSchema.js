'use strict'

const mongoose          = require('mongoose'),
      bcrypt            = require('bcrypt'),

      BCRYPT_DIFFICULTY = 11,

      UserSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        products: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products'
        }]
      })

UserSchema.methods.authenticate = function (password, cb) {
  bcrypt.compare(password, this.password, cb)
}

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, BCRYPT_DIFFICULTY, (err, hash) => {
    if (err) throw err

    this.password = hash
    next()
  })
})

module.exports = mongoose.model('Users', UserSchema)
