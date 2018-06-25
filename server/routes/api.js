const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('ok')
})

router.get('/test', function (req, res) {
  res.send('tests')
})

module.exports = router;