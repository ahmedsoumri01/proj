const db = require('../config/database');
const Project = require('../models/project');

// Create a new projet
async function createProject(req, res) {
  const { titre_projet } = req.body;
  const existingcProject = await Project.findOne({ where: { titre_projet } });
try {
  if (existingcProject) {
    return res.status(409).json({ message: 'Project already exists' });
  } 
 
    const projet = await Project.create({
      titre_projet
    });
    console.log('Created!');
    res.status(201).json(projet);
  } 
catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get all projet
async function getAllProject(req, res) {
  try {
    const projet = await Project.findAll();
    res.status(200).json(projet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get a projet by ID
async function getProjectById(req, res) {
  try {
    
    const projet = await Project.findByPk(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: 'projet not found' });
    }
    res.status(200).json(projet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Update a projet
async function updateProject(req, res) {
  try {
    const projet = await Project.findByPk(req.params.id);
    if (!projet) {
      res.status(404).send('projet not found');
      return;
    }
    await projet.update(req.body);
    res.status(200).json(projet);
  } catch (error) {
    console.error(error);
  }
}

// Delete a projet
async function deleteProject(req, res) {
  try {
   
    const projet = await Project.findByPk(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: 'projet not found' });
    }
    await projet.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = { createProject, getAllProject, getProjectById, updateProject, deleteProject };