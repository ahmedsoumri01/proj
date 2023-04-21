const TicketDetail = require('../models/ticket_detail');

exports.getTicketDetailById = async (req, res, next) => {
  try {
    const { id_ticket_detail } = req.params;
    const ticketDetail = await TicketDetail.findByPk(id_ticket_detail);
    if (!ticketDetail) {
      const error = new Error(`Ticket detail with id ${id_ticket_detail} not found`);
      error.statusCode = 404;
      throw error;
    }
    res.json(ticketDetail);
  } catch (err) {
    next(err);
  }
};

// GET all ticket details
exports.getAllTicketDetail =async (req, res) => {
    try {
      const ticketDetails = await TicketDetail.findAll();
      res.status(200).json(ticketDetails);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  



exports.updateTicketDetail = async (req, res, next) => {
  try {
    const { id_ticket_detail } = req.params;
    const { titre_ticket, description_ticket, id_sous_categorie, deadline_ticket, attachement_ticket } = req.body;
    const ticketDetail = await TicketDetail.findByPk(id_ticket_detail);
    if (!ticketDetail) {
      const error = new Error(`Ticket detail with id ${id_ticket_detail} not found`);
      error.statusCode = 404;
      throw error;
    }
    ticketDetail.titre_ticket = titre_ticket;
    ticketDetail.description_ticket = description_ticket;
    ticketDetail.id_sous_categorie = id_sous_categorie;
    ticketDetail.deadline_ticket = deadline_ticket;
    ticketDetail.attachement_ticket = attachement_ticket;
    await ticketDetail.save();
    res.json(ticketDetail);
  } catch (err) {
    next(err);
  }
};

exports.deleteTicketDetail = async (req, res, next) => {
  try {
    const { id_ticket_detail } = req.params;
    const ticketDetail = await TicketDetail.findByPk(id_ticket_detail);
    if (!ticketDetail) {
      const error = new Error(`Ticket detail with id ${id_ticket_detail} not found`);
      error.statusCode = 404;
      throw error;
    }
    await ticketDetail.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
