const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  const { name, email, address, password } = req.body;

  if (!name || !email || !address || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });
    if (result.length > 0) return res.status(409).json({ success: false, message: 'Email already exists' });

    const insertQuery = 'INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [name, email, address, hashedPassword, 'user'], (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error' });

      return res.status(201).json({ success: true, message: 'User registered' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, users) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });

    if (users.length === 0) return res.status(401).json({ success: false, message: 'User not found' });

    const user = users[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
};
