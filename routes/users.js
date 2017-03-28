var express = require('express');
var router = express.Router();
var userServer = require('../server/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
});
router.get('/add',function (req, res, next) {
  var result = userServer.addUser();
  res.send(result);
});

module.exports = router;
