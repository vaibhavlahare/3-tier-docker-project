const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow frontend to access this backend

const db = mysql.createConnection({
  host: 'db',        // Service name of the DB container (as per docker-compose)
  user: 'root',
  password: 'password',
  database: 'testdb'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Backend API running on http://localhost:5000');
});
