const express = require('express')
const router = express.Router()

router.get('/test', function(req, res) {
  console.log('hello')
  res.status(200).send('hello')
})

module.exports = router;
