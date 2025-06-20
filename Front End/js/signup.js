// Add event listener to the form for submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Capture input values from the form
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userType = document.getElementById("userType").value;

  // Create a payload object with the captured values
  const details = {
    fullName: fullName,
    email: email,
    password: password,
    userType: userType,
  };

  // Use Axios to send the POST request to the server
  axios
    .post("http://localhost:3000/user/signup", details) // Replace with your server endpoint
    .then((response) => {
      // Handle successful response
      console.log("Success:", response.data);
      alert(response.data.message); // Alert the success message from server
    })
    .catch((error) => {
      // Handle error response
      if (error.response && error.response.data) {
        // Alert the specific error message from server
        alert(error.response.data.error);
      } else {
        // Alert a generic error message
        alert("An unknown error occurred. Please try again.");
      }
      console.error("Error:", error);
    });
});
