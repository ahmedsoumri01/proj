const db = require('../config/database');
const Priority = require('../models/priority');

// Create a new priority
async function createPriority(req, res) {
  const { titre_priorite } = req.body;
  const existingPriority = await Priority.findOne({ where: { titre_priorite } });
try {
  if (existingPriority) {
    return res.status(409).json({ message: 'Priority already exists' });
  } 
 
    const priority = await Priority.create({
      titre_priorite
    });
    console.log('Created!');
    res.status(201).json(priority);
  } 
catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get all priority
async function getAllPriority(req, res) {
  try {
    const priority = await Priority.findAll();
    res.status(200).json(priority);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get a priority by ID
async function getPriorityById(req, res) {
  try {
    
    const priority = await Priority.findByPk(req.params.id);
    if (!priority) {
      return res.status(404).json({ message: 'priority not found' });
    }
    res.status(200).json(priority);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Update a priority
async function updatePriority(req, res) {
  try {
    const priority = await Priority.findByPk(req.params.id);
    if (!priority) {
      res.status(404).send('priority not found');
      return;
    }
    await priority.update(req.body);
    res.status(200).json(priority);
  } catch (error) {
    console.error(error);
  }
}

// Delete a priority
async function deletePriority(req, res) {
  try {
   
    const priority = await Priority.findByPk(req.params.id);
    if (!priority) {
      return res.status(404).json({ message: 'priority not found' });
    }
    await priority.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = { createPriority, getAllPriority, getPriorityById, updatePriority, deletePriority };