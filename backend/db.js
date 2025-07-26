const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL root password
  database: 'ratings_db', // your database name
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});

module.exports = db;
