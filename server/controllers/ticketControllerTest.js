const db = require('../config/database');
const Ticket = require('../models/ticket');
const TicketDetail = require('../models/ticket_detail');
const User = require("../models/user");
const NotificationController = require('./NotificationController');
const Departement = require("../models/departement");

//create ticket + notif superUser

async function createTicket(req, res) {

  const { titre_ticket, description_ticket, id_departement, id_sous_categorie, deadline_ticket, attachement_ticket, id_projet } = req.body;
  const createdBy = req.body.id_initiateur_ticket;

  try {

    //find the category of the sub category defined
    const subCategory = await SubCategory.findOne({ where: { id_sous_categorie: id_sous_categorie }, include: [{ model: Category }] });
    const category = subCategory.Category;

    //find the head depart of the category related to the sub category
    const headDepartement = await Departement.findOne({ where: { id_departement: category.id_departement }, include: [{ model: User, as: 'chef' }] });
    const head = headDepartement.chef;

    // Create Ticket record
    const ticket = await Ticket.create({
      id_initiateur_ticket: createdBy,
      id_validateur_ticket: head?.id_util,
      id_departement,
      id_projet,
      statut_ticket: 'Pending',
      date_creation_ticket: new Date()
    });

    // Create TicketDetail record
    const ticketDetail = await TicketDetail.create({
      titre_ticket,
      description_ticket,
      id_projet,
      id_sous_categorie,
      id_ticket: ticket.id_ticket,
      deadline_ticket,
      attachement_ticket
    });

    // Notify the head of the department
    NotificationController.createNotification(`New ticket created by ${createdBy}: ${titre_ticket}`, head?.id_util);

    res.status(201).json({ message: "Ticket created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
  
///****/////////////////////////////////////////*********************
//update status 
     async function updateTicketStatus(req, res) {
        const { id } = req.params;
        const { statut_ticket } = req.body;
        const createdBy = req.body.id_initiateur_ticket;
        const validatedBy = req.body.id_validateur_ticket;
        try {
          const ticket = await Ticket.findByPk(id);
          if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
          }
      
          // check authorization based on the new status
          const user = await User.findOne({ where: { id_util: createdBy }, include: [{ model: User, as: 'super' }] });
          const superUser = user.super;

          
         /* if (
            (statut_ticket === "resolved" && superUser) )
            return res.status(403).json({ message: "ticket is closed " });
          */
      if (superUser && statut_ticket === "pending")
      {ticket.statut_ticket = "In Progress";
    }
        if (validatedBy && statut_ticket === "in progress")
        {ticket.statut_ticket = "resolved";
        }  
         await ticket.save();
      
    
          // send notifications based on the new status
          if (statut_ticket === "In Progress") {
            
            NotificationController.createNotification(`Ticket ${id_ticket} assigned to you`, validatedBy);
            NotificationController.createNotification(`Ticket ${id_ticket} has been validated by ${superUser}`, ticket.id_initiateur_ticket);
           
          } else if (statut_ticket === "Resolved") {
            NotificationController.createNotification(`Ticket ${ticket.id} has been resolved`, ticket.id_initiateur_ticket);
          }
        
      
          res.status(200).json(ticket);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Something went wrong" });
        }
      }
    

 
/*******************************////////************************************** */ */


// Update ticket function for superuser
async function updateTicket(req, res) {
  const { id } = req.params;
 
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check authorization based on the user who created the ticket and the superuser
    const user = await User.findByPk(req.user.id);
    const ticketCreator = await User.findByPk(ticket.id_initiateur_ticket);
    if (user.id_util !== ticketCreator.id_superUser) {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    await ticket.update({...req.body,updatedAt: new Date()} );

    // Send notification to creator
     
      NotificationController.createNotification(`Ticket ${ticket.id} has been updated`, ticket.id_initiateur_ticket);

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


/**************affectation********************** */

async function assignTicket(req, res) {
  const { id } = req.params;
  const { id_validateur_ticket } = req.body;
  const currentUser = req.user;

  try {
    const ticket = await Ticket.findByPk(id, { include: [User] });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check authorization based on the current status
    if (ticket.status !== "resolved") {
      return res.status(403).json({ message: "Ticket is not resolved" });
    }

    // Check if the current user is the head of department
    const currentUserId = currentUser.id_util;
    const currentDepartmentId = currentUser.id_departement;
    const currentHeadOfDepartment = await User.findOne({
      where: { id_departement: currentDepartmentId, role: "head" },
    });
    if (!currentHeadOfDepartment || currentHeadOfDepartment.id_util !== currentUserId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Check if the assigned validator belongs to the same department
    const assignedValidator = await User.findByPk(id_validateur_ticket);
    if (!assignedValidator || assignedValidator.id_departement !== currentDepartmentId) {
      return res.status(400).json({ message: "Invalid assignment" });
    }

    // Assign the ticket to the validator
    ticket.id_validateur_ticket = assignedValidator.id_util;
    ticket.status = "assigned";
    await ticket.save();

    // Send notification to the assigned validator
    NotificationController.createNotification(`Ticket ${id} assigned to you.`, assignedValidator.id_util);

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}














/*
////////////////affectation autoo 
async function assignTicket(req, res) {
  const { id } = req.params;
  const { id_validateur_ticket } = req.body;
  const currentUser = req.user;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check if the current user is the head of the department.
    if (currentUser.id_util !== ticket.departement.head) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Fetch a list of all users who belong to the same department as the current user.
    const usersInDepartment = await User.findAll({ where: { id_departement: currentUser.id_departement } });

    // Check if the assigned user is in the list of users who belong to the same department.
    const assignedUser = usersInDepartment.find(user => user.id_util === id_validateur_ticket);
    if (!assignedUser) {
      return res.status(400).json({ message: "Invalid assignment" });
    }

    ticket.id_validateur_ticket = id_validateur_ticket;
    ticket.statut_ticket = "affected to " + assignedUser.nom_util; // Set the ticket's status to "affected to" + the assigned user's name.
    await ticket.save();

    // Send notification to the assigned user.
    NotificationController.createNotification(`Ticket ${id} assigned to you.`, assignedUser.id_util);

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}*/
/*

  //for superuser to validate 
  async function validateTicket(req, res) {
    const { id } = req.params;
  
    try {
      const ticket = await Ticket.findByPk(id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      // check if user is a superuser
      const user = await User.findByPk(req.user.id);
      if (user.role !== "superuser") {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
      }
  
      // update ticket status to "In Progress"
      ticket.status = "In Progress";
      await ticket.save();
  
      // send email to department head with ticket details
      const departmentHead = await User.findOne({ where: { role: "department head", department: ticket.id_department } });
      // use a library like nodemailer to send email
      sendEmail(departmentHead.email, "New ticket assigned", `Ticket ${ticket.id} assigned to you`);
  
      res.status(200).json(ticket);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
*/
  //when department head validates ticket 
  
/*
async function resolveTicket(req, res) {
    const { id } = req.params;
  
    try {
      const ticket = await Ticket.findByPk(id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      // check if user is the department head
      const user = await User.findByPk(req.user.id);
      if (user.role !== "department head" || user.department !== ticket.id_department) {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
      }
  
      // update ticket status to "Resolved"
      ticket.status = "Resolved";
      await ticket.save();
  
      res.status(200).json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  //sending notif 
  async function getNotifications(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
  
      // find all tickets assigned to the user and have a status of "In Progress" or "Pending"
      const tickets = await Ticket.findAll({ 
        where: { 
          [Op.or]: [{ 
            status: "In Progress" 
          }, { 
            status: "Pending" 
          }], 
          id_department: user.department 
        },
        include: [{ 
          model: User, 
          as: "departmentHead"
        }]
      });
      
      res.status(200).json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
*/
  
  
//update ticket + notif
  

async function updateTicket(req, res) {
  try {
    // Find the ticket and update its status
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = req.body.status;
    ticket.id_department = req.body.department;
    ticket.save();

    // Find department head and notify them of updated ticket
    if (ticket.status === "In Progress") {
      const departmentHead = await User.findOne({
        where: { department: ticket.id_department, is_head: true }
      });

      NotificationController.createNotification(`Ticket ${ticket.id} has been assigned to you for resolution`, departmentHead.id);
    }

    // Find user and notify them of updated ticket
    const user = await User.findByPk(ticket.id_user);

    NotificationController.createNotification(`Ticket ${ticket.id} status updated to ${ticket.status}`, user.id);

    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

//
async function updateStatus(req, res){
    try {
        const { userId } = req.body;
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) {
          return res.status(404).send('Ticket not found');
        }
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).send('User not found');
        }
        if (!user.isAdmin) {
          return res.status(403).send('Forbidden');
        }
        if (ticket.status !== 'pending') {
          return res.status(400).send('Ticket is not pending');
        }
        ticket.status = 'in progress';
        await ticket.save();
        const ticketAction = await TicketAction.create({
          action: 'in progress',
          UserId: user.id,
          TicketId: ticket.id
        });
        res.json(ticket);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    }
module.exports(createTicket,validateTicket,resolveTicket,getNotifications , updateTicket)

//another one
const { Op } = require("sequelize");
const db = require("../config/database");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const NotificationController = require("./NotificationController");
const Departement = require('../models/departement');

// Create a new ticket
async function createTicket(req, res) {
  const {
    title,
    description,
    department
  } = req.body;

  try {
    // Create new ticket
    const newTicket = await Ticket.create({
      title,
      description,
      id_user: req.user.id,
      status: "New",
      id_department: department
    });

    // Find superuser and notify them of new ticket
    const superuser = await User.findOne({
      where: {
        is_super: true
      }
    });

    NotificationController.createNotification(
      `New ticket created by ${req.user.username}: ${newTicket.title}`,
      superuser.id
    );

    res.status(201).json({
      message: "Ticket created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
}

// Create a new ticket and send a notification to the superuser
async function createTicket(req, res) {
  const {
    titre_ticket,
    id_projet,
    id_sous_categorie,
    date_cloture_ticket
  } = req.body;

  try {
    // Create new ticket
    const ticket = await Ticket.create({
      titre_ticket,
      id_initiateur_ticket: req.user.id,
      id_projet,
      id_sous_categorie,
      date_cloture_ticket,
      status: "Pending"
    });

    // Send a notification to the superuser with the ticket details
    const superuser = await User.findOne({
      where: {
        role_util: "superutil"
      }
    });

    NotificationController.createNotification(
      `New ticket created by ${req.user.username}: ${ticket.titre_ticket}`,
      superuser.id
    );

    res.status(201).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
}

// Validate a ticket (only superuser can perform this action)
async function validateTicket(req, res) {
  const {
    id
  } = req.params;

  try {
    // Find the ticket by its ID
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    // Check if the user is a superuser
    const user = await User.findByPk(req.user.id);

    if (user.role_util !== "superutil") {
      return res.status(403).json({
        message: "You are not authorized to perform this action"
      });
    }

    // Update the ticket status to "In Progress"
    ticket.status = "In Progress";
    await ticket.save();

    // Send an email to the department head with the ticket details
    const departmentHead = await User.findOne({
      where: {
        role: "department head",
        department: ticket.id_department
      }
    });

    sendEmail(
      departmentHead.email,
      "New ticket assigned",
      `Ticket ${ticket.id} assigned to you`
    );

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
}

