const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/:id', notificationController.getNotificationById);
router.post('/notifications', notificationController.createNotification);
router.put('/notifications/:id', notificationController.updateNotification);
router.delete('/notifications/:id', notificationController.deleteNotification);

module.exports = router; 