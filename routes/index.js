"use strict";

const express = require('express');
const router = express.Router();
const rpt = require('./reporting');
const users = require('./users');

/* Home Page */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/rpt',rpt);

router.use('/users',users);

module.exports = router;
