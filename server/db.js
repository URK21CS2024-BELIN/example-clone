var mysql = require('mysql2/promise');

var mysqlpool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todo_db"
});

module.exports = mysqlpool;