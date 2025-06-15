// Attach an event listener to the login form
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Capture the email and password input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Prepare the payload to send to the server
  const payload = {
    email: email,
    password: password,
  };

  // Make a POST request to the login endpoint
  axios.post('http://localhost:3000/user/login', payload) // Replace with your server endpoint
    .then(response => {
      // Handle a successful login
      console.log('Success:', response.data);
      alert(response.data.message); // Display the success message from the server

      // Redirect based on userType
      const userType = response.data.user.userType;
      if (userType === 'admin') {
        window.location.href = './adminDashboard.html'; // Redirect to admin dashboard
      } else if (userType === 'customer') {
        window.location.href = './customerDashboard.html'; // Redirect to customer dashboard
      }
    })
    .catch(error => {
      // Handle an error response
      if (error.response && error.response.data) {
        // Display the error message returned from the server
        alert(error.response.data.error);
      } else {
        // Display a generic error message for unknown issues
        alert('An unknown error occurred. Please try again.');
      }
      console.error('Error:', error);
    });
});
