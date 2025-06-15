const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dontenv = require('dotenv');

// Set up Sequelize and database connection
const sequelize = require('./util/database');

const User = require('./models/User');
const Staff = require('./models/Staff');
const Service = require('./models/Service');

const userRoutes = require('./routes/user');
const staffRoutes = require('./routes/staff');
const serviceRoutes = require('./routes/service');
const customerRoutes = require('./routes/customer');

// Initialize Express app
const app = express();
dontenv.config();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',userRoutes);
app.use('/staff',staffRoutes);
app.use('/service',serviceRoutes);
app.use('/customer',customerRoutes);

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced.');
    // Start the server
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });



