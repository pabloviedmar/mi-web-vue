const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'tech_admin',
  password: process.env.DB_PASSWORD || 'secure_password',
  database: process.env.DB_NAME || 'tech_componentes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises for async/await
const promisePool = pool.promise();

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.code, err.message);
  } else {
    console.log('Successfully connected to the MySQL database.');
    connection.release();
  }
});

module.exports = promisePool;
