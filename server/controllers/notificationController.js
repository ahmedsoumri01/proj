const db = require('../config/database');
const Notification = require('../models/notification');
const User = require('../models/user')
async function createNotification(message, userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const notification = await Notification.create({
      message_notif: message,
      id_util: userId,
      ouvert: false // set ouvert as false by default
    });

    console.log('Notification created!');
    return notification;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}


  
// Get all Notification
async function getAllNotifications(req, res) {
  try {
    const notification = await Notification.findAll();
    res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get a Notification by ID
async function getNotificationById(req, res) {
  try {
    
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Update a Notification
async function updateNotification(req, res) {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) {
      res.status(404).send('Notification not found');
      return;
    }
    await notification.update(req.body);
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
  }
}

// Delete a Notification
async function deleteNotification(req, res) {
  try {
   
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await notification.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification };
/*
//iiiiiiiiiii

// Import necessary modules
const { Ticket, TicketHistory } = require('../models');
const Sequelize = require('sequelize');

// Create function for creating a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, department } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      department,
      status: 'Pending',
    });
    // Send notification to superuser
    // ...
    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create function for retrieving all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create function for retrieving a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create function for updating a ticket
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo } = req.body;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    await ticket.update({
      status,
      assignedTo,
    });
    // Send notification to head department
    // ...
    res.json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create function for deleting a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    await Ticket.destroy({
      where: {
        id,
      },
    });
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create function for retrieving ticket history by ticket ID
exports.getTicketHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    const history = await TicketHistory.findAll({
      where: {
        ticketId: id,
      },
    });
    res.json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//
// ticket.controller.js

const db = require('../models');
const Ticket = db.Ticket;
const History = db.History;

// Function to create a new ticket
exports.create = (req, res) => {
  // Extract ticket information from request body
  const { title, description, department } = req.body;

  // Create a new ticket
  Ticket.create({
    title: title,
    description: description,
    department: department,
    status: 'Open'
  })
    .then(ticket => {
      // Send notification to superuser
      // ...
      res.status(201).json(ticket);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Function to retrieve all tickets
exports.findAll = (req, res) => {
  Ticket.findAll()
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Function to retrieve a specific ticket by ID
exports.findById = (req, res) => {
  const id = req.params.id;

  Ticket.findByPk(id)
    .then(ticket => {
      if (ticket) {
        res.status(200).json(ticket);
      } else {
        res.status(404).json({ message: `Ticket with ID ${id} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Function to update a ticket
exports.update = (req, res) => {
  const id = req.params.id;
  const { title, description, department, status } = req.body;

  Ticket.update(
    {
      title: title,
      description: description,
      department: department,
      status: status
    },
    { where: { id: id } }
  )
    .then(num => {
      if (num == 1) {
        // Send notification to head department
        // ...
        res.status(200).json({ message: `Ticket with ID ${id} was updated successfully` });
      } else {
        res.status(404).json({ message: `Ticket with ID ${id} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Function to delete a ticket
exports.delete = (req, res) => {
  const id = req.params.id;

  Ticket.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ message: `Ticket with ID ${id} was deleted successfully` });
      } else {
        res.status(404).json({ message: `Ticket with ID ${id} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Function to retrieve ticket history
exports.findHistory = (req, res) => {
  const id = req.params.id;

  History.findAll({ where: { ticketId: id } })
    .then(history => {
      res.status(200).json(history);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};*/