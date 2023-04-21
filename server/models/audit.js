const {DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sequelize  = require('sequelize')
const User = require('./user')
const Ticket = require('./ticket')

const TicketAction = sequelize.define('TicketAction', {
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_creation: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }

  });
  
  TicketAction.belongsTo(User);
  TicketAction.belongsTo(Ticket);

  //iiiiiiiiii
/*
  const db  = require('../config/database');
const { Op } = require("sequelize");
const Ticket = require('../models/ticket');
const User = require("../models/user");
const NotificationController = require('./NotificationController');

async function createTicket(req, res) {
  const { 
    titre_ticket, 
    id_initiateur_ticket, 
    id_projet, 
    id_sous_categorie, 
    date_cloture_ticket 
  } = req.body;

  try {
    const ticket = await Ticket.create({
      titre_ticket,
      id_initiateur_ticket,
      id_projet,
      id_sous_categorie,
      date_cloture_ticket,
      status: "Pending"
    });

    // find superuser and notify them of new ticket
    const superuser = await User.findOne({ where: { role_util: "superutil" } });
    NotificationController.createNotification(`New ticket created by ${req.user.username}: ${ticket.titre_ticket}`, superuser.id);

    res.status(201).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function validateTicket(req, res) {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // check if user is a superuser
    const user = await User.findByPk(req.user.id);
    if (user.role_util !== "superutil") {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    // update ticket status to "In Progress"
    ticket.status = "In Progress";
    await ticket.save();

    // send email to department head with ticket details
    const departmentHead = await User.findOne({ where: { role_util: "chefdep", id_department: ticket.id_department } });
    // use a library like nodemailer to send email
    sendEmail(departmentHead.email, "New ticket assigned", `Ticket ${ticket.id} assigned to you`);

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
}
}


// Define a new route to display the details of a ticket
app.get('/tickets/:id', async (req, res) => {
  const ticketId = req.params.id;
  
  try {
    // Retrieve the ticket from the database and include the associated user and ticket details
    const ticket = await Ticket.findOne({ 
      where: { id_ticket: ticketId }, 
      include: [
        { model: User, as: 'initiateur' }, 
        { model: User, as: 'validateur' }, 
        { model: Departement },
        { model: Projet },
        { model: SousCategorie },
        { model: TicketDetail }
      ]
    });
    
    // Render the ticket details view and pass in the ticket data
    res.render('ticket-details', { ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/*For a superuser to view the tickets they need to validate, you can implement a route that fetches all the tickets where id_validateur_ticket matches the ID of the logged-in superuser and the statut_ticket is set to 'Pending'.

Here is an example of how you can implement these routes:

javascript
Copy code*/
// Route to get tickets created by a user
/*
router.get('/my-tickets', async (req, res) => {
  const userId = req.user.id_util;

  try {
    const tickets = await Ticket.findAll({ where: { id_initiateur_ticket: userId } });

    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Route to get tickets that a superuser needs to validate
router.get('/tickets-to-validate', async (req, res) => {
  const superuserId = req.user.id_util;

  try {
    const tickets = await Ticket.findAll({ where: { id_validateur_ticket: superuserId, statut_ticket: 'Pending' } });

    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});*/