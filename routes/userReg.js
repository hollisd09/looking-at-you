'use strict'

const express = require('express')
const router = express.Router()
const addRoute = require('./add')
const userRoute = require('./user')

router.use(addRoute)
router.use(userRoute)


module.exports(router)
