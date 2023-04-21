const db = require('../config/database');
const SubCategory = require('../models/subCategory');

// Create a new SubCategory
async function createSubCategory(req, res) {
  const { titre_sub_categorie, id_categorie } = req.body;
  const existingSubCategory = await SubCategory.findOne({ where: { titre_sub_categorie } });
try {
  if (existingSubCategory) {
    return res.status(409).json({ message: 'subcategory already exists' });
  } 
 
    const subCategory = await SubCategory.create({
        titre_sub_categorie, id_categorie
    });
    console.log('Created!');
    res.status(201).json(subCategory);
  } 
catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get all SubCategory
async function getAllSubCategories(req, res) {
  try {
    const categories = await SubCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get a SubCategory by ID
async function getSubCategoryById(req, res) {
  try {
    
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Update a SubCategory
async function updateSubCategory(req, res) {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory) {
      res.status(404).send('subCategory not found');
      return;
    }
    await subCategory.update(req.body);
    res.status(200).json(subCategory);
  } catch (error) {
    console.error(error);
  }
}

// Delete a category
async function deleteSubCategory(req, res) {
  try {
   
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: 'subCategory not found' });
    }
    await subCategory.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = { createSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory };