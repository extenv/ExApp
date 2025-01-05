const mysql = require('mysql2');
require('dotenv').config();

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Menangani koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to Database!');
});

// Mengekspor objek koneksi untuk digunakan di file lain
module.exports = db;
