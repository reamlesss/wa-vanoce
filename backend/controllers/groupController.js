const db = require('../config/db');

// Create a new group
exports.createGroup = (req, res) => {
    const { name, allowedUsernames } = req.body;

    db.query('INSERT INTO `groups` (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Group name already exists.' });
            }
            return res.status(500).json(err);
        }

        const groupId = result.insertId;

        if (allowedUsernames && allowedUsernames.length > 0) {
            db.query(
                'SELECT id FROM users WHERE username IN (?)',
                [allowedUsernames],
                (err, users) => {
                    if (err) return res.status(500).json(err);

                    const groupMembers = users.map((user) => [groupId, user.id]);
                    db.query(
                        'INSERT INTO group_members (group_id, user_id) VALUES ?',
                        [groupMembers],
                        (err) => {
                            if (err) return res.status(500).json(err);

                            res.status(201).json({ message: 'Group created with specific members!', groupId });
                        }
                    );
                }
            );
        } else {
            res.status(201).json({ message: 'Group created and open to everyone!', groupId });
        }
    });
};

// Get all groups
exports.getAllGroups = (req, res) => {
    console.log("getall started")
    db.query('SELECT * FROM `groups`', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

// Join a group
exports.joinGroup = (req, res) => {
    const { userId, groupId } = req.body;
    db.query(
        'INSERT INTO group_members (user_id, group_id) VALUES (?, ?)',
        [userId, groupId],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: 'Joined group successfully.' });
        }
    );
};