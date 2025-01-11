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



exports.getGroupDetails = (req, res) => {
    const { groupId } = req.params;

    // Fetch group name
    db.query('SELECT name FROM `groups` WHERE id = ?', [groupId], (err, groupResults) => {
        if (err) return res.status(500).json(err);
        if (groupResults.length === 0) {
            return res.status(404).json({ message: 'Group not found.' });
        }

        const groupName = groupResults[0].name;

        // Fetch messages
        db.query(
            `SELECT m.id, m.message, m.timestamp, u.username AS sender
             FROM Messages m
             JOIN users u ON m.user_id = u.id
             WHERE m.group_id = ?
             ORDER BY m.timestamp ASC`,
            [groupId],
            (err, messageResults) => {
                if (err) return res.status(500).json(err);

                // Fetch members
                db.query(
                    `SELECT u.username
                     FROM group_members gm
                     JOIN users u ON gm.user_id = u.id
                     WHERE gm.group_id = ?`,
                    [groupId],
                    (err, memberResults) => {
                        if (err) return res.status(500).json(err);

                        res.status(200).json({
                            name: groupName,
                            messages: messageResults,
                            members: memberResults.map((member) => member.username),
                        });
                    }
                );
            }
        );
    });
};

