const axios = require("axios");

function isValidUser(username) {
  const validUsers = ["admin", "Simon", "user2", "testuser"];
  return validUsers.indexOf(username) !== -1;
}

async function authenticateUser(username, password) {
  // Encode the username and password in Base64
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login", // Replace with your API endpoint
      {
        username: username,
        password: password,
      }, // Empty body for this example
      {
        headers: {
          Authorization: `Basic ${credentials}`, // Add credentials to the Authorization header
          "Content-Type": "application/json", // Specify the content type
        },
      }
    );

    console.log("Authentication successful:", response.data);
    return true;
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    return false;
    throw error;
  }
}

function validAuthenticatedAdmins(username, password) {
  // This is a simple example. In a real application, you would hash the password and
  // compare it to a hashed password stored in the database.
  const axios = require("axios");
  const validAdmins = [
    {
      username: "Simon",
      password: "password",
    },
  ];
  const user = validAdmins.find(
    (admin) => admin.username === username && admin.password === password
  );
  return !!user;
}

module.exports = {
  sessionExpiryTime: 60, //expire in 1 minute
  type: "credentials",
  users: function (username) {
    return new Promise(function (resolve) {
      // Do whatever work is needed to check username is a valid
      // user.
      console.log("Checking if user is valid: " + username);
      if (isValidUser(username)) {
        // Resolve with the user object. It must contain
        // properties 'username' and 'permissions'
        var user = {
          username: "admin",
          permissions: "*",
        };
        resolve(user);
      } else {
        // Resolve with null to indicate this user does not exist
        resolve(null);
      }
    });
  },
  authenticate: async function (username, password) {
    // Changed to async
    return new Promise(async function (resolve) {
      // Added async here
      // Do whatever work is needed to validate the username/password
      // combination.
      console.log("Checking if user pass is valid: " + username, password);
      const validUserandPass = await authenticateUser(
        username,
        password
      ); // Fixed await usage
      if (validUserandPass) {
        // Resolve with the user object. Equivalent to having
        // called users(username);
        var user = {
          username: username,
          permissions: "*",
        };
        console.log("User is valid: " + username);
        resolve(user);
      } else {
        // Resolve with null to indicate the username/password pair
        // were not valid.
        resolve(null);
      }
    });
  },
  default: function () {
    return new Promise(function (resolve) {
      // Resolve with the user object for the default user.
      // If no default user exists, resolve with null.
      resolve({
        anonymous: true,
        // permissions: "read"
      });
    });
  },
};
