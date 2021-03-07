const mysql = require ('mysql');
const config = require ('./Config').config;
const util = require ('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.mysql_db.user,
    password: config.mysql_db.password,
    database: config.mysql_db.database,
    port: config.mysql_db.port,
    multipleStatements: true,
    debug: false
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release();

});

pool.query = util.promisify(pool.query);

module.exports.db = pool;