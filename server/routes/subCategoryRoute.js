const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

router.get('/subCategories', subCategoryController.getAllSubCategories);
router.get('/subCategories/:id', subCategoryController.getSubCategoryById);
router.post('/subCategories', subCategoryController.createSubCategory);
router.put('/subCategories/:id', subCategoryController.updateSubCategory);
router.delete('/subCategories/:id', subCategoryController.deleteSubCategory);

module.exports = router; 