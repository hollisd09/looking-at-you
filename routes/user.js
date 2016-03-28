'use strict'

const express = require('express')
const router = express.Router()

// require('../user/local')
require('../routes/')

// LOGIN
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.sendStatus(200)
})

// LOGOUT
router.delete('/login', (req, res) => {
  req.session.regenerate(function(err) {
    if (err) throw err

    res.redirect('/')
  })
})

module.exports = router;
