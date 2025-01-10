const db = require('../config/db');

// Get messages for a group
exports.getMessages = (req, res) => {
    const { groupId } = req.params;

    // Query to fetch messages with user details
    const query = `
        SELECT 
            Messages.id AS message_id,
            Messages.message,
            Messages.timestamp,
            users.username AS sender_username
        FROM Messages
        JOIN users ON Messages.user_id = users.id
        WHERE Messages.group_id = ?
        ORDER BY Messages.timestamp ASC
    `;

    db.query(query, [groupId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch messages' });
        }
        res.status(200).json(results);
    });
};

// Send a new message
exports.sendMessage = (req, res) => {
    const { groupId } = req.params;
    const { userId, message } = req.body;

    // Check for required fields
    if (!groupId || !userId || !message) {
        return res.status(400).json({ error: 'Group ID, User ID, and message are required' });
    }

    // Insert the message into the Messages table
    const query = `
        INSERT INTO Messages (group_id, user_id, message)
        VALUES (?, ?, ?)
    `;

    db.query(query, [groupId, userId, message], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to send message' });
        }
        res.status(201).json({ message: 'Message sent successfully', messageId: results.insertId });
    });
};