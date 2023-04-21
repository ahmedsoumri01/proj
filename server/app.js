const db = require('./config/database');
const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const port = 8050;
const cors = require('cors');
// sync models with the database
const User = require('./models/user');
const Ticket = require('./models/ticket');
const ticketDetail = require('./models/ticket_detail')
const Audit = require('./models/audit');
const Category = require('./models/category');
const SubCategory = require('./models/subCategory');
const departement = require('./models/departement')
const forgot_password = require('./models/Forgot_Password');
const login_attempt = require('./models/login_attempt');
const notification = require('./models/notification')
const priority = require('./models/priority')
const project = require('./models/project')
//define routes
const userRoutes = require('./routes/userRoute');
const ticketRoutes = require('./routes/ticketRoute');
const subCategoryRoutes = require('./routes/subCategoryRoute');
const pojectRoutes = require('./routes/projectRoute');
const priorityRoutes = require('./routes/priorityRoute');
const categoryRoutes = require('./routes/categoryRoute');
const departementRoutes = require('./routes/departementRoute');
const notificationRoutes = require('./routes/notificationRoute');
const ticketDetailRoutes = require('./routes/ticketDetailRoute');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', ticketRoutes);
app.use('/', ticketDetailRoutes);
app.use('/', userRoutes);
app.use('/', subCategoryRoutes);
app.use('/', pojectRoutes);
app.use('/', priorityRoutes);
app.use('/', categoryRoutes);
app.use('/', departementRoutes);
app.use('/', notificationRoutes);

//sync the database with the models 
db.sync({ alter: false})
  .then(() => {
    console.log('Models synced with database successfully.');
  })
  .catch((error) => {
    console.error('Error syncing models with database:', error);
  });

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`)
})