const mysql = require("mysql2");

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'itshop',
})
module.exports = conn;