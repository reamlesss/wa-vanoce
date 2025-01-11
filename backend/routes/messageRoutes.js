const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/:groupId/send', messageController.sendMessage); // Send a message
router.get('/:groupId/get', messageController.getMessagesByGroup); // Get all messages in a group
router.delete('/delete/:messageId', messageController.deleteMessage); // Delete a specific message

module.exports = router;