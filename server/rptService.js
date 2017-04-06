/*******************************************
 * File Name : rptService.js
 * Author : May
 * Create Date : 2017/4/6
 * Description :
 ******************************************/

"use strict";

const sql = require('../MssqlHelper');

let rptServ = {};

rptServ.getBar1 = function (func) {
  let sqlString =
    "SELECT T.*, ROW_NUMBER() OVER(ORDER BY T.Amount DESC) AS Ranking\n" +
    "  FROM (SELECT t.Material\n" +
    "              ,SUM(t.Qty) OVER(PARTITION BY t.Material) AS Qty\n" +
    "              ,SUM(t.Price) OVER(PARTITION BY t.Material) AS Amount\n" +
    "          FROM dbo.t_order t) T\n" +
    " ORDER BY Ranking";
  sql.query(sqlString, func)
};
module.exports = rptServ;