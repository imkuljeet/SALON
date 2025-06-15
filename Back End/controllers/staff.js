const Staff = require('../models/Staff'); // Import the Staff model

const addStaff = async (req, res) => {
  const { name, email, position, status } = req.body; // Extract staff details from request body

  try {
    // Check if a staff member with the same email already exists
    const existingStaff = await Staff.findOne({ where: { email } });
    if (existingStaff) {
      return res.status(400).json({ error: 'A staff member with this email already exists!' });
    }

    // Create a new staff entry
    const newStaff = await Staff.create({
      name,
      email,
      position,
      status,
    });

    res.status(201).json({
      message: 'Staff member added successfully!',
      staff: {
        id: newStaff.id,
        name: newStaff.name,
        email: newStaff.email,
        position: newStaff.position,
        status: newStaff.status,
      }, // Return only the necessary details
    });
  } catch (error) {
    console.error('Error adding staff:', error);
    res.status(500).json({ error: 'An error occurred while adding the staff member.' });
  }
};

const getStaff = async (req, res) => {
  try {
    // Fetch all staff members from the database
    const staffMembers = await Staff.findAll();

    // Send the response with the list of staff members
    res.status(200).json({
      message: 'Staff members fetched successfully!',
      staff: staffMembers, // Return the staff list
    });
  } catch (error) {
    console.error('Error fetching staff members:', error);
    res.status(500).json({ error: 'An error occurred while fetching staff members.' });
  }
};


module.exports = { addStaff, getStaff };
