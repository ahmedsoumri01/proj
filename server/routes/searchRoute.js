const express = require('express');
const { User, Ticket, Category, Project, Departement } = require('../models');
const search = require('./search');

const app = express();

// Search endpoint for tickets
app.get('/tickets/search', async (req, res) => {
  const results = await search(Ticket, ['tirtre_ticket'], req.query);
  res.json(results);
});

// Search endpoint for users
app.get('/users/search', async (req, res) => {
  const results = await search(User, ['nom_util', 'email_util'], req.query);
  res.json(results);
});

// Search endpoint for categories
app.get('/categories/search', async (req, res) => {
  const results = await search(Category, ['titre_categorie'], req.query);
  res.json(results);
});
// Search endpoint for departements
app.get('/departements/search', async (req, res) => {
    const results = await search(Departement, ['titre_departement'], req.query);
    res.json(results);
  });
  // Search endpoint for projects
app.get('/projects/search', async (req, res) => {
    const results = await search(Project, ['titre_projet'], req.query);
    res.json(results);
  });

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});