/**
 * Created by May on 2017/3/21.
 */
const mssql = require("mssql");

let sql = {};

//连接参数配置
const config = {
    user: "sa",
    password: "server!@#456",
    server: "127.0.0.1",
    database: "T_M_DB",
    stream: true,
    option: {
        encrypt: true
    },
    pool: {
        min: 0,
        idleTimeoutMillis: 30000
    }
};

sql.sqlserver = mssql;

//sql参数的类型
sql.direction = {
    //输入参数
    Input: "input",
    //输出参数
    Output: "output",
    //返回参数
    Return: "return"
};

/**
 * 执行存储过程
 * @param {string} procedure 存储过程名称
 * @param {JSON} params 存储过程参数
 * params的定义格式如：
 let params={
    //ID是存储过程的第一个参数，要去掉@符号
    ID:{
        //sqlType是该ID参数在sqlserver中的类型
        sqlType:sql.sqlserver.Int,
        //direction是表明ID参数是输入还是输出(output)参数
        direction:sql.direction.Input,
        //该ID参数的值
        inputValue:1
    },
    //Name是存储过程的第二个参数，要去掉@符号
    Name:{
        sqlType:sqlHelper.sqlserver.Int,
        direction:sqlHelper.direction.Output,
        outputValue:null
    }
};
 * @param {function} func 回调函数 共有四个参数 error:错误信息 recordsets:查询的表结果 returnValue:存储过程的返回值 affected:影响的行数
 */
sql.execute = function (procedure, params, func) {
    try {
        let connection = new mssql.connect(config, function (error) {
            if (error)
                func(error);
            else {
                let request = new mssql.Request(connection);
                //request.verbose=true;
                if (params != null) {
                    for (let index in params) {
                        if (params[index].direction == sql.direction.Output) {
                            request.output(index, params[index].sqlType);
                        }
                        else {
                            request.input(index, params[index].sqlType, params[index].inputValue);
                        }
                    }
                }
                request.execute(procedure, function (error, recordsets, returnValue, affected) {
                    if (error)
                        func(error);
                    else {
                        for (let index in params) {
                            if (params[index].direction == sql.direction.Output) {
                                params[index].outputValue = request.parameters[index].value;
                            }
                        }
                        func(error, recordsets, returnValue, affected);
                    }
                });
            }
        });

        connection.on("error", func);

    } catch (e) {
        func(e);
    }
};

/**
 * 执行sql文本(带params参数)
 * @param {string} sqltext 执行的sql语句
 * @param {JSON} params sql语句中的参数
 * @param {function} func 回调函数 共有三个参数 error:错误消息 recordsets:查询的结果 affected:影响的行数
 */
sql.queryWithParams = function (sqltext, params, func) {
    try {
        const pool = new mssql.ConnectionPool(config, err => {
            if (err) {
                console.log(err);
            } else {
                const request = new mssql.Request(pool);
                request.multiple = true;
                if (params) {
                    for (let index in params) {
                        request.input(index, params[index].sqlType, params[index].inputValue);
                    }
                }
                request.query(sqltext, function (err, result) {
                    if (err) {
                        return err;
                    } else {
                        return result.rowsAffected;
                    }
                })
            }
        });
        pool.on("error", err => {
            console.log(err);
        });
    } catch (e) {
        func(e);
    }
};

/**
 * 执行sql文本
 * @param {string} sqltext 执行的sql语句
 * @param {function} func 回调函数 共有三个参数 error:错误消息 recordsets:查询的结果 affected:影响的行数
 */
sql.query = function (sqltext, func) {
    sql.queryWithParams(sqltext, null, func);
};

/**
 * 执行大批量数据的插入
 * @param {sqlserver.Table} table 需要插入的数据表
 * 数据表的定义如下：
 let table=new sql.sqlserver.Table('UserInfoTest');
 table.create=true;
 table.columns.add('name',sqlHelper.sqlserver.NVarChar(50),{nullable:true});
 table.columns.add('pwd',sqlHelper.sqlserver.VarChar(200),{nullable:true});
 table.rows.add('张1','jjasdfienf');
 table.rows.add('张2','jjasdfienf');
 table.rows.add('张3','jjasdfienf');
 * @param {function} func 回调函数 共有两个参数 error:错误信息 rowcount:插入数据的行数
 */
sql.bulkInsert = function (table, func) {
    try {
        if (table) {
            let connection = new mssql.connect(config, function (err) {
                if (err) {
                    func(err);
                }
                else {
                    let request = new mssql.Request(connection);
                    request.bulk(table, func);
                }
            });
            connection.on("error", func);
        }
        else
            func(new ReferenceError('table parameter undefined!'));
    } catch (e) {
        func(e);
    }
};

/**
 * 如果需要处理大批量的数据行，通常应该使用流
 * @param {string} sqltext 需要执行的sql文本
 * @param {JSON} params 输入参数
 * @param {JSON} func 表示一个回调函数的JSON对象，如下所示：
 * {
    error:function(err){
        console.log(err);
    },
    columns:function(columns){
        console.log(columns);
    },
    row:function(row){
        console.log(row);
    },
    done:function(affected){
        console.log(affected);
    }
 */
sql.queryViaStreamWithParams = function (sqltext, params, func) {
    try {
        config.stream = true;

        mssql.connect(config, function (err) {
            if (err)
                func.error(err);
            else {
                let request = new mssql.Request();
                request.stream = true;// You can set streaming differently for each request
                if (params) {
                    for (let index in params) {
                        request.input(index, params[index].sqlType, params[index].inputValue);
                    }
                }

                request.query(sqltext);

                request.on('recordset', function (columns) {
                    //columns是一个JSON对象，表示 返回数据表的整个结构，包括每个字段名称以及每个字段的相关属性
                    //如下所示
                    /*
                     { id:
                     { index: 0,
                     name: 'id',
                     length: undefined,
                     type: [sql.Int],
                     scale: undefined,
                     precision: undefined,
                     nullable: false,
                     caseSensitive: false,
                     identity: true,
                     readOnly: true },
                     name:
                     { index: 1,
                     name: 'name',
                     length: 100,
                     type: [sql.NVarChar],
                     scale: undefined,
                     precision: undefined,
                     nullable: true,
                     caseSensitive: false,
                     identity: false,
                     readOnly: false },
                     Pwd:
                     { index: 2,
                     name: 'Pwd',
                     length: 200,
                     type: [sql.VarChar],
                     scale: undefined,
                     precision: undefined,
                     nullable: true,
                     caseSensitive: false,
                     identity: false,
                     readOnly: false } }
                     */
                    func.columns(columns);
                });

                request.on('row', function (row) {
                    //row是一个JSON对象，表示 每一行的数据，包括字段名和字段值
                    //如 { id: 1004, name: 'jsw', Pwd: '12345678' }
                    //如果行数较多，会多次进入该方法，每次只返回一行
                    func.row(row);
                });

                request.on('error', function (err) {
                    //err是一个JSON对象，表示 错误信息
                    //如下所示：
                    /*
                     { [RequestError: Incorrect syntax near the keyword 'from'.]
                     name: 'RequestError',
                     message: 'Incorrect syntax near the keyword \'from\'.',
                     code: 'EREQUEST',
                     number: 156,
                     lineNumber: 1,
                     state: 1,
                     class: 15,
                     serverName: '06-PC',
                     procName: '' }
                     */
                    func.error(err);
                });

                request.on('done', function (affected) {
                    //affected是一个数值，表示 影响的行数
                    //如 0
                    //该方法是最后一个执行
                    func.done(affected);
                });
            }
        });

        mssql.on('error', func.error);
    } catch (e) {
        func.error(e);
    } finally {
        config.stream = false;
    }
};

/**
 * 如果需要处理大批量的数据行，通常应该使用流
 * @param {string} sqltext 需要执行的sql文本
 * @param {JSON} func 表示一个回调函数的JSON对象，如下所示：
 * {
    error:function(err){
        console.log(err);
    },
    columns:function(columns){
        console.log(columns);
    },
    row:function(row){
        console.log(row);
    },
    done:function(affected){
        console.log(affected);
    }
 */
sql.queryViaStream = function (sqltext, func) {
    sql.queryViaStreamWithParams(sqltext, null, func);
};


module.exports = sql;