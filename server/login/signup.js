const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { createUser } = require('../controllers/userController');
const User = require('../models/user')
const db = require("../config/database")
const port = 8050;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// the request is being parsed correctly 
// parse JSON and URL-encoded request bodies respectively.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  try {
    const user = await createUser(req, res);
    if (!user.id_util) {
      return res.status(500).json({ message: 'Error creating user' });
    }
    const token = jwt.sign({ id: user.id_util }, 'secret', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});/*
app.post('/signup', async (req, res) => {
  try {
    const user = await createUser(req, res);
    const token = jwt.sign({ id: user.id_util }, 'secret', { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user' });
  }
});*/
db.sync({ alter: false })
  .then(() => {
    console.log('Database synchronized successfully');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to synchronize database', err);
  });
