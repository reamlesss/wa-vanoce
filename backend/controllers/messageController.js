const db = require('../config/db');

// Send a message to a group
exports.sendMessage = (req, res) => {
    const { groupId } = req.params;
    const { userId, message } = req.body;

    if (!message || !userId) {
        return res.status(400).json({ message: "Message and userId are required." });
    }

    db.query(
        'INSERT INTO Messages (group_id, user_id, message) VALUES (?, ?, ?)',
        [groupId, userId, message],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Failed to send message.", error: err });
            }
            res.status(201).json({ message: "Message sent successfully.", messageId: result.insertId });
        }
    );
};

// Get all messages in a group
exports.getMessagesByGroup = (req, res) => {
    const { groupId } = req.params;

    db.query(
        `SELECT m.id, m.message, m.timestamp, u.username 
         FROM Messages m 
         JOIN users u ON m.user_id = u.id 
         WHERE m.group_id = ? 
         ORDER BY m.timestamp ASC`,
        [groupId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch messages.", error: err });
            }
            res.status(200).json(results);
        }
    );
};

// Delete a specific message
exports.deleteMessage = (req, res) => {
    const { messageId } = req.params;

    db.query(
        'DELETE FROM Messages WHERE id = ?',
        [messageId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Failed to delete message.", error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Message not found." });
            }
            res.status(200).json({ message: "Message deleted successfully." });
        }
    );
};