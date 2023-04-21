const db = require('../config/database');
const Departement = require('../models/departement');

// Create a new Departement
async function createDepartement(req, res) {
  const { titre_departement} = req.body;
  const existingDepartement = await Departement.findOne({ where: { titre_departement } });
try {
  if (existingDepartement) {
    return res.status(409).json({ message: 'Departement already exists' });
  } 
 
    const departement = await Departement.create({
      titre_departement
    });
    console.log('Created!');
    res.status(201).json(departement);
  } 
catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get all Departement
async function getAllDepartement(req, res) {
  try {
    const departement = await Departement.findAll();
    res.status(200).json(departement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get a Departement by ID
async function getDepartementById(req, res) {
  try {
    
    const departement = await Departement.findByPk(req.params.id);
    if (!departement) {
      return res.status(404).json({ message: 'departement not found' });
    }
    res.status(200).json(departement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Update a Departement
async function updateDepartement(req, res) {
  try {
    const departement = await Departement.findByPk(req.params.id);
    if (!departement) {
      res.status(404).send('departement not found');
      return;
    }
    await departement.update(req.body);
    res.status(200).json(departement);
  } catch (error) {
    console.error(error);
  }
}

// Delete a Departement
async function deleteDepartement(req, res) {
  try {
   
    const departement = await Departement.findByPk(req.params.id);
    if (!departement) {
      return res.status(404).json({ message: 'departement not found' });
    }
    await departement.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}



module.exports = { createDepartement, getAllDepartement, getDepartementById, updateDepartement, deleteDepartement };