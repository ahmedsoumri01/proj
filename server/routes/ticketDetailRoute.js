const express = require('express');
const router = express.Router();
const ticketDetailController = require('../controllers/ticketDetailController');


router.get('/ticketDetails', ticketDetailController.getAllTicketDetail);
router.get('/ticketDetails/:id', ticketDetailController.getTicketDetailById);

//router.put('/tickets/:id', ticketController.updateTicket);
router.delete('/ticketDetails/:id', ticketDetailController.deleteTicketDetail);

module.exports = router; 