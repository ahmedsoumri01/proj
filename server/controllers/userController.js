// controllers/userController.js
const db  = require('../config/database');
const User = require('../models/user');
const Departement = require('../models/departement');


async function createUser(req, res) {
  const { nom_util, prenom_util, email_util, mdp_util, departement_util } = req.body;

  // Find the department ID based on the department name
  const departement = await Departement.findOne({
    where: {  nom_departement: departement_util }
  });
  if (!departement) {
    return res.status(400).json({ error: 'Department not found' });
  }
  const id_departement = departement.id_departement;

  const userFields = {
    nom_util,
    prenom_util,
    email_util,
    mdp_util,
    id_departement,
    type_util: 'utilisateur',
    statut_util: 'actif'
  };

  try {
    const existingUser = await User.findOne({ where: { email_util } });

    if (existingUser) {
      return res.status(404).json({ message: 'user already exist' });

    } 

    const user = await User.create(userFields);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}


async function getAllUsers(req, res) {
  console.log('getAllUsers function in controller')
  try {
    const users = await User.findAll();
    if (!users) {
      console.log('no users found!')
      return res.status(404).json({ message: 'No users found' });
    }
    console.log('found users:', users)
    res.json(users);
  } catch (error) {
    console.log('error getting users in controller')
    console.error(error);
    res.status(500).json({ message: 'Error getting users' });
  }
}





async function getUser(req, res) {
  console.log('lget function fl controller ')
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log(' luser is not found ! ')
      return res.status(404).json({ message: 'User not found' });
      
    }console.log('lka luser')
    res.json(user);
  } catch (error) {
    console.log('error user fl controller ')
    console.error(error);
    res.status(500).json({ message: 'Error getting user' });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}

//get departement  
async function getDepartementName(req, res) {
  try {
    const department = await Department.findOne({ where: { nom_departement: req.params.name } });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding department' });
  }
};
//get departement  
async function getSuperUtilisateurName(req, res) {
  try {
    const superuser = await User.findOne({ where: { nom_util: req.params.name } });
    if (!superuser) {
      return res.status(404).json({ message: 'superuser not found' });
    }
    res.json(superuser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding superuser' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getDepartementName , 
  getSuperUtilisateurName
};
  