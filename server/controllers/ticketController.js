const db  = require('../config/database');
const Ticket = require('../models/ticket');
const SubCategory = require ('../models/subCategory');
const Departement = require('../models/departement');
const Category = require('../models/category');
const User = require("../models/user"); 

const TicketDetail = require("../models/ticket_detail")
const NotificationController = require('../controllers/notificationController');
const Project = require('../models/project');

// create ticket 
async function createTicket(req, res) {
  const { titre_ticket, description_ticket, nom_sous_categorie, deadline_ticket, attachement_ticket } = req.body;
 //id of the user authentified
  req.user = { id_util: '3' };
// const { id } = req.params; 
  const createdBy = req.user.id_util;
  try {

//find the id of the sub category defined by the user 
const sous_categorie = await SubCategory.findOne({
  where: { nom_sous_categorie: nom_sous_categorie},
});

const id_sous_categorie = sous_categorie.id_sous_categorie ;
    // Find the category of the subcategory defined
    const subCategory = await SubCategory.findOne({
      where: { id_sous_categorie: id_sous_categorie },
      include: [{ model: Category }],
    });

    if (!subCategory) {
      throw new Error(`Subcategory with id ${id_sous_categorie} not found`);
    }
    console.log("Subcategory found:", subCategory);

    const category = subCategory.categorie;
    console.log("Category found:", category);

    // Find the department related to the category
    const departement = await Departement.findOne({
      where: { id_departement: category.id_departement },
    });

    if (!departement) {
      throw new Error(`Department with id ${category.id_departement} not found`);
    }
    console.log("Department found:", departement);

    // Find the head of department
    const HeadDepartement = await User.findOne({
      where: { id_util: departement.id_responsable_departement },
    });

    if (!HeadDepartement) {
      throw new Error(`Head of department not found for department with id ${departement.id_departement}`);
    }
    console.log("Head of department found:", HeadDepartement);

    // Find the supervisor of the ticket creator
    const createdByUser = await User.findOne({ where: { id_util: createdBy } });
    console.log("creator found", createdByUser);
    const ticketSupervisor = await User.findOne({ where: { id_util: createdByUser.id_super_util } });
    console.log("supervisor found", ticketSupervisor);
    // Create ticket record
    const ticket = await Ticket.create({
      id_initiateur_ticket: createdByUser?.id_util,
      id_validateur_ticket: HeadDepartement?.id_util,
      id_superviseur_ticket: ticketSupervisor?.id_util,
      id_departement: departement?.id_departement,
      id_projet : 1,
      id_categorie: category?.id_categorie,
      statut_ticket: 'En attente',
      date_cloture_ticket: null,
      date_creation_ticket: new Date(),
    });

    // Create ticket detail record
    const ticketDetail = await TicketDetail.create({
      titre_ticket,
      description_ticket,
      id_sous_categorie,
      id_ticket: ticket.id_ticket,
      deadline_ticket,
      attachement_ticket,
    });

    // Notify the supervisor
    NotificationController.createNotification(`New ticket created by ${createdByUser.nom_util}: ${titre_ticket}`, ticketSupervisor?.id_util);

    res.status(201).json({ message: 'Ticket created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}



async function getAllTickets(req, res) {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User,
          attributes: ['nom_util'] ,  // Include only the supervisor's name
        },
        {
          model: Project,
          attributes: ['nom_projet'] ,  // Include only the supervisor's name
        },
        {
          model: Category,
          attributes: ['nom_categorie'] ,  // Include only the supervisor's name
        },
        
        {
          model: Departement,
          attributes: ['nom_departement'] // Include only the department's name
        }
      ]
    });
    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


async function getTicketById(req, res) {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

/*
async function updateTicket(req, res)  {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      res.status(404).send('Ticket not found');
      return;
    }

    if (req.body.status && req.body.status === 'open' && ticket.status !== 'open') {
      res.status(400).send('Cannot re-open a resolved ticket');
      return;
    }

    if (req.body.status && req.body.status !== ticket.status && ticket.status === 'open') {
      res.status(400).send('Cannot change the status of an open ticket');
      return;
    }

    if (req.body.status && req.body.status === 'resolved' && ticket.status !== 'in progress') {
      res.status(400).send('Cannot resolve a ticket that is not in progress');
      return;
    }

    if (req.body.status && req.body.status === 'in progress' && ticket.status === 'resolved') {
      res.status(400).send('Cannot change the status of a resolved ticket');
      return;
    }

    if (req.body.userId && req.body.userId !== ticket.userId) {
      res.status(400).send('Cannot change the user who created the ticket');
      return;
    }

    await ticket.update({...req.body,updatedAt: new Date()} );
    

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
  }
}

*/

async function deleteTicket(req, res) {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
   /* if (ticket.createdBy === req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }*/
    await ticket.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
 //update status
async function updateTicketStatus(req, res) {
  const { id } = req.params;
  const userId = req.params.userId;
  const { statut_ticket } = req.body;
  
  const validatedBy = req.body.id_validateur_ticket;
  const supervisor = req.body.id_superviseur_ticket ; 
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found status 111! " });
    }  

    const createdBy = ticket.id_initiateur_ticket;
    const initiateur = await User.findByPk(ticket.id_initiateur_ticket);
const superviseur = await User.findByPk(ticket.id_superviseur_ticket);
const validateur = await User.findByPk(ticket.id_validateur_ticket);
const departemnt = await Departement.findByPk(validateur.id_departement);


    console.log('createdBy:', createdBy, 'validatedBy:', validatedBy, 'supervisor:', supervisor, 'statut_ticket:', statut_ticket);
    
    if (supervisor && statut_ticket === "En attente") {
      console.log('supervisor found ')
      ticket.statut_ticket = "En Cours";
      console.log(ticket)
      await ticket.save();
     
      console.log(`Ticket ${id} assigned to you`, ticket.id_validateur_ticket)
     await NotificationController.createNotification(`Ticket ${id} t'as étét assigné par ${initiateur.nom_util} ${initiateur.prenom_util}`, ticket.id_validateur_ticket);

     await NotificationController.createNotification(`Ticket ${id} a été validé par ${superviseur.nom_util} ${superviseur.prenom_util} `, ticket.id_initiateur_ticket);
    }
    
    if (validatedBy && statut_ticket === "En Cours") {
      console.log('validator found  ')
      ticket.statut_ticket = "Resolu";
      console.log(ticket)
      await ticket.save();
     
    console.log
      await NotificationController.createNotification(`Ticket ${id} a été validé par ${validateur.nom_util} ${validateur.prenom_util} de departement ${departemnt.nom_departement}`, ticket.id_initiateur_ticket);
      
      await NotificationController.createNotification(`Ticket ${id} a été validé par ${validateur.nom_util} ${validateur.prenom_util} de departemnt ${departemnt.nom_departement}`, ticket.id_superviseur_ticket);

    }  

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}



/*
async function updateTicketStatus(req, res) {
  const { id } = req.params;
  const { statut_ticket } = req.body;
  const createdBy = req.body.id_initiateur_ticket;
  const validatedBy = req.body.id_validateur_ticket;
  const supervisor = req.body.id_superviseur_ticket ; 
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }    
   if (
      (statut_ticket === "resolved" && superUser) )
      return res.status(403).json({ message: "ticket is closed " });
    
if (supervisor && statut_ticket === "pending")
{ticket.statut_ticket = "In Progress";
}
  if (validatedBy && statut_ticket === "in progress")
  {ticket.statut_ticket = "resolved";
  }  
   await ticket.save();


    // send notifications based on the new status
    if (statut_ticket === "In Progress") {
      
      NotificationController.createNotification(`Ticket ${id_ticket} assigned to you from ${createdBy.nom_util}`, validatedBy);
      NotificationController.createNotification(`Ticket ${id_ticket} has been validated by ${supervisor.nom_util}`, ticket.id_initiateur_ticket);
     
    } else if (statut_ticket === "Resolved") {
      NotificationController.createNotification(`Ticket ${ticket.id} has been resolved by ${validatedBy.nom_util}`, ticket.id_initiateur_ticket);
      NotificationController.createNotification(`Ticket ${ticket.id} has been resolved by ${validatedBy.nom_util}`, supervisor);
    }
  

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


*/




module.exports = { deleteTicket , createTicket , getAllTickets,getTicketById , updateTicketStatus};
