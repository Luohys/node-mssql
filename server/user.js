/**
 * Created by May on 2017/3/21.
 */
const sql = require('../MssqlHelper');
let userServ = {};

userServ.addUser = function (callback) {
  let sqlString =
    "INSERT  INTO dbo.student" +
    "        ( SName, SGrade, SClass, SScore )" +
    "VALUES  ( @name, @grade, @class, @score )";
  let para = {
    name: {sqlType: sql.sqlserver.NVarChar(20), inputValue: "John"},
    grade: {sqlType: sql.sqlserver.Int, inputValue: "5"},
    class: {sqlType: sql.sqlserver.Int, inputValue: "4"},
    score: {sqlType: sql.sqlserver.Numeric(6, 2), inputValue: "88.74"}
  };
  sql.queryWithParams1(sqlString, para, function (error, recordsets, affected) {
    if (error) {
      return -1;
    } else {
      return affected;
    }
  })
};

module.exports = userServ;