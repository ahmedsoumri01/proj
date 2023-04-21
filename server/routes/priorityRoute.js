const express = require('express');
const router = express.Router();
const PriorityController = require('../controllers/priorityController');

router.get('/priorites', PriorityController.getAllPriority);
router.get('/priorites/:id', PriorityController.getPriorityById);
router.post('/priorites', PriorityController.createPriority);
router.put('/priorites/:id', PriorityController.updatePriority);
router.delete('/priorites/:id', PriorityController.deletePriority);

module.exports = router; 