function isValidUser(username) {
    const validUsers = ["admin", "Simon", "user2"];
    return validUsers.indexOf(username) !== -1;
}

function validAuthenticatedAdmins(username, password) {
    const validAdmins = [{
        username: "Simon",
        password: "password"
    }];
    const user = validAdmins.find(admin => admin.username === username && admin.password === password);
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
                    permissions: "*"
                };
                resolve(user);
            } else {
                // Resolve with null to indicate this user does not exist
                resolve(null);
            }
        });
    },
    authenticate: function (username, password) {
        return new Promise(function (resolve) {
            // Do whatever work is needed to validate the username/password
            // combination.
            console.log("Checking if user pass is valid: " + username, password);
            if (validAuthenticatedAdmins(username, password)) {
                // Resolve with the user object. Equivalent to having
                // called users(username);
                var user = {
                    username: "admin",
                    permissions: "*"
                };
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
    }
}