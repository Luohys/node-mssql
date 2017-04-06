
const express = require('express');
const router = express.Router();
const userServer = require('../server/userService');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function (req, res, next) {
  let result = userServer.addUser();
  res.send(result);
});

module.exports = router;
