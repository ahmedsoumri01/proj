const db = require('../config/database');
const Category = require('../models/category');

// Create a new category
async function createCategory(req, res) {
  const { titre_categorie, id_priorite } = req.body;
  const existingCategory = await User.findOne({ where: { titre_categorie } });
try {
  if (existingCategory) {
    return res.status(409).json({ message: 'category already exists' });
 
  } 
 
    const category = await Category.create({
      titre_categorie,
      id_priorite
    });
    console.log('Created!');
    res.status(201).json(category);
  } 
catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get all categories
async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get a category by ID
async function getCategoryById(req, res) {
  try {
    
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Update a category
async function updateCategory(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).send('Category not found');
      return;
    }
    await category.update(req.body);
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
  }
}

// Delete a category
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };