const { v4: uuidv4 } = require('uuid');

class User {
  constructor(email, password) {
    this.id = uuidv4();
    this.email = email;
    this.password = password;
    this.confirmed = false;
  }
}

module.exports = User;