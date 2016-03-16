'use strict'

const express = require('express')
const router = express.Router()
const addRoute = require('./index')

router.use(addRoute)

module.exports = router
