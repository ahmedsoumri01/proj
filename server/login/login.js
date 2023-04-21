/*const connection = require('../../database');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

const port = 8050; 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const usernameformat = /^[a-zA-Z]+\.[a-zA-Z]+$/; //
  if (!usernameformat.test(username)) {
    console.log('erreur format')
    return res.status(400).json({ error: 'Invalid username format. Please enter username in prename.name format.' });
    

  }
    
    
  else {
   
  const [prenom, nom] = username.split('.'); // Split username into prenom and nom
   console.log(username,prenom ,nom )
  const query = 'SELECT * FROM utilisateur WHERE prenom_util = ? AND nom_util = ?';
  
  connection.query(query, [prenom, nom], (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
    }  else if (result.length === 0) {
      res.status(401).send({ message: 'Username is incorrect' });
    } else if (result[0].status_util === 'banned') {
      res.status(401).send({ message: 'You have been banned , please contact the administrator' });
    } else {

        const user = result[0];
       /* bcrypt.compare(password, user.mdp_util, (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            res.status(500).send({ message: bcryptErr });
          } else *//*
          const compareResult = password === user.mdp_util ;
            if (!compareResult) {
              const countQuery = 'SELECT COUNT(*) as count FROM login_attempt WHERE id_util = ?';
              connection.query(countQuery, [user.id_util], (countErr, countResult) => {
                if (countErr) {
                  res.status(500).send({ message: countErr });
                } else {
                  const count = countResult[0].count;
                  if (count < 10) {
                    const insertQuery = 'INSERT INTO login_attempt (id_util, temps_login_tent) VALUES (?, NOW())';
                    connection.query(insertQuery, [user.id_util], (insertErr, insertResult) => {
                      if (insertErr) {
                        res.status(500).send({ message: insertErr });
                      } else {
                        const attemptsLeft = 10 - count - 1;
                        res.status(401).send({ message: `Password is incorrect. ${attemptsLeft} attempts left.` });
                      }
                    });
                  } else {
                    const updateStatusQuery = 'UPDATE utilisateur SET status_util = ? WHERE id_util = ?';
                    connection.query(updateStatusQuery, ['banned', user.id_util], (updateErr, updateResult) => {
                      if (updateErr) {
                        res.status(500).send({ message: updateErr });
                      } else {
                        res.status(401).send({ message: 'You have been banned . Please contact the administrator.' });
                      }
                    });
                  }
                }
              });
            } else {
              const resetQuery = 'DELETE FROM login_attempt WHERE id_util = ?';
              connection.query(resetQuery, [user.id_util], (resetErr, resetResult) => {
                if (resetErr) {
                  res.status(500).send({ message: resetErr });
                } else {
                  const token = jwt.sign({ id: user.id_util }, 'secret', { expiresIn: '1h' });
                  const updateQuery = 'UPDATE utilisateur SET dernier_login_util = NOW() WHERE id_util = ?';
                  connection.query(updateQuery, [user.id_util], (updateErr, updateResult) => {
                    if (updateErr) {
                      res.status(500).send({ message: updateErr });
                    } else {
                      res.send({ token , userType: user.type_util });
                    }
                  });
                }
              });
            }

      
    }
  
  });
}
});

           
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


*/

const db = require('../config/database')
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Login_attempt = require('../models/login_attempt');
const port = 8050; 

//const { User, Login_attempt } = require('../models'); // Import Sequelize models

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/login', async (req, res) => { // Convert to async/await syntax
  console.log('inside post')
  const { username, password } = req.body;
  const usernameformat = /^[a-zA-Z]+\.[a-zA-Z]+$/; //

  if (!usernameformat.test(username)) {
    console.log('erreur format')
    return res.status(400).json({ error: 'Invalid username format. Please enter username in prename.name format.' });
  }
  else {
    const [prenom, nom] = username.split('.'); // Split username into prenom and nom

    try {console.log("canno find ")
      const user = await User.findOne({ // Use Sequelize query function instead of connection.query
        where: { prenom_util: prenom, nom_util: nom }
        
      });
console.log("canno find ")
      if (!user) {
        res.status(401).send({ message: 'Username is incorrect' });
      } else if (user.statut_util === 'banned') {
        res.status(401).send({ message: 'You have been banned , please contact the administrator' });
      } else {
        //const compareResult = bcrypt.compareSync(password, user.mdp_util); // Use compareSync() to compare passwords
        const compareResult = password === user.mdp_util
        if (!compareResult) {
          const count = await Login_attempt.count({ where: { id_util: user.id_util } });

          if (count < 10) {
            await Login_attempt.create({ id_util: user.id_util, temps_login_tent: new Date() });
            const attemptsLeft = 10 - count - 1;
            res.status(401).send({ message: `Password is incorrect. ${attemptsLeft} attempts left.` });
          } else {
            await user.update({ status_util: 'banned' }, { where: { id_util: user.id_util } });
            res.status(401).send({ message: 'You have been banned . Please contact the administrator.' });
          }
        } else {
          await Login_attempt.destroy({ where: { id_util: user.id_util } });
          const token = jwt.sign({ id: user.id_util }, 'secret', { expiresIn: '1h' });
          await user.update({ dernier_login_util: new Date() }, { where: { id_util: user.id_util } });
          res.send({ token , userType: user.type_util });
        }
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
});


/*app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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



 