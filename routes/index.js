'use strict'

const express = require('express')
const router = express.Router()

const Product = require('../user/productSchema')

router.post('/walmart/save', function(req) {
  let prod = new Product(req.body.shit);
  prod.save();
  // console.log(req)
})

module.exports = router
