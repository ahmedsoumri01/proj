/*// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database')
const port = 8050 
// Create express app
const app = express();

// Use bodyParser middleware to parse incoming request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes for CRUD operations on users

// Get all users
 const getUser = (req, res) => {
  const query = 'SELECT * FROM utilisateur';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
 } 



// Get user by ID
const getUserById =  (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM utilisateur WHERE id_util = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log('error')
      res.status(500).send(err);
    } else if (result.length === 0) {
      console.log('not foound')
      res.status(404).send({ message: `User with ID ${id} not found` });
    } else {
      console.log('c bon')
      res.status(200).send(result[0]);
    }
  });
}



// Create new user post
const createUser =  (req, res) => {
  const { name, prename, email, mdp, departement } = req.body;
  const selectQuery = 'SELECT * FROM utilisateur WHERE email_util = ?';
  const insertQuery = 'INSERT INTO utilisateur (nom_util, prenom_util,email_util,mdp_util,departement_util) VALUES (?, ?,?,?,?)';
  
  db.query(selectQuery, [email], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length > 0) {
      res.status(409).send({ message: 'User already exists' });
    } else {
      db.query(insertQuery, [name, prename, email, mdp, departement], (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send({ message: 'User created successfully', id: result.insertId });
        }
      });
    }
  });
}




// Update user by ID app.put('/users/:id', (req, res)
const updateUser  = (req, res) => {
  const id = req.params.id;
  const { data } = req.body;
  const query = 'UPDATE utilisateur SET  email_util = ? WHERE id_util = ?';
  db.query(query, [data , id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: `User with ID ${id} not found` });
    } else {
      res.status(200).send({ message: `User with ID ${id} updated successfully` });
    }
  });
}

// Delete user by ID  app.delete('/users/:id',
const deleteUser =  (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM utilisateur WHERE id_util = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log('errrrrror')
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      console.log("not found")
      res.status(404).send({ message: `User with ID ${id} not found` });
    } else {
      console.log("ok ! ")
      res.status(200).send({ message: `User with ID ${id} deleted successfully` });
    }
  });
}

module.exports(deleteUser , updateUser ,createUser,getUserById , getUser)
// Start server
           
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/