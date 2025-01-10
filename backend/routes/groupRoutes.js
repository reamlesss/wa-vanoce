const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

// Create Group Route
router.post('/create', groupController.createGroup);

// Get All Groups Route
router.get('/all', groupController.getAllGroups);

// Join Group Route
router.post('/join', groupController.joinGroup);

module.exports = router;