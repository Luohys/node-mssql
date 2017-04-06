/*******************************************
 * File Name : reporting.js
 * Author : May
 * Create Date : 2017/4/6
 * Description :
 ******************************************/

"use strict";

const express = require('express');
const router = express.Router();
const rptService = require('../server/rptService');

router.get('/', function(req, res, next) {
  res.render('chart');
});

router.get('/demo/bar1',function (req, res) {
  rptService.getBar1(function (error, recordsets) {
    if (error) {
      res.send(error);
    } else {
      res.send(recordsets);
    }
  });
});

module.exports = router;
