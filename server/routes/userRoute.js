const db  = require('../config/database');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for the Users component

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/departments/:name' , userController.getDepartementName)
router.get('/userss/:name' , userController.getSuperUtilisateurName)

router.get('/users/:id', (req, res) => {
    console.log('Inside getUser route handler');
    userController.getUser(req, res); 
  });

router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router; 
 