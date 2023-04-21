const connection = require('../../database');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const port = 8050;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for sending password reset email
app.post('/forgotPassword', (req, res) => {
  const { email } = req.body;

  // Check if user has already requested password reset today
  const checkRequestQuery = 'SELECT * FROM mdp_oublie WHERE email_mdp_oublie= ? AND date_mdp_oublie = CURDATE()';
  connection.query(checkRequestQuery, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.log('errer loula')
      res.status(500).send({ message: checkErr });
    } else if (checkResult.length >= 3) { // Limit to 3 requests per day
      res.status(429).send({ message: 'Too many password reset requests. Please try again tomorrow.' });
      console.log('too many requests ')
    } else {
      const query = 'SELECT * FROM utilisateur WHERE email_util = ?';

      connection.query(query, [email], (err, result) => {
        if (err) {
          console.log('erreur thenya')
          res.status(500).send({ message: err });
        } else if (result.length === 0) {
          console.log('malkash l mail')
          res.status(404).send({ message: 'User not found' });
        } else {
          const user = result[0];

          // Generate password reset token
          const token = Math.random().toString(36).substr(2, 15);
          const updateTokenQuery = 'UPDATE utilisateur SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id_util = ?';
          connection.query(updateTokenQuery, [token, user.id_util], (updateErr, updateResult) => {
            if (updateErr) {
              console.log('errer okhra')
              res.status(500).send({ message: updateErr });
            } else {
              // Insert password reset request record
              const insertRequestQuery = 'INSERT INTO mdp_oublie (email_mdp_oublie, date_mdp_oublie) VALUES (?, CURDATE())';
              connection.query(insertRequestQuery, [email], (insertErr, insertResult) => {
                if (insertErr) {
                 
                  console.log('eeeeeeeeeerrrreeur')
                  res.status(500).send({ message: insertErr });
                } else {
                  // Send password reset email
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'MYMAIL',
                      pass: 'PWD'
                    }
                  });
                  const mailOptions = {
                    from: 'MYMAIL',
                    to: email,
                    subject: 'Password reset request',
                    text: `Hello ${user.nom_util},\n\nYou recently requested to reset your password. Please use the following link to reset your password:\n\nhttp://localhost:3000/resetPassword/${token}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nBest regards,\nThe Team`
                  };
                  transporter.sendMail(mailOptions, (sendErr, sendInfo) => {
                    if (sendErr) {
                      console.log('mabaathsh l mail')
                      res.status(500).send({ message: sendErr });
                      
                    }
                });
                res.send({ message: 'Password reset email sent' });
                console.log('c bon ')
            }
        });
    }
});
}
});
}
});
});


app.listen(port , ( ) => 
{console.log(`server listen on port ${port}`)}) ;