const express = require('express');
const router = express.Router();
const departementController = require('../controllers/departementController');

router.get('/departements', departementController.getAllDepartement);
router.get('/departements/:id', departementController.getDepartementById);
router.post('/departements', departementController.createDepartement);
router.put('/departements/:id', departementController.updateDepartement);
router.delete('/departements/:id', departementController.deleteDepartement);

module.exports = router; 