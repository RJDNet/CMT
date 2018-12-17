const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  googleProfileID: {
    type: String
  }
});

module.exports = User = mongoose.model('users', userSchema);