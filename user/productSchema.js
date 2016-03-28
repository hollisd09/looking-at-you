'use strict'

const mongoose    = require('mongoose'),
      // UserSchema  = require('./userSchema.js'),

      ProductSchema = new mongoose.Schema({
        name: String,
        price: String,
        description: String,
        image: String,
        url: String
      })


module.exports = mongoose.model('Products', ProductSchema)
