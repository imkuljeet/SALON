const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

// POST Route for Sign Up
app.post('/signup', (req, res) => {
  // Extract data from the request body
  const { fullName, email, password, userType } = req.body;

  // Basic validation
  if (!fullName || !email || !password || !userType) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // Log the incoming data (for testing purposes)
  console.log('Sign-up data received:', { fullName, email, password, userType });

  // Simulating saving data to a database
  // Replace this logic with actual database code, e.g., MongoDB or SQL
  const savedData = { fullName, email, password, userType };

  // Send a success response
  res.status(200).json({
    message: 'User signed up successfully!',
    data: savedData,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
