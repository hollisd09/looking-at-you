'use strict'

const mongoose    = require('mongoose'),

      ProductSchema = new mongoose.Schema({
        name: String,
        price: String,
        description: String,
        image: String,
        url: String
      })


module.exports = mongoose.model('Products', ProductSchema)

