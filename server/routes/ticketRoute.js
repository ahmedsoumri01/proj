const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/tickets', ticketController.getAllTickets);
router.get('/tickets/:id', ticketController.getTicketById);
router.post('/tickets', ticketController.createTicket);
//router.put('/tickets/:id', ticketController.updateTicket);
router.delete('/tickets/:id', ticketController.deleteTicket);
router.put('/ticketss/:id/status', ticketController.updateTicketStatus);

module.exports = router; 