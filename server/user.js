/**
 * Created by May on 2017/3/21.
 */
var sql = require('../MssqlHelper');
var userServ = {};

userServ.addUser = function (callback) {
    const sqlString =
        "INSERT  INTO dbo.student" +
        "        ( SName, SGrade, SClass, SScore )" +
        "VALUES  ( @name, @grade, @class, @score )";
    var para = {
        name: {sqlType: sql.sqlserver.NVarChar(20), inputValue: "John"},
        grade: {sqlType: sql.sqlserver.Int, inputValue: "5"},
        class: {sqlType: sql.sqlserver.Int, inputValue: "4"},
        score: {sqlType: sql.sqlserver.Numeric(6, 2), inputValue: "88.74"}
    };
    sql.queryWithParams(sqlString, para, function (error, recordsets, affected) {
        if (error) {
            return -1;
        } else {
            return affected;
        }
    })
};

module.exports = userServ;