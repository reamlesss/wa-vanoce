const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/:groupId/message', messageController.sendMessage); // Send a message
router.get('/:groupId/messages', messageController.getMessagesByGroup); // Get all messages in a group
router.delete('/message/:messageId', messageController.deleteMessage); // Delete a specific message

module.exports = router;