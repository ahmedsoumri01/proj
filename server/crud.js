const express = require('express');
const app = express();

// Example data
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.status(201).json(user);
});

// Update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  res.json(user);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json(user);
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));