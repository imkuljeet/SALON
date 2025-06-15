const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up Sequelize and database connection
const sequelize = require('./util/database');

const User = require('./models/User');
const Staff = require('./models/Staff');

const userRoutes = require('./routes/user');
const staffRoutes = require('./routes/staff');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',userRoutes);
app.use('/staff',staffRoutes);

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



