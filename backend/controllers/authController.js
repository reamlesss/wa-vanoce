const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email],
            (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        res.status(400).json({ message: 'Username or email already exists.' });
                    } else {
                        res.status(500).json(err);
                    }
                } else {
                    res.status(201).json({ message: 'User registered successfully.' });
                }
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};

// Login a user
exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM Users WHERE username = ?',
        [username],
        async (err, results) => {
            if (err) {
                res.status(500).json(err);
            } else if (results.length === 0) {
                res.status(401).json({ message: 'Invalid username or password.' });
            } else {
                const user = results[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    res.status(200).json({ message: 'Login successful.' });
                } else {
                    res.status(401).json({ message: 'Invalid username or password.' });
                }
            }
        }
    );
};